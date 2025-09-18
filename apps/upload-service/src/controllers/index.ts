import path from 'path';

import type { Request, Response } from 'express';
import simpleGit from 'simple-git';
import { createClient } from 'redis';

import GenerateID from '../utils/generateID';
import GetFilePath from '../utils/getFilePath';
import PushToS3 from '../utils/pushRepoToS3';
import RedisPublisher from '../utils/redisPublisher';

const subscriber = createClient();
subscriber.connect();

export const Upload = async (req: Request, res: Response) => {
  const url = req.body.url;
  console.log('Recieved url endpoint: POST REQUEST: ' + url);

  const currentPath = path.join(__dirname);
  const storePath = currentPath.slice(0, currentPath.length - 15);

  const id = GenerateID();
  console.log('ID generated: ' + id);

  try {
    await simpleGit().clone(url, `${storePath}output/${id}`);
    console.log('Clone successfull');

    const files = GetFilePath(`${storePath}output/${id}`);
    console.log(files);

    await Promise.all(
      files.map(async (file) => {
        const relativePath = path.relative(`${storePath}output/${id}`, file);
        console.log('Relative path' + relativePath);
        await PushToS3(`output/${id}/${relativePath}`, file);
      })
    );

    await RedisPublisher(id);
    console.log('Upload service completed');

    res.json({
      id: id,
    });
  } catch (error) {
    console.log(error);
    res.json({
      error: error,
    });
  }
};

export const Status = async (req: Request, res: Response) => {
  const id = req.query.id as string;
  const poll = (req.query.poll as string) === 'true';
  try {
    if (!id) {
      return res.status(400).json({ message: 'id required' });
    }

    if (!poll) {
      const response = await subscriber.hGet('status', id);
      return res.json({ id, status: response });
    }

    const end = Date.now() + 30000;
    while (Date.now() < end) {
      const status = await subscriber.hGet('status', id);
      if (status === 'deployed' || status === 'failed') {
        try {
          await fetch('http://localhost:3003/api/projects', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ projectId: id, status }),
          });
        } catch (e) {
          console.log('Failed to update web DB status', e);
        }
        return res.json({ id, status });
      }
      await new Promise((r) => setTimeout(r, 1500));
    }
    return res.json({ id, status: 'pending' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Status check failed' });
  }
};

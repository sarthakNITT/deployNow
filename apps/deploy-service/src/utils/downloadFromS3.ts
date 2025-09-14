import path from 'path';
import fs from 'fs';

import { GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { client } from '@repo/aws-clilent/client';

export default async function DownloadFromS3(prefix: string) {
  console.log("Download called");
  try {
    console.log("Download started");
    const allFiles = new ListObjectsV2Command({
      Bucket: 'deploy-now',
      Prefix: prefix,
    });
    const response = await client.send(allFiles);

    if (!response.Contents) {
      console.log('no content returned from response');
      return;
    }

    const contents = response.Contents;
    const allpromises = contents.map(async ({ Key }) => {
      return new Promise(async (resolve) => {
        if (!Key) {
          resolve('');
          return;
        }

        const appRoot = path.resolve(__dirname, '..', '..');
        const distBase = path.join(appRoot, 'dist');
        const id = prefix.replace('output/', '');
        const relativeKeyPath = Key.replace(`${prefix}/`, '');
        const finalOutputPath = path.join(distBase, id, relativeKeyPath);

        const dirName = path.dirname(finalOutputPath);
        if (!fs.existsSync(dirName)) {
          fs.mkdirSync(dirName, { recursive: true });
        }

        const outputFile = fs.createWriteStream(finalOutputPath);
        const getObject = new GetObjectCommand({
          Bucket: 'deploy-now',
          Key: Key,
        });
        const getObjectRes = await client.send(getObject);

        const bodyStream = getObjectRes.Body as NodeJS.ReadableStream;
        if (bodyStream && typeof bodyStream.pipe === 'function') {
          bodyStream
            .pipe(outputFile)
            .on('finish', () => resolve(''))
            .on('error', () => resolve(''));
        } else {
          resolve('');
          return;
        }
      });
    });
    console.log('awaiting');
    await Promise.all(allpromises.filter((x) => x != undefined));
  } catch (error) {
    console.log(error);
    return;
  }
}

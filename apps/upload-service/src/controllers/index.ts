import type { Request, Response } from "express";
import path from "path"
import simpleGit from "simple-git"
import GenerateID from "../utils/generateID";
import GetFilePath from "../utils/getFilePath";
import PushToS3 from "../utils/pushRepoToS3";
import RedisPublisher from "../utils/redisPublisher";
import { createClient } from "redis";

const subscriber = createClient();
subscriber.connect();

export const Upload = async (req:Request, res:Response) => {
    const url = req.body.url;
    console.log("Recieved url endpoint: POST REQUEST: "+url);
    
    const currentPath = path.join(__dirname);
    const storePath = currentPath.slice(0, currentPath.length - 15);
    
    const id = GenerateID();
    console.log("ID generated: "+id);

    try {
        await simpleGit().clone(url, `${storePath}output/${id}`);
        console.log("Clone successfull");
        
        const files = GetFilePath(`${storePath}output/${id}`);
        console.log(files);

        files.forEach(async (file) => {
            const relativePath = path.relative(`${storePath}output/${id}`, file);
            console.log("Relative path"+relativePath);
            await PushToS3(`output/${id}/${relativePath}`, file);
        });

        RedisPublisher(id);
        console.log("Upload service completed");

        res.json({
            id: id
        })
    } catch (error) {
        console.log(error);
        res.json({
            error: error
        })
    }
}

export const Status = async (req:Request, res:Response) => {
    const id = req.query.id;
    try {
        const response = await subscriber.hGet("status", id as string);
        res.json({
            status: response
        });
    } catch (error) {
        console.log(error);
        res.json({
            error: error
        })
    }
}
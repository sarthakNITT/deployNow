import type { Request, Response } from "express";
import path from "path"
import simpleGit from "simple-git"
import GenerateID from "../utils/generateID";
import GetFilePath from "../utils/getFilePath";
import PushToS3 from "../utils/pushRepoToS3";
import RedisPublisher from "../utils/redisPublisher";

export const Upload = async (req:Request, res:Response) => {
    const url = req.body.url;
    console.log("Recieved url endpoint: POST REQUEST: "+url);
    const currentPath = path.join(__dirname);
    const storePath = currentPath.slice(0, currentPath.length - 15);
    console.log("Requested to generate ID");
    const id = GenerateID();
    console.log("ID generated: "+id);
    console.log("Requested to clone repository");
    await simpleGit().clone(url, `${storePath}dist/${id}`);
    console.log("Clone successfull");
    const files = GetFilePath(`${storePath}dist/${id}`);
    console.log(files);
    console.log("Pushing to S3 object store initiated");
    files.forEach(async (file) => {
        const relativePath = path.relative(`${storePath}dist/${id}`, file); 
        await PushToS3(`${id}/${relativePath}`, file);
    });
    RedisPublisher(id);
    console.log("Upload service completed");
    res.json({
        id: id
    })
}
"/Users/sarthakkarode/deployNow/apps/upload-service/dist/04027/README.md"
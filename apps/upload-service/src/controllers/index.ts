import type { Request, Response } from "express";
import path from "path"
import simpleGit from "simple-git"
import GenerateID from "../utils/generateID";
import GetFilePath from "../utils/getFilePath";
import PushToS3 from "../utils/pushRepoToS3";
import RedisPublisher from "../utils/redisPublisher";

export const Upload = async (req:Request, res:Response) => {
    const url = req.body.url;
    const currentPath = path.join(__dirname);
    const storePath = currentPath.slice(0, currentPath.length - 15);
    const id = GenerateID();
    await simpleGit().clone(url, `${storePath}/dist/${id}`);
    const files = GetFilePath(`${storePath}/dist/${id}`);
    console.log(files);
    files.forEach(async (file)=>{
        await PushToS3(file.slice(__dirname.length + 1), file);
    })
    RedisPublisher(id);
    res.json({
        id: id
    })
}
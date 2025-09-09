import type { Request, Response } from "express";
import path from "path"
import simpleGit from "simple-git"
import GenerateID from "../utils/generateID";

export const SendURL = async (req:Request, res:Response) => {
    const url = req.body.url;
    const currentPath = path.join(__dirname);
    const storePath = currentPath.slice(0, currentPath.length - 15);
    const id = GenerateID();
    simpleGit().clone(url, `${storePath}/dist/${id}`);
    res.json({})
}
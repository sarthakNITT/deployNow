import express, { type Request, type Response } from "express";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { client } from "@repo/aws-clilent/client";
const app = express();

app.use(express.json());
app.get("/*", async(req: Request, res: Response)=>{
    const host = req.hostname;
    const id = host.split(".")[0];
    console.log(id);
    const filePath = req.path;
    const contents = new GetObjectCommand({
        Bucket: "deploy-now",
        Key: `dist/${id}${filePath}`
    })
    const getObjectRes = await client.send(contents);
    const type = filePath.endsWith("html") ? "text/html" : filePath.endsWith("css") ? "text/css" : "application/javascript"
    res.set("Content-Type", type);
    res.send(getObjectRes.Body);
})

app.listen(3001, ()=>{
    console.log(`Server is running on port: 3001`);
})
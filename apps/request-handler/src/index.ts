import express, { type Request, type Response } from "express";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
const app = express();


export const client = new S3Client({
    region: "auto",
    endpoint: process.env.CLOUDFARE_URL,
    credentials: {
        accessKeyId: process.env.CLOUDFARE_ACCESS_ID ?? "",
        secretAccessKey: process.env.CLOUDFARE_SECRET_ACCESS_KEY ?? ""
    }
})

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
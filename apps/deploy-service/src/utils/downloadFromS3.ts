import { GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { client } from "../aws";
import path from "path"
import fs from "fs"

export default async function DownloadFromS3 (prefix: string) {
    const allFiles = new ListObjectsV2Command({
        Bucket: "deploy-now",
        Prefix: prefix
    });
    const response = await client.send(allFiles);
    const allpromises = (response.Contents ?? []).map(async ({ Key }) => {
        return new Promise(async (resolve) => {
            if (!Key) {
                resolve("");
                return;
            }
            const finalOutputPath = path.join(`${__dirname.slice(0, __dirname.length - 9)}dist/`, Key);
            const outputFile = fs.createWriteStream(finalOutputPath);
            const dirName = path.dirname(finalOutputPath);
            if(!fs.existsSync(dirName)){
                fs.mkdirSync(dirName, {recursive: true});
            }
            const getObject = new GetObjectCommand({
                Bucket: "deploy-now",
                Key: Key
            });
            const getObjectRes = await client.send(getObject);
            const bodyStream: any = getObjectRes.Body;
            if (bodyStream && typeof bodyStream.pipe === "function") {
                bodyStream
                    .pipe(outputFile)
                    .on("finish", () => resolve(""))
                    .on("error", () => resolve(""));
            }else{
                resolve("");
                return;
            }
        });
    });
    console.log("awaiting");
    await Promise.all(allpromises.filter(x => x!=undefined));
}
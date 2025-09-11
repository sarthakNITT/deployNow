import {
    S3Client,
    PutObjectCommand,
} from "@aws-sdk/client-s3";
import fs from "fs"

const client = new S3Client({
    region: "auto",
    endpoint: process.env.CLOUDFARE_URL,
    credentials: {
        accessKeyId: process.env.CLOUDFARE_ACCESS_ID ?? "",
        secretAccessKey: process.env.CLOUDFARE_SECRET_ACCESS_KEY ?? "",
    },
  });

export default async function PushToS3 (fileName: string, filePath: string) {
    const fileContent = fs.readFileSync(filePath);
    const push = await client.send(new PutObjectCommand({
        Body: fileContent,
        Bucket: "deploy-now",
        Key: fileName
    }))
    console.log(push);
}
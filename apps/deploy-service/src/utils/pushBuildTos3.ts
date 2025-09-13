import fs from 'fs';

import { client } from '@repo/aws-clilent/client';
import { PutObjectCommand } from '@aws-sdk/client-s3';

export default async function PushBuildToS3(
  fileName: string,
  filePath: string
) {
  const fileContent = fs.readFileSync(filePath);
  const push = await client.send(
    new PutObjectCommand({
      Body: fileContent,
      Bucket: 'deploy-now',
      Key: fileName,
    })
  );
  console.log(push);
}

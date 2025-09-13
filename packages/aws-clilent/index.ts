import { S3Client } from '@aws-sdk/client-s3';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../../.env') });

export const client = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFARE_URL,
  credentials: {
    accessKeyId: process.env.CLOUDFARE_ACCESS_ID ?? '',
    secretAccessKey: process.env.CLOUDFARE_SECRET_ACCESS_KEY ?? '',
  },
});

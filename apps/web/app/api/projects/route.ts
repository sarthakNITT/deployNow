import { client } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { client as clientAws } from '@repo/aws-clilent/client';
import { ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3';

export async function POST (req: NextRequest) {
    const body = await req.json();
    const url: string = body.url;
    const projectId: string | undefined = body.projectId;
    await client.$connect();

    try {
        if (!url || !projectId) {
            return NextResponse.json({ message: "Invalid input" }, { status: 400 });
        }

        const user = await currentUser();
        if (!user?.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const email = user.emailAddresses?.[0]?.emailAddress;
        if (!email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        
        const checkUser = await client.user.findFirst({
            where: {email: email}
        })

        if(!checkUser){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await client.project.create({
            data: {
                url: url,
                projectId: projectId,
                status: "uploaded",
                userId: checkUser.id
            }
        })

        return NextResponse.json({
            message: "Db hit successfull"
        })
    } catch (error) {
        console.log(error);

        const check = await client.project.findFirst({
            where: {url: url, projectId: projectId}
        })

        if(check){
            await client.project.delete({
                where: { id: check.id }
            })
            console.log("entry already exists: deleted");
        }

        const prefix = `output/${projectId}/`;

        const listed = await clientAws.send(new ListObjectsV2Command({
            Bucket: "deploy-now",
            Prefix: prefix,
        }));

        if (!listed.Contents) return NextResponse.json({ message: "no files in the dir"});

        for (const obj of listed.Contents) {
            if (!obj.Key) continue;
            await clientAws.send(new DeleteObjectCommand({
                Bucket: "deploy-now",
                Key: obj.Key,
            }));
        }

        return NextResponse.json({
            message: typeof (error as any)?.message === 'string' ? (error as any).message : String(error)
        }, { status: 500 })
    } finally {
        await client.$disconnect();
    }
}
import { client } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { client as clientAws } from '@repo/aws-clilent/client';
import { ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3';

export async function GET () {
    await client.$connect();
    try {
        const user = await currentUser();
        if (!user?.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const email = user.emailAddresses?.[0]?.emailAddress;
        if (!email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const dbUser = await client.user.findFirst({ where: { email } });
        if (!dbUser) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const projects = await client.project.findMany({
            where: { userId: dbUser.id },
            orderBy: { createdAt: 'desc' }
        });

        const deployments = projects.map((p) => {
            // derive a readable project name from repo URL if possible
            let projectName = 'project';
            if (p.url) {
                try {
                    const last = p.url.split('/').filter(Boolean).pop();
                    projectName = last ? last.replace(/\.git$/i, '') : projectName;
                } catch {}
            }
            return {
                id: p.projectId ?? p.id,
                projectName,
                url: p.url ?? undefined,
                status: (p.status as any) ?? 'ready',
                createdAt: p.createdAt.toISOString(),
            };
        });

        return NextResponse.json(deployments);
    } catch (error) {
        return NextResponse.json({
            message: typeof (error as any)?.message === 'string' ? (error as any).message : String(error)
        }, { status: 500 });
    } finally {
        await client.$disconnect();
    }
}

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

export async function PATCH (req: NextRequest) {
    const body = await req.json();
    const projectId: string | undefined = body.projectId;
    const status: string | undefined = body.status;
    const url: string | undefined = body.url;
    await client.$connect();

    try {
        if (!projectId || !status) {
            return NextResponse.json({ message: "Invalid input" }, { status: 400 });
        }

        const project = await client.project.findFirst({ where: { projectId } });
        if (!project) {
            return NextResponse.json({ message: "Project not found" }, { status: 404 });
        }

        const updated = await client.project.update({
            where: { id: project.id },
            data: {
                status,
                ...(url ? { url } : {}),
            }
        });

        return NextResponse.json({
            message: "Project updated",
            project: updated,
        });
    } catch (error) {
        return NextResponse.json({
            message: typeof (error as any)?.message === 'string' ? (error as any).message : String(error)
        }, { status: 500 })
    } finally {
        await client.$disconnect();
    }
}
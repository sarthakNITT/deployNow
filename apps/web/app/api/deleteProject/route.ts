import { client } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest) {
    const body = await req.json();
    const project_id = body.project_id;

    await client.$connect();
    console.log("DB connected successully");

    const project = await client.project.findFirst({
        where: {projectId: project_id}
    })
    
    await client.project.delete({
        where: {id: project?.id}
    })

    return NextResponse.json({
        message: "project deleted"
    })
}
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { client } from "@repo/db";

export async function GET (req: NextRequest) {
    try {
        const user = await currentUser();
        const response = await client.user.findFirst({
            where: {email: user?.emailAddresses[0]?.emailAddress}
        })
        const projects = await client.project.findMany({
            where: {userId: response?.id}
        })

        return NextResponse.json(projects)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: error
        })
    }
}
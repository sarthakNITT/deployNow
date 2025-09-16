import { client } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server"

export async function POST (req: NextRequest) {
    try {
        const body = await req.json();
        const url = body?.url as string | undefined;
        const projectId = body?.projectId as string | undefined;

        if (!url) {
            return NextResponse.json({ message: "Missing 'url' in body" }, { status: 400 });
        }

        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const userIdFromAuth = user.id;
        const email = user.emailAddresses?.[0]?.emailAddress ?? null;
        const name = user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.firstName ?? null;

        // Resolve a stable DB user id to satisfy the FK without violating the unique email constraint
        let dbUserId = userIdFromAuth;
        if (email) {
            const existingByEmail = await client.user.findUnique({ where: { email } });
            if (existingByEmail) {
                dbUserId = existingByEmail.id;
            } else {
                await client.user.create({
                    data: { id: dbUserId, email, name: name ?? undefined },
                });
            }
        } else {
            // No email available: ensure a user exists keyed by auth id; avoid touching email to keep uniqueness intact
            await client.user.upsert({
                where: { id: dbUserId },
                update: { name: name ?? undefined },
                create: { id: dbUserId, email: `${dbUserId}@placeholder.local`, name: name ?? undefined },
            });
        }

        const created = await client.project.create({
            data: {
                url,
                userId: dbUserId,
            },
        });

        return NextResponse.json({ message: 'Project created', project: created }, { status: 201 });
    } catch (error: any) {
        console.error('Error creating project:', error);
        return NextResponse.json({ message: 'Error creating project', error: String(error?.message ?? error) }, { status: 500 });
    }
}
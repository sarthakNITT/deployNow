import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'
import { client } from "@repo/db"

export async function POST(req: NextRequest) {
    try {
    await client.$connect();
    console.log("prisma connected successfully");
    const evt = await verifyWebhook(req as any)

    const { id } = evt.data
    const eventType = evt.type
    if (evt.type === 'user.created') {
        console.log('userId:', evt.data)
        const primaryEmail = evt.data.email_addresses.find((e) => e.id === (evt.data as any).primary_email_address_id) || evt.data.email_addresses[0]
        const email = primaryEmail?.email_address
        if (!email) {
            return new Response('No email found on Clerk event', { status: 400 })
        }
        await client.user.create({
            data: {
                email,
                name: evt.data.first_name
            }
        })
        console.log("User synced with db");
    }

    return new Response('User created and Synced', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}
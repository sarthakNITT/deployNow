import { NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { client } from '@repo/db'

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const projectId: string | undefined = body?.projectId
    const url: string | undefined = body?.url

    if (!projectId || !url) {
      return new Response('Missing projectId or url', { status: 400 })
    }

    const project = await client.project.create({

      data: ({
        url,
        projectId,
        userId,
      } as any),
    })

    return new Response(JSON.stringify(project), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    console.error('Failed to create project:', error)
    // Surface Prisma error codes to help debugging (e.g., P2003 FK violation)
    const message = error?.code ? `Prisma error ${error.code}: ${error.message}` : 'Internal Server Error'
    return new Response(message, { status: 500 })
  }
}



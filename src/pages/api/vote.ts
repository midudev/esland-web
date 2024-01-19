import { addUserVotes, cleanUserVotes } from "@/db/client";
import { type APIRoute } from "astro";
import { getSession } from "auth-astro/server";
import { votesSchema } from '@/schemas/votes.ts';

export const POST: APIRoute = async ({ request }) => {
  const session = await getSession(request)

  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }

  const username = session?.user?.name

  if (!username) {
    return new Response('Unauthorized', { status: 401 })
  }

  let votesToSave = []
  try {
    const { votes } = await request.json()
    votesSchema.parse(votes)
    votesToSave = votes
  } catch (e) {
    return new Response('Bad Request', { status: 400 })
  }

  try {
    await cleanUserVotes(username)
    await addUserVotes(username, votesToSave)
  } catch (e) {
    console.error(e)
    return new Response('Internal Server Error', { status: 500 })
  }

  return new Response("ok", { status: 200 })
}
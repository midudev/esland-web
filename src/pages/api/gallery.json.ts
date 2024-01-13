import type { APIRoute } from "astro";

import galleryInfo from '@/data/meta-gallery.json'

export const GET: APIRoute = ({ request }) => {
  const { url } = request
  const searchParams = new URL(url).searchParams
  
  const edition = Number(searchParams.get('edition') ?? '1')
  const offset = Number(searchParams.get('offset') ?? '0')

  const editionIndex = edition - 1
  const editionInfo = galleryInfo[editionIndex]

  return new Response(JSON.stringify(editionInfo.slice(offset))
  )
}
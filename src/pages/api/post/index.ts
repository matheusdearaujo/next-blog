import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handle(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== "GET") {
    return response.status(405).end();
  }

  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true, username: true, image: true },
      },
    },
    orderBy: { id: "desc" },
  });

  return response.status(200).json(posts);
}

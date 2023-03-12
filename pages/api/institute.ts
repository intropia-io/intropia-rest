/**
 * @swagger
 * /api/institute:
 *   get:
 *     tags: [Institutes]
 *     description: Returns all institutes
 *     parameters:
 *       - name: take
 *         description: take number of rows (default 10)
 *         in: query
 *         required: false
 *         type: number
 *       - name: skip
 *         description: how many rows to skip (default 0)
 *         in: query
 *         required: false
 *         type: number
 *       - name: sort
 *         description: asc
 *         in: query
 *         default: desc
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: success result
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 $ref: '#/components/schemas/Institute'
 */

import type { NextApiRequest, NextApiResponse } from "next";
import { hasRights } from "../../prisma/hasRights";
import { prisma } from "@intropia-io/prisma-schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  const token = req.headers.authorization?.split(" ")[1];
  const _hasRights = await hasRights({ token: token! });
  if (!_hasRights)
    return res.status(400).json({ error: "auth not correct" });

  const {
    query: { take, skip, sort },
  } = req;
  const quests = await prisma.organizations.findMany({
    take: take ? parseInt(take.toString()) : 10,
    skip: skip ? parseInt(skip.toString()) : undefined,
    select: {
      id: true,
      name: true,
      description: true,
      avatar: true,
      cover: true,
      color: true,
      market: true,
      treasury: true,
      dateFounded: true,
      verified: true,
      createdAt: true,
      updatedAt: true,
      textBlocks: true,
      tags: true,
      linkWebsite: true,
      linkTelegram: true,
      linkTwitter: true,
      linkReddit: true,
      linkDiscord: true,
      linkMedium: true,
      contractAddress: true,
      state: true,
    },
    orderBy: [
      {
        name: sort === "desc" ? sort : "asc",
      },
    ],
  });
  return res.status(200).json(quests);
}

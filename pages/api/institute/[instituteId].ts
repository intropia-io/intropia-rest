/**
 * @swagger
 * /api/institute/{instituteId}:
 *   get:
 *     tags: [Institutes]
 *     description: Returns all institutes
 *     parameters:
 *       - name: instituteId
 *         description: id of organization
 *         in: path
 *         required: true
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
import { hasRights } from "../../../prisma/hasRights";
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

  const { instituteId } = req.query;

  const {
    query: { },
  } = req;
  const quests = await prisma.organizations.findUnique({
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
    where: {
      id: instituteId?.toString()
    },
  });
  return res.status(200).json(quests);
}

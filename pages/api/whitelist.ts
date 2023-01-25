/**
 * @swagger
 * /api/whitelist:
 *   get:
 *     tags: [Whitelist Subscribes]
 *     description: Returns all whitelist subscribes
 *     responses:
 *       200:
 *         description: success result
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 $ref: '#/components/schemas/WhitelistSubscribes'
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
  const _hasRights = await hasRights({ token: token!, type: "INHOUSE" });
  if (!_hasRights)
    return res.status(400).json({ error: "auth not correct" });

  const types = await prisma.whitelistSubscribes.findMany({
    orderBy: [
      {
        createdAt: "asc",
      },
    ],
  });
  return res.status(200).json(types);
}

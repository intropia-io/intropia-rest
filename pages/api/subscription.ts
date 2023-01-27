/**
 * @swagger
 * /api/subscription:
 *   get:
 *     tags: [Bot Subscription]
 *     description: Returns all bot subscriptions
 *     responses:
 *       200:
 *         description: success result
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 $ref: '#/components/schemas/BotSubscription'
 */

import type { NextApiRequest, NextApiResponse } from "next";
import { hasRights } from "../../prisma/hasRights";
import { prisma } from "@intropia-io/prisma-schema";
import { BotType } from "../../models/defaultTypes";


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

  const types = await prisma.botSubscription.findMany({
    where: {
      bot: process.env.NEXT_PUBLIC_BOT_TYPE as BotType,
    },
    orderBy: [
      {
        createdAt: "asc",
      },
    ],
  });
  return res.status(200).json(types);
}

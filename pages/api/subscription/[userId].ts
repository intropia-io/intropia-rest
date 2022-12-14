/**
 * @swagger
 * /api/subscription/{userId}:
 *   get:
 *     tags: [Bot Subscription]
 *     description: get user subscription info
 *     parameters:
 *       - name: userId
 *         description: id of user chat
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
 *                 $ref: '#/components/schemas/BotSubscription'
 */

import type { NextApiRequest, NextApiResponse } from "next";
import { hasRights } from "../../../prisma/hasRights";
import prisma from "../../../utilities/prisma";
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

    const { userId } = req.query;
    if (!userId)
        return res.status(401).json({ error: "no userId" })


    const user = await prisma.botSubscription.findUnique({
        select: {
            firstName: true,
            lastName: true,
            username: true,
            dynasties: true,
            questTypes: true,
            eventTypes: true,
            reffProgram: true,
            updateFrequency: true
        },
        where: {
            userId: userId.toString(),
        }
    });
    return res.status(200).json(user);
}

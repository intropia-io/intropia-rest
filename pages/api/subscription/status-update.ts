/**
 * @swagger
 * /api/subscription/status-update:
 *   post:
 *     tags: [Bot Subscription]
 *     description: update subscription statys
 *     requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/BotSubscriptionStatusPost'
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
import prisma from "@intropia-io/prisma-schema/utilities/prisma";
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



    const { userId, status } = req.body;

    const user = await prisma.botSubscription.update({
        where: {
            userId: userId.toString(),
        },
        data: {
            status
        }

    });
    return res.status(200).json(user);
}

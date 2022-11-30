/**
 * @swagger
 * /api/subscription/create:
 *   post:
 *     tags: [Bot Subscription]
 *     description: create new subscription
 *     requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/BotSubscriptionPost'
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

    const token = req.headers.authorization?.split(" ")[1];
    const _hasRights = await hasRights({ token: token!, type: "INHOUSE" });
    if (!_hasRights)
        return res.status(400).json({ error: "auth not correct" });



    const { userId, fisrtName, lastName, username, dynasty, questTypes, eventTypes, reffProgram, updateFrequency } = req.body;

    const types = await prisma.botSubscription.upsert({
        where: {
            userId: userId,
        },
        update: {
            fisrtName,
            lastName,
            username,
            dynasties: {
                connect: dynasty.length > 0 ? dynasty.map((dynasty: string) => ({ id: dynasty })) : []
            },
            questTypes: {
                connect: questTypes.length > 0 ? questTypes.map((questType: string) => ({ id: questType })) : []
            },
            eventTypes: {
                connect: eventTypes.length > 0 ? eventTypes.map((eventType: string) => ({ id: eventType })) : []
            },
            reffProgram,
            updateFrequency
        },
        create: {
            userId,
            fisrtName,
            lastName,
            username,
            dynasties: {
                connect: dynasty.length > 0 ? dynasty.map((dynasty: string) => ({ id: dynasty })) : []
            },
            questTypes: {
                connect: questTypes.length > 0 ? questTypes.map((questType: string) => ({ id: questType })) : []
            },
            eventTypes: {
                connect: eventTypes.length > 0 ? eventTypes.map((eventType: string) => ({ id: eventType })) : []
            },
            reffProgram,
            updateFrequency
        }

    });
    return res.status(200).json(types);
}

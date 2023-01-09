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

    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    const token = req.headers.authorization?.split(" ")[1];
    const _hasRights = await hasRights({ token: token!, type: "INHOUSE" });
    if (!_hasRights)
        return res.status(400).json({ error: "auth not correct" });



    const { userId, firstName, lastName, username, dynasty, questTypes, eventTypes, reffProgram, updateFrequency } = req.body;

    const user = await prisma.botSubscription.findUnique({ where: { userId: userId.toString() } });

    const types = await prisma.botSubscription.upsert({
        where: {
            userId: userId.toString(),
        },
        update: {
            firstName,
            lastName,
            username,
            dynasties: {
                set: [],
                connect: (dynasty && dynasty.length > 0) ? dynasty.map((dynasty: string) => ({ id: dynasty })) : []
            },
            questTypes: {
                set: [],
                connect: (questTypes && questTypes.length > 0) ? questTypes.map((questType: string) => ({ id: questType })) : []
            },
            eventTypes: {
                set: [],
                connect: (eventTypes && eventTypes.length > 0) ? eventTypes.map((eventType: string) => ({ id: eventType })) : []
            },
            reffProgram,
            updateFrequency,
            status: "SUBSCRIBED"
        },
        create: {
            userId: userId.toString(),
            firstName,
            lastName,
            username,
            status: "NEW"
        }

    });
    if (user?.status === "NEW" && types.status === "SUBSCRIBED") {
        const task = await prisma.scheduleTask.findFirst({
            where: {
                entityId: userId.toString(),
            },
        });

        if (!task) {
            await prisma.scheduleTask.create({
                data: {
                    name: "New subscribed User",
                    entityType: "USER",
                    entityId: userId.toString(),
                    taskType: "INFORM_BOT_REALTIME",
                },
            });
        }
    }
    return res.status(200).json(types);
}

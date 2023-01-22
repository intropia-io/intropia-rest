/**
 * @swagger
 * /api/quest/{questId}:
 *   get:
 *     tags: [Quests]
 *     description: Get Quest by id
 *     parameters:
 *       - name: questId
 *         description: id of quest
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
 *                 $ref: '#/components/schemas/Quest'
 */
import type { NextApiRequest, NextApiResponse } from 'next'
import { hasRights } from '../../../prisma/hasRights';
import { prisma } from "@intropia-io/prisma-schema";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    const { questId } = req.query;
    const token = req.headers.authorization?.split(" ")[1];
    const _hasRights = await hasRights({ token: token! });
    if (!_hasRights)
        return res.status(400).json({ error: "auth not correct" });

    if (!questId)
        return res.status(401).json({ error: "no questId" })

    const quest = await prisma.quests.findFirst({
        select: {
            id: true,
            title: true,
            description: true,
            dynasty: {
                select: {
                    name: true
                }
            },
            token: {
                select: {
                    name: true,
                    avatar: true
                }
            },
            type: {
                select: {
                    name: true
                }
            },
            linkApply: true,
            rewardFrom: true,
            rewardTo: true,
            textBlocks: true,
            updatedAt: true,
            organization: {
                select: {
                    contractAddress: true
                }
            }
        },
        where: { id: questId?.toString(), state: "PUBLISHED", },
    })
    return res.status(200).json(quest)
}

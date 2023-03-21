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
 *       - name: instituteId
 *         description: filter by instituteId of institute
 *         in: query
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
 *                 $ref: '#/components/schemas/Quest'
 *   patch:
 *     tags: [Quests]
 *     description: Update quest by id
 *     parameters:
 *       - name: questId
 *         description: id of quest
 *         in: path
 *         required: true
 *         type: string
 *     requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/QuestPost'
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
    const { questId, instituteId } = req.query;
    const token = req.headers.authorization?.split(" ")[1];
    if (req.method === 'GET') {
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
                dynasty: true,
                reffReward: true,
                reffLink: true,
                token: true,
                type: true,
                linkApply: true,
                rewardFrom: true,
                rewardTo: true,
                textBlocks: true,
                createdAt: true,
                updatedAt: true,
                organization: true,
                state: true,
                tokenReward: true,
                tags: true,
            },
            where: { id: questId?.toString(), organization: { id: { equals: instituteId ? instituteId.toString() : undefined } }, },
        })
        return res.status(200).json(quest)
    }
    else if (req.method === 'PATCH') {
        const _hasRights = await hasRights({ token: token!, type: "INHOUSE" });
        if (!_hasRights)
            return res.status(400).json({ error: "auth not correct" });

        if (!questId)
            return res.status(401).json({ error: "no questId" })

        const updatedItem = await prisma.quests.update({
            data: {
                title: req.body.title,
                description: req.body.description,
                tags: {
                    set: [],
                    connect:
                        req.body.tags === ""
                            ? []
                            : req.body.tags?.split(",").map((tag: string) => ({
                                id: tag,
                            })),
                },

                reffLink: req.body.reffLink,

                ...(req.body.tokenReward
                    ? {
                        tokenReward: {
                            connect: {
                                id: req.body.tokenReward,
                            },
                        },
                    }
                    : {
                        tokenReward: {
                            disconnect: true,
                        },
                    }),

                reffReward: req.body.reffReward ? Number(req.body.reffReward) : null,
                state: req.body.state,

                organization: {
                    connect: {
                        id: req.body.organization,
                    },
                },

                dynasty: {
                    connect: {
                        id: req.body.dynasty,
                    },
                },

                type: {
                    connect: {
                        id: req.body.type,
                    },
                },

                linkApply: req.body.linkApply,

                ...(req.body.token
                    ? {
                        token: {
                            connect: {
                                id: req.body.token,
                            },
                        },
                    }
                    : {
                        token: {
                            disconnect: true,
                        },
                    }),

                rewardFrom: req.body.rewardFrom ? parseInt(req.body.rewardFrom) : null,
                rewardTo: req.body.rewardTo ? parseInt(req.body.rewardTo) : null,
                textBlocks: req.body.textBlocks,
            },
            where: {
                id: questId.toString(),
            },
        });

        return res.status(200).json(updatedItem)
    }
}

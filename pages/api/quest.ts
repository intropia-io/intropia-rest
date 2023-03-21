/**
 * @swagger
 * /api/quest:
 *   get:
 *     tags: [Quests]
 *     description: Returns all active quests
 *     parameters:
 *       - name: take
 *         description: take number of rows (default 100)
 *         in: query
 *         required: false
 *         type: number
 *       - name: skip
 *         description: how many rows to skip (default 0)
 *         in: query
 *         required: false
 *         type: number
 *       - name: sort
 *         description: desc or asc
 *         in: query
 *         default: desc
 *         required: false
 *         type: string
 *       - name: contractAddress
 *         description: filter by contract address of institute
 *         in: query
 *         required: false
 *         type: string
 *       - name: instituteId
 *         description: filter by instituteId of institute
 *         in: query
 *         required: false
 *         type: string
 *       - name: type
 *         description: filter by type of job
 *         in: query
 *         required: false
 *         type: string
 *       - name: search
 *         description: filter by name
 *         in: query
 *         required: false
 *         type: string
 *       - name: state
 *         description: filter by state
 *         in: query
 *         required: false
 *         type: string
 *       - name: rewards
 *         description: filter by rewards
 *         in: query
 *         required: false
 *         type: string
 *       - name: count
 *         description: return count of rows
 *         in: query
 *         required: false
 *         type: boolean
 *       - name: withApply
 *         in: query
 *         required: false
 *         type: boolean
 *       - name: applySelect
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
 *   post:
 *     tags: [Quests]
 *     description: Add new job
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
import { hasRights } from '../../prisma/hasRights';
import { prisma } from "@intropia-io/prisma-schema";
import { ApplyHistoryStatus, EntityStates } from '@prisma/client';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    const token = req.headers.authorization?.split(" ")[1];

    if (req.method === 'GET') {
        const _hasRights = await hasRights({ token: token! });
        if (!_hasRights)
            return res.status(400).json({ error: "auth not correct" });

        const {
            query: { take, skip, sort, contractAddress, instituteId, type, search, state, rewards, count, withApply, applySelect, },
        } = req;
        const applyStatuses = applySelect ? applySelect.toString().split(",").map(status => status.trim() as ApplyHistoryStatus) : undefined;
        if (count) {
            const count = await prisma.quests.count({
                where: {
                    organization: { contractAddress: { contains: contractAddress ? contractAddress.toString() : undefined }, id: { equals: instituteId ? instituteId.toString() : undefined } },
                    type: { id: type ? type.toString() : undefined },
                    title: { contains: search ? search.toString() : undefined },
                    state: state ? state.toString() as EntityStates : undefined,
                    reffReward: rewards === "true" ? { gt: 0 } : rewards === "false" ? null : undefined,
                    apply: withApply ? {
                        some: {
                            historyStatus: {
                                some: {
                                    status: {
                                        in: applyStatuses
                                    }
                                }
                            }
                        }
                    } : undefined,

                },
            });
            return res.status(200).json(count);
        }






        const quests = await prisma.quests.findMany({
            take: take ? parseInt(take.toString()) : 100,
            skip: skip ? parseInt(skip.toString()) : undefined,
            select: {
                id: true,
                title: true,
                description: true,
                dynasty: true,
                token: true,
                type: true,
                linkApply: true,
                rewardFrom: true,
                rewardTo: true,
                textBlocks: true,
                reffReward: true,
                createdAt: true,
                updatedAt: true,
                organization: true,
                state: true,
                tokenReward: true,
                tags: true,
                apply: withApply && applyStatuses ? {
                    select: {
                        historyStatus: {
                            select: {
                                status: true,
                                createdAt: true,
                            },
                            orderBy: {
                                createdAt: "desc",
                            },
                            take: 1,
                        },
                    },
                    where: {
                        historyStatus: {
                            some: {
                                status: {
                                    in: applyStatuses
                                }
                            }
                        }
                    }
                } : undefined,
            },
            where: {
                organization: { contractAddress: { contains: contractAddress ? contractAddress.toString() : undefined }, id: { equals: instituteId ? instituteId.toString() : undefined } },
                type: { id: type ? type.toString() : undefined },
                title: { contains: search ? search.toString() : undefined },
                state: state ? state.toString() as EntityStates : undefined,
                reffReward: rewards === "true" ? { gt: 0 } : rewards === "false" ? null : undefined,
                apply: withApply ? {
                    some: {
                        historyStatus: {
                            some: {
                                status: {
                                    in: applyStatuses
                                }
                            }
                        }
                    }
                } : undefined,

            },
            orderBy: [
                {
                    createdAt: sort === "asc" ? sort : "desc",
                },
            ]
        })
        return res.status(200).json(quests)
    }
    else if (req.method === 'POST') {
        const _hasRights = await hasRights({ token: token!, type: "INHOUSE" });
        if (!_hasRights)
            return res.status(400).json({ error: "auth not correct" });


        const createdItem = await prisma.quests.create({
            data: {
                title: req.body.title,
                description: req.body.description,
                tags: {
                    connect:
                        req.body.tags?.split(",").map((tag: string) => ({
                            id: tag,
                        })),
                },

                reffLink: req.body.reffLink,
                tokenReward: {
                    connect: {
                        id: req.body.tokenReward,
                    },
                },
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
                token: {
                    connect: {
                        id: req.body.token,
                    },
                },
                rewardFrom: req.body.rewardFrom ? parseInt(req.body.rewardFrom) : null,
                rewardTo: req.body.rewardTo ? parseInt(req.body.rewardTo) : null,
                textBlocks: req.body.textBlocks,
            }
        });

        return res.status(200).json(createdItem)

    }
}

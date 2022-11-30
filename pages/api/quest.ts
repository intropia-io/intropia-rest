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
import prisma from '../../utilities/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const token = req.headers.authorization?.split(" ")[1];
    const _hasRights = await hasRights({ token: token! });
    if (!_hasRights)
        return res.status(400).json({ error: "auth not correct" });

    const {
        query: { take, skip, sort, contractAddress, instituteId },
    } = req;
    const quests = await prisma.quests.findMany({
        take: take ? parseInt(take.toString()) : 100,
        skip: skip ? parseInt(skip.toString()) : undefined,
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
                    id: true,
                    name: true,
                    contractAddress: true
                }
            }
        },
        where: {
            state: "PUBLISHED",
            organization: { contractAddress: { contains: contractAddress ? contractAddress.toString() : undefined }, id: { equals: instituteId ? instituteId.toString() : undefined } }
        },
        orderBy: [
            {
                createdAt: sort === "asc" ? sort : "desc",
            },
        ]
    })
    return res.status(200).json(quests)
}

/**
 * @swagger
 * /api/quests/{questId}:
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
import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from '../../../utilits/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const {questId} = req.query;
    const token = req.headers.authorization;
    if (!token || token !== `Bearer ${process.env.NEXT_PUBLIC_DAOHQ_BEARER}`)
        return res.status(400).json({error: "token not defined"})

    if (!questId)
        return res.status(401).json({error: "no questId"})

    const quest = await prisma.quests.findUnique({
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
        where: {id: questId?.toString()},
    })
    return res.status(200).json(quest)
}

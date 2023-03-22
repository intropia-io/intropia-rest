/**
 * @swagger
 * /api/apply/count:
 *   post:
 *     tags: [Apply]
 *     description: Get apply count
 *     parameters:
 *       - name: applySelect
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
 *                 $ref: '#/components/schemas/Apply'
 */

import { prisma } from "@intropia-io/prisma-schema";
import { ApplyHistoryStatus } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { hasRights } from "../../../prisma/hasRights";

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

    const {
        query: { applySelect, instituteId }
    } = req;

    const applyStatuses = applySelect ? applySelect.toString().split(",").map(status => status.trim() as ApplyHistoryStatus) : undefined;

    const result = await prisma.apply.findMany({
        select: {
            id: true,
            historyStatus: {
                select: {
                    status: true
                },
                take: 1,
                orderBy: {
                    createdAt: "desc"
                }
            }
        },
        where: {
            quest: {
                organizationId: instituteId?.toString()
            }
        },
    });

    if (applyStatuses)
        return res.status(200).json(result.filter(apply => applyStatuses.includes(apply.historyStatus[0].status)).length);
    else
        return res.status(200).json((result as any).length);
}

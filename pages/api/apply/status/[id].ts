/**
 * @swagger
 * /api/apply/status/{id}:
 *   post:
 *     tags: [Apply]
 *     description: Change status of apply
 *     parameters:
 *       - name: id
 *         description: id of apply
 *         in: path
 *         required: true
 *         type: string
 *       - name: status
 *         description: status
 *         in: query
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
 *                 $ref: '#/components/schemas/Apply'
 */

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@intropia-io/prisma-schema";
import { hasRights } from "../../../../prisma/hasRights";
import { ApplyHistoryStatus } from "@prisma/client";

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
        query: { id }
    } = req;

    const { status } = req.body;

    const apply = await prisma.applyStatusHistory.create({
        data: {
            status: status?.toString() as ApplyHistoryStatus || undefined,
            apply: {
                connect: {
                    id: id?.toString() || undefined
                }
            }
        }
    });
    return res.status(200).json(apply);
}

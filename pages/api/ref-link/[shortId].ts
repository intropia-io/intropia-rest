/**
 * @swagger
 * /api/ref-link/{shortId}:
 *   get:
 *     tags: [Ref Link]
 *     description: get ref link info
 *     parameters:
 *       - name: shortId
 *         description: short id of ref link
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
 *                 $ref: '#/components/schemas/RefLink'
 */

import { prisma } from "@intropia-io/prisma-schema";
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

    const { shortId } = req.query;
    if (!shortId)
        return res.status(401).json({ error: "no shortId" })


    const link = await prisma.refLink.findUnique({
        where: {
            shortId: shortId.toString()
        }
    });
    return res.status(200).json(link);
}

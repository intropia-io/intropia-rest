/**
 * @swagger
 * /api/apply/{id}:
 *   post:
 *     tags: [Apply]
 *     description: Get apply by id
 *     parameters:
 *       - name: id
 *         description: id of apply
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
 *                 $ref: '#/components/schemas/Apply'
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

    const {
        query: { id }
    } = req;


    const apply = await prisma.apply.findFirst({
        select: {
            id: true,
            createdAt: true,
            expectedSalary: true,
            link: true,
            quest: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    organization: {
                        select: {
                            id: true,
                            name: true,
                            avatar: true,
                        }
                    }
                }
            },
            historyStatus: {
                select: {
                    status: true,
                    createdAt: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
                take: 1,
            },
            contactEmail: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    image: true,
                    resumeLink: true,
                    telegram: true,
                    twitterLink: true,
                    githubLink: true,
                },
            },
            cv: true,
        },
        where: {
            id: id?.toString(),

        },
    });
    return res.status(200).json(apply);
}

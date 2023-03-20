/**
 * @swagger
 * /api/apply:
 *   get:
 *     tags: [Apply]
 *     description: Returns all apply
 *     parameters:
 *       - name: organizationId
 *         description: take filter by organizationId
 *         in: query
 *         required: false
 *         type: string
 *       - name: jobId
 *         description: take filter by jobId
 *         in: query
 *         required: false
 *         type: string
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
import { hasRights } from "../../prisma/hasRights";

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
    query: { take, skip, sort, organizationId, jobId }
  } = req;
  const apply = await prisma.apply.findMany({
    take: take ? parseInt(take.toString()) : 100,
    skip: skip ? parseInt(skip.toString()) : undefined,
    select: {
      id: true,
      link: true,
      quest: true,
      user: {
        select: {
          id: true,
          username: true,
          contactEmail: true,
          emailVerified: true,
          image: true,
          firstName: true,
          lastName: true,
          description: true,
          resumeLink: true,
          twitterLink: true,
          githubLink: true,
          telegram: true,
          dynasty: true,
          publicAddress: true,
          adminUser: true,
          defaultRefAccount: true,
          apply: true,
          refLink: true,
          refAccount: true,
          createdAt: true,
          updatedAt: true,
        }
      },
      cv: true,
      createdAt: true,
      updatedAt: true,
      historyStatus: {
        select: {
          id: true,
          status: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }
    },
    where: {
      quest: {
        organization: {
          id: organizationId?.toString() || undefined
        },
        id: jobId?.toString() || undefined
      }
    },
    orderBy: [
      {
        createdAt: sort === "asc" ? sort : "desc",
      },
    ]
  });
  return res.status(200).json(apply);
}

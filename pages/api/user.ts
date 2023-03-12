/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     description: Returns all users
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
 *     responses:
 *       200:
 *         description: success result
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 $ref: '#/components/schemas/User'
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
    query: { take, skip, sort },
  } = req;
  const users = await prisma.user.findMany({
    take: take ? parseInt(take.toString()) : 100,
    skip: skip ? parseInt(skip.toString()) : undefined,
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
      firstSignIn: true,
      optIn: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: [
      {
        createdAt: sort === "asc" ? sort : "desc",
      },
    ]
  });
  return res.status(200).json(users);
}

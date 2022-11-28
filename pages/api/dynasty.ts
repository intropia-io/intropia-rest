/**
 * @swagger
 * /api/dynasty:
 *   get:
 *     tags: [Dynasties]
 *     description: Returns all dynasties
 *     responses:
 *       200:
 *         description: success result
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 $ref: '#/components/schemas/Dynasty'
 */

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utilits/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const dynasties = await prisma.dynasty.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      avatar: true,
    },
    where: {
      published: true
    },
    orderBy: [
      {
        name: "asc",
      },
    ],
  });
  return res.status(200).json(dynasties);
}
/**
 * @swagger
 * /api/token:
 *   get:
 *     tags: [Token]
 *     description: Returns all tokens
 *     responses:
 *       200:
 *         description: success result
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 $ref: '#/components/schemas/Token'
 */

import { prisma } from "@intropia-io/prisma-schema";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }


  const types = await prisma.token.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });
  return res.status(200).json(types);
}

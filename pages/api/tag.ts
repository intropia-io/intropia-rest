/**
 * @swagger
 * /api/tag:
 *   get:
 *     tags: [Tag]
 *     description: Returns all tags
 *     responses:
 *       200:
 *         description: success result
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 $ref: '#/components/schemas/Tag'
 */

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@intropia-io/prisma-schema";
import { CategoryType } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }


  const types = await prisma.tags.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });
  return res.status(200).json(types);
}

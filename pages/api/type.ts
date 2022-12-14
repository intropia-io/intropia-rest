/**
 * @swagger
 * /api/type:
 *   get:
 *     tags: [Types]
 *     description: Returns all types
 *     responses:
 *       200:
 *         description: success result
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 $ref: '#/components/schemas/Type'
 */

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utilities/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  const types = await prisma.type.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      color: true,
      categoryType: true,
      customRules: true
    },
    orderBy: [
      {
        name: "asc",
      },
    ],
  });
  return res.status(200).json(types);
}

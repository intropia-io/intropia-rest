/**
 * @swagger
 * /api/type:
 *   get:
 *     tags: [Types]
 *     description: Returns all types
 *     parameters:
 *       - name: categoryName
 *         description: filter by category name
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
 *                 $ref: '#/components/schemas/Type'
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
  }
  else {

    const {
      query: { categoryName },
    } = req;

    const types = await prisma.type.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        color: true,
        categoryType: true,
        customRules: true
      },
      where: {
        categoryType: categoryName?.toString() as CategoryType || undefined
      },
      orderBy: [
        {
          name: "asc",
        },
      ],
    });
    res.status(200).json(types);
  }
}

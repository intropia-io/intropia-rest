/**
 * @swagger
 * /api/ref-link:
 *   get:
 *     tags: [Ref Link]
 *     description: Returns all ref links
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



  const refLinks = await prisma.refLink.findMany({});
  return res.status(200).json(refLinks);
}

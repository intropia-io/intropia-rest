/**
 * @swagger
 * components:
 *  schemas:
 *    Institute:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: cuid
 *        name:
 *          type: string
 *        description:
 *          type: string
 *        avatar:
 *          type: string
 *        cover:
 *          type: string
 *        color:
 *          type: string
 *        market:
 *          type: string
 *        treasury:
 *          type: string
 *        dateFounded:
 *          type: string
 *        verified:
 *          type: boolean
 *        textBlocks:
 *          type: string
 *        tags:
 *          type: array
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *        linkWebsite:
 *          type: string
 *        linkTelegram:
 *          type: string
 *        linkTwitter:
 *          type: string
 *        linkReddit:
 *          type: string
 *        linkDiscord:
 *          type: string
 *        linkMedium:
 *          type: string
 *        contractAddress:
 *          type: string
 */

import { Tag } from "./tag";

export interface Institute {
  id: string;
  name: string;
  description: string;
  avatar: string;
  cover: string;
  color: string;
  market: string;
  treasury: string;
  dateFounded: string;
  verified: boolean;
  textBlocks: string;
  tags: Tag[]
  linkWebsite: string;
  linkTelegram: string;
  linkTwitter: string;
  linkReddit: string;
  linkDiscord: string;
  linkMedium: string;
  contractAddress: string;
  createdAt: string;
  updatedAt: string;
}

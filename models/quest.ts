/**
 * @swagger
 * components:
 *  schemas:
 *    Quest:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: cuid
 *        title:
 *          type: string
 *        description:
 *          type: string
 *        dynasty:
 *          $ref: '#/components/schemas/Dynasty'
 *        token:
 *          $ref: '#/components/schemas/Token'
 *        type:
 *          $ref: '#/components/schemas/Type'
 *        linkApply:
 *          type: string
 *        rewardFrom:
 *          type: number
 *        rewardTo:
 *          type: number
 *        textBlocks:
 *          type: string
 *        updatedAt:
 *          type: string
 *          format: date-time
 *        organization:
 *          $ref: '#/components/schemas/Institute'
 *       tags:
 *          type: array
 *       tokenReward:
 *          $ref: '#/components/schemas/Token'
 *       state:
 *          type: string
 */

import { Institute } from "./institute";
import { Dynasty } from "./dynasty";
import { Token } from "./token";
import { Type } from "./type";
import { Tag } from "./tag";
import { EntityStates } from "./defaultTypes";

export interface Quest {
    id: string;
    title: string;
    description: string;
    reffLink: string;
    dynasty: Dynasty;
    token: Token;
    type: Type;
    linkApply: string;
    rewardFrom?: number;
    reffReward?: number;
    rewardTo?: number;
    textBlocks: string;
    createdAt: string;
    updatedAt: string;
    organization: Institute
    tags: Tag[]
    tokenReward: Token
    state: EntityStates
}
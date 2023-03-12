/**
 * @swagger
 * components:
 *  schemas:
 *    QuestPost:
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
 *          $ref: object
 *        token:
 *          $ref: object
 *        type:
 *          $ref: object
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
 *          $ref: object
 *       tags:
 *          type: array
 *       tokenReward:
 *          $ref: object
 *       state:
 *          type: string
 */

import { EntityStates } from "./defaultTypes";

export interface QuestPost {
    title: string;
    description: string;
    tags: [{ value: string }],
    reffLink: string;
    tokenReward?: { value: string }
    reffReward?: number;
    state: EntityStates
    organization: { value: string },
    dynasty: { value: string };
    type: { value: string };
    linkApply: string;
    token?: { value: string };
    rewardFrom?: number;
    rewardTo?: number;
    textBlocks: string;
}
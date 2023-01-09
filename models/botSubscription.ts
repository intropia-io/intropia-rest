/**
 * @swagger
 * components:
 *  schemas:
 *    Type:
 *      type: object
 *      properties:
 *        name:
 *          id: string
 *          userId: string
 *          fisrtName: string
 *          lastName: string
 *          username: string
 *          dynasty:
 *              $ref: '#/components/schemas/Dynasty'
 *          questTypes:
 *              $ref: '#/components/schemas/Type'
 *          eventTypes:
 *              $ref: '#/components/schemas/Type'
 *          reffProgram: ReffProgram
 *          updateFrequency: UpdateFrequency
 */

import { BotUserStatus, ReffProgram, UpdateFrequency } from "./defaultTypes";
import { Dynasty } from "./dynasty";
import { Type } from "./type";

export interface BotSubscription {
    id: number;
    userId: string;
    fisrtName: string;
    lastName: string;
    username: string;
    dynasty: Dynasty[];
    questTypes: Type[];
    eventTypes: Type[];
    reffProgram: ReffProgram;
    updateFrequency: UpdateFrequency;
}

export interface BotSubscriptionPost {
    userId: string;
    fisrtName: string;
    lastName: string;
    username: string;
    dynasty: string[];
    questTypes: string[];
    eventTypes: string[];
    reffProgram: ReffProgram;
    updateFrequency: UpdateFrequency;
}

export interface BotSubscriptionStatusPost {
    userId: string;
    status: BotUserStatus;
}
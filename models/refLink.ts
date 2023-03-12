/**
 * @swagger
 * components:
 *  schemas:
 *    RefLink:
 *      type: object
 *      properties:
 *        name:
 *          id: string
 *          shortId: string
 *          quests: Quest
 *          refUserApply: Apply[]
 *          createdBy: User
 *          refAccount: RefAccount
 *          createdAt: string
 *          updatedAt: string
 */

import { Apply } from "./apply";
import { Quest } from "./quest";
import { RefAccount } from "./refAccount";
import { User } from "./user";

export interface RefLink {
    id: string;
    shortId: string;
    quests: Quest;
    refUserApply: Apply[]
    createdBy: User;
    refAccountId: string;
    refAccount: RefAccount;
    createdAt: string;
    updatedAt: string;
}
/**
 * @swagger
 * components:
 *  schemas:
 *    Apply:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: cuid
 *        link:
 *          type: object
 *          $ref: '#/components/schemas/RefLink'
 *        quest:
 *          type: object
 *          $ref: '#/components/schemas/Quest'
 *        user:
 *          type: object
 *          $ref: '#/components/schemas/User'
 *        cv:
 *          type: object
 *          $ref: '#/components/schemas/Cv'
 *        historyStatus:
 *          type: array
 *          items:
 *          type: object
 *          $ref: '#/components/schemas/ApplyStatusHistory'
 *        contactEmail:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

import { ApplyCV } from "./applyCV";
import { ApplyStatusHistory } from "./applyStatusHistory";
import { Quest } from "./quest";
import { RefLink } from "./refLink";
import { User } from "./user";

export interface Apply {
    id: string;
    link: RefLink;
    quest: Quest;
    historyStatus: ApplyStatusHistory[]
    user: User;
    cv: ApplyCV;
    createdAt: string;
    updatedAt: string;

}
/**
 * @swagger
 * components:
 *  schemas:
 *    Cv:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: cuid
 *        text:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

import { Apply } from "./apply";

export interface ApplyCV {
    id: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    apply: Apply[];
}
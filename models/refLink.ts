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
 *          questId: string
 *          createdById: string
 *          refAccountId: string
 *          createdAt: string
 *          updatedAt: string
 */

export interface RefLink {
    id: string;
    shortId: string;
    questId: string;
    createdById: string;
    refAccountId: string;
    createdAt: string;
    updatedAt: string;
}
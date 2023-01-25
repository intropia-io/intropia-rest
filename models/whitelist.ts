/**
 * @swagger
 * components:
 *  schemas:
 *    WhitelistSubscribes:
 *      type: object
 *      properties:
 *        name:
 *          id: string
 *          email: string
 *          createdAt: string
 */

export interface WhitelistSubscribes {
    id: number;
    email: string;
    createdAt: string;
}
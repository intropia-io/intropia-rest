/**
 * @swagger
 * components:
 *  schemas:
 *    Token:
 *      type: object
 *      properties:
*         id:
 *          type: string
 *        name:
 *          type: string
 *        avatar:
 *          type: string
 */

export interface Token {
    id: string;
    name: string;
    avatar: string
}
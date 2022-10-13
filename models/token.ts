/**
 * @swagger
 * components:
 *  schemas:
 *    Token:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        avatar:
 *          type: string
 */

export interface Token {
    name: string;
    avatar: string
}
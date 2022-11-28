/**
 * @swagger
 * components:
 *  schemas:
 *    Dynasty:
 *      type: object
 *      properties:
 *        name:
 *          id: string
 *          type: string
 *          description: string
 *          avatar: string
 */

export interface Dynasty {
    id: string
    name: string
    description: string
    avatar: string
}
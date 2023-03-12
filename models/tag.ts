/**
 * @swagger
 * components:
 *  schemas:
 *    Tag:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: cuid
 *        name:
 *          type: string
 *        description:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

export interface Tag {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * @swagger
 * components:
 *  schemas:
 *    Organization:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: cuid
 *        name:
 *          type: string
 *        contractAddress:
 *          type: string
 */

export interface Organization {
    id: string
    name: string
    contractAddress: string
}
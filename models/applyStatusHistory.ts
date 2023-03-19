

/**
 * @swagger
 * components:
 *  schemas:
 *    ApplyStatusHistory:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: cuid
 *        apply:
 *         type: object
 *         $ref: '#/components/schemas/Apply'
 *        applyId:
 *         type: string
 *         format: cuid
 *        status:
 *         type: string
 *         enum: [NEW, REQUEST_INFO, VERIFIED, DECLINED, DECLINED_CLIENT, INTERVIEW, SENT_OFFER, DECLINED_OFFER, TEST_PERIOD, APPROVED, FIRED, GET_OFFER]
 *        createdAt:
 *          type: string
 */

import { Apply } from "./apply";
import { ApplyHistoryStatus } from "./defaultTypes";

export interface ApplyStatusHistory {
    id: string
    apply: Apply
    status: ApplyHistoryStatus
    createdAt: string
}
/**
 * @swagger
 * components:
 *  schemas:
 *    Type:
 *      type: object
 *      properties:
 *        name:
 *          id: string
 *          type: string
 *          description: string
 *          color: string
 *          categoryType: CategoryType
 *          customRules: CustomRules[]
 */

import { CategoryType, CustomRules } from "./defaultTypes";

export interface Type {
    id: number;
    name: string;
    description: string;
    color: string;
    categoryType: CategoryType;
    customRules: CustomRules[];
}
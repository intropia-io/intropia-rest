/**
 * @swagger
 * components:
 *  schemas:
 *    RefAccount:
 *      type: object
 *      properties:
 *        name:
 *          id: string
 *          adminUser: User
 *          avatar: string
 *          title: string
 *          description: string
 *          users: User[]
 *          defaultRefAccount: User[]
 *          refLink: RefLink[]
 *          type: RefAccountType
 *          createdAt: string
 *          updatedAt: string
 */

import { RefAccountType } from "./defaultTypes";
import { RefLink } from "./refLink";
import { User } from "./user";

export interface RefAccount {
    id: string;
    adminUser: User;
    avatar: string;
    title: string;
    description: string;
    users: User[];
    defaultRefAccount: User[];
    refLink: RefLink[];
    type: RefAccountType;
    createdAt: string;
    updatedAt: string;
}
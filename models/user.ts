/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: cuid
 *       username:
 *         type: string
 *       contactEmail:
 *         type: string
 *        emailVerified:
 *          type: string
 *        image:
 *          type: string
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        description:
 *          type: string
 *        resumeLink:
 *          type: string
 *        twitterLink:
 *          type: string
 *        githubLink:
 *          type: string
 *        telegram:
 *          type: string
 *        dynasty:
 *          type: Dynasty[]
 *        publicAddress:
 *          type: string
 *        firstSignIn:
 *          type: boolean
 *        optIn:
 *          type: boolean
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

import { Apply } from "./apply";
import { Dynasty } from "./dynasty"
import { RefAccount } from "./refAccount";
import { RefLink } from "./refLink";

export interface User {
    id: string,
    username: string,
    contactEmail: string,
    emailVerified: string,
    image: string,
    firstName: string,
    lastName: string,
    description: string,
    resumeLink: string,
    twitterLink: string,
    githubLink: string,
    telegram: string,
    dynasty: Dynasty[],
    publicAddress: string,
    adminUser: RefAccount[],
    defaultRefAccount: RefAccount,
    apply: Apply[],
    refLink: RefLink[],
    refAccount: RefAccount[],
    //experience        RewardExperience[],
    firstSignIn: boolean,
    optIn: boolean,
    createdAt: string,
    updatedAt: string,
}

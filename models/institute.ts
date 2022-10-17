/**
 * @swagger
 * components:
 *  schemas:
 *    Institute:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: cuid
 *        name:
 *          type: string
 *        description:
 *          type: string
 *        linkWebsite:
 *          type: string
 *        linkTelegram:
 *          type: string
 *        linkTwitter:
 *          type: string
 *        linkReddit:
 *          type: string
 *        linkDiscord:
 *          type: string
 *        linkMedium:
 *          type: string
 *        contractAddress:
 *          type: string
 */

export interface Institute {
  id: string;
  name: string;
  description: string;
  linkWebsite: string;
  linkTelegram: string;
  linkTwitter: string;
  linkReddit: string;
  linkDiscord: string;
  linkMedium: string;
  contractAddress: string;
}

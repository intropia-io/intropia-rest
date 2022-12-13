import { RestUserType } from "@prisma/client";
import prisma from "../utilities/prisma";

type Props = {
    token: string;
    type?: RestUserType
}

export const hasRights = async ({ token, type }: Props) => token ?
    await prisma.restUser.findFirst({
        where: {
            token: token,
            type: type
        }
    }).then((user) => {
        return !!user;
    }).catch((err) => {
        return false;
    }) : false;

import { RestUserType } from "@prisma/client";
import prisma from "../utilities/prisma";

type Props = {
    token: string;
    type?: RestUserType
}

export const hasRights = async ({ token, type }: Props) =>
    await prisma.restUser.findFirst({
        where: {
            token,
            type
        }
    }).then((user) => {
        return !!user;
    }).catch((err) => {
        return false;
    });

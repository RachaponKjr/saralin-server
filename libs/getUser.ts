import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
export const GetUser = async (email: string) => {
    const rows = await db.users.findFirst({
        where: {
            email: email
        }
    })
    if(rows){
        return {
            status:200,
            massage:"User Found",
            data:rows
        };
    }
    return {
        status:400,
        massage:"User Not Found"
    };
};
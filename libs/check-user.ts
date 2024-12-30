import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
export const CheckUser = (user_id: string): Promise<any> => {
   const res = db.users.findUnique({
       where: {
           user_id: user_id
       },
       select: {
           user_id: true,
           carts: true
       }
   })
   return res
};
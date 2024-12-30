import { PrismaClient } from "@prisma/client";
import Elysia, { t } from "elysia";

export const checkEmail = new Elysia().decorate("db", new PrismaClient()).post(
  "/check-email",
  async function* ({ body, set, db }) {
    const { email } = body;

    // ทำให้ email เป็นตัวพิมพ์เล็ก
    const normalizedEmail = email.toLowerCase();

    // ค้นหาผู้ใช้โดยแปลงอีเมลเป็นตัวพิมพ์เล็ก
    const res = await db.users.findFirst({
      where: {
        email: {
          equals: normalizedEmail, // ตรวจสอบในฐานข้อมูลเป็นตัวพิมพ์เล็ก
        },
      },
    });
   
    if(res){
      set.status = 200;
      return {
        status: 200,
        message: "ไม่สามารถใช้อีเมลนี้ได้",
        type: 1,
        data: res,
      };
    }
    else{
      set.status = 200;
      return {
        status: 404,
        message: "สามารถใช้อีเมลนี้ได้",
        type:2,
        data: res,
      };
    }
  },
  {
    body: t.Object({
      email: t.String(),
    }),
  }
);

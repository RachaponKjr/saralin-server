import { history } from "./../../node_modules/.prisma/client/index.d";
import { PrismaClient } from "@prisma/client";
import Elysia, { t } from "elysia";

export const register = new Elysia().decorate("db", new PrismaClient()).post(
  "/register",
  async ({ body, set, error, db }) => {
    const { username, password, email } = body;

    try {
      // ตรวจสอบข้อมูลที่จำเป็น
      if (!username || !password || !email) {
        return {
          status: 400,
          message: "กรุณากรอกข้อมูลให้ครบ",
        };
      }

      const existingEmail = await db.users.findFirst({
        where: {
          email: email,
        },
      });

      const existingUsername = await db.users.findFirst({
        where: {
          username: username,
        },
      });

      if (existingUsername || existingEmail) {
        return {
          status: 400,
          message: "อีเมลหรือชื่อผู้ใช้ถูกใช้ไปแล้ว",
        };
      }
      // แฮชรหัสผ่าน
      const hashpassword = await Bun.password.hash(password, {
        algorithm: "bcrypt",
        cost: 4,
      });

      // เพิ่มข้อมูลผู้ใช้ใหม่ลงในฐานข้อมูล
      const res = await db.users.create({
        data: {
          username: username,
          password: hashpassword,
          email: email,
          carts: {
            create: [{}],
          },
          histories: {
            create: [{}],
          },
        },
        include: {
          carts: true,
          histories: true,
        },
      });
      // ส่งผลลัพธ์สำเร็จ
      set.status = 201;
      return {
        message: "ลงทะเบียนสำเร็จ",
        status: 201,
        data: res,
      };
    } catch (err: any) {
      // จัดการข้อผิดพลาดที่เกิดขึ้น
      return {
        status: 400,
        message: "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง",
      };
    }
  },
  {
    body: t.Object({
      username: t.String(),
      password: t.String(),
      email: t.String(),
    }),
  }
);

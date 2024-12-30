import { PrismaClient } from "@prisma/client";
import { Elysia, t } from "elysia";
import Bun from "bun";

// ตั้งค่า Prisma Client
const db = new PrismaClient();

const generateUniqueUsername = (): string => {
  const timestamp = Date.now().toString().slice(-6);
  const randomPart = Math.floor(Math.random() * 100); 
  return `@SRL-${timestamp}${randomPart}`;
};

export const register = new Elysia().decorate("db", db).post(
  "/register",
  async ({ body, set, error, db }) => {
    const {
      password,
      email,
      first_name,
      last_name,
      phone_number,
      gender,
      date_of_birth,
    } = body;

    try {
      // ตรวจสอบข้อมูลที่จำเป็น
      if (!password || !email || !first_name || !last_name || !phone_number || !gender || !date_of_birth ) {
        return {
          status: 400,
          message: "กรุณากรอกข้อมูลให้ครบ",
        };
      }

      // สร้าง username ที่ไม่ซ้ำกัน
      const username = generateUniqueUsername();

      // ตรวจสอบว่าอีเมลมีการใช้แล้วในฐานข้อมูล
      const existingEmail = await db.users.findFirst({
        where: {
          email: email.toLowerCase(),
        },
      });

      if (existingEmail) {
        return {
          status: 400,
          message: "อีเมลนี้ถูกใช้ไปแล้ว",
        };
      }

      // แฮชรหัสผ่าน
      const hashpassword = await Bun.password.hash(password, {
        algorithm: "bcrypt",
        cost: 4,
      });

      // เปลี่ยนอีเมลให้เป็นตัวพิมพ์เล็ก
      const lowercaseEmail = email.toLowerCase();

      // เพิ่มข้อมูลผู้ใช้ใหม่ลงในฐานข้อมูล
      const res = await db.users.create({
        data: {
          username: username, // ใช้ username ที่สร้างขึ้น
          password: hashpassword,
          email: lowercaseEmail,
          carts: {
            create: [{}],
          },
          histories: {
            create: [{}],
          },
          user_info: {
            create: {
              first_name: first_name,
              last_name: last_name,
              phone_number: phone_number || null,
              avatar_image: null,
              date_of_birth: date_of_birth,
              gender: gender,
              role: "user",
            },
          },
        },
        include: {
          carts: true,
          histories: true,
          user_info: true,
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
        err: err,
        message: "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง",
      };
    }
  },
  {
    body: t.Object({
      password: t.String(),
      email: t.String(),
      first_name: t.String(),
      last_name: t.String(),
      phone_number: t.String(),
      gender: t.String(),
      date_of_birth: t.String(),
    }),
  }
);

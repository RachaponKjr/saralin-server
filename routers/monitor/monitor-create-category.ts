import Elysia, { t } from "elysia";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCategory = new Elysia().post(
  "/create-category",
  async ({ body, set, error }) => {
    try {
      // รับข้อมูลจาก body
      const { name, description } = body;

      // ตรวจสอบว่าข้อมูลสำคัญมีครบหรือไม่
      if (!name) {
        return error(400, "ชื่อหมวดหมู่ไม่สามารถเว้นว่างได้");
      }

      // สร้างหมวดหมู่ใหม่ในฐานข้อมูล
      const category = await prisma.category.create({
        data: {
          name,
          description: description || null,
        },
      });

      // ส่งผลลัพธ์กลับ
      set.status = 200;
      return {
        status: 200,
        message: "สร้างหมวดหมู่สำเร็จ",
        category,
      };
    } catch (err) {
      console.error(err);
      return error(400, "เกิดข้อผิดพลาดในการสร้างหมวดหมู่");
    }
  },
  {
    body: t.Object({
      name: t.String(),
      description: t.Optional(t.String()),
    }),
  }
);

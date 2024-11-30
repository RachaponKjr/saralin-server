import { PrismaClient } from "@prisma/client";
import Elysia from "elysia";

export const getProduct = new Elysia()
  .decorate("db", new PrismaClient())
  .get("/get-produce", async ({ set, error, db }) => {
    try {
      const res = await db.product.findMany({
        include: {
          product_info: {
            include: {
              product_images: true,
            },
          },
        },
      });
      set.status = 200;
      return {
        status: 200,
        message: "ดึงข้อมูลสําเร็จ",
        data: res,
      };
    } catch (err) {
      return error(400, "เกิดข้อผิดพลาดในการดึงข้อมูล");
    }
  });

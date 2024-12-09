import { PrismaClient } from "@prisma/client";
import Elysia from "elysia";

export const getProductByCategory = new Elysia()
  .decorate("db", new PrismaClient())
  .get("/get-product-by-category", async ({ query, set, error, db }) => {
    try {
      const { category } = query;

      if (!category) {
        return error(400, {
          status: 400,
          message: "กรุณาใส่ชื่อหมวดหมู่",
        });
      }

      const products = await db.product.findMany({
        where: {
          category: {
            name: category,
          },
        },
        include: {
          category: true,
          product_info: true,
        },
      });

      set.status = 200;
      return {
        status: 200,
        message: "ดึงข้อมูลสำเร็จ",
        data: products,
      };
    } catch (err) {
      console.error(err);
      error(500, {
        status: 500,
        message: "เกิดข้อผิดพลาดในการดึงข้อมูล",
      });
    }
  });

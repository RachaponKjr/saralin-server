import { PrismaClient } from "@prisma/client";
import Elysia, { t } from "elysia";

export const addItemToHistory = new Elysia()
  .decorate("db", new PrismaClient())
  .post(
    "/add-item-to-history",
    async ({ body, db }) => {
      const { product_id, user_id } = body;

      // ตรวจสอบว่าผู้ใช้มีประวัติอยู่แล้วหรือไม่
      const existingHistory = await db.history.findFirst({
        where: {
          user_id: user_id,
        },
      });

      if (existingHistory) {
        // ถ้ามีประวัติแล้ว ให้เพิ่มสินค้าลงใน history_product
        const res = await db.history_product.create({
          data: {
            history_id: existingHistory.id,
            product_id: product_id,
          },
        });
        return res;
      } else {
        // ถ้าไม่มีประวัติ ให้สร้าง history ใหม่
        const res = await db.history.create({
          data: {
            user_id: user_id,
            history_product: {
              create: {
                product_id: product_id,
              },
            },
          },
        });
        return res;
      }
    },
    {
      body: t.Object({
        product_id: t.Number(),
        user_id: t.String(),
      }),
    }
  );

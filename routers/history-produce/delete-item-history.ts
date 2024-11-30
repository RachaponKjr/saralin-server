import { PrismaClient } from "@prisma/client";
import Elysia, { t } from "elysia";

export const deleteItemInHistory = new Elysia()
  .decorate("db", new PrismaClient())
  .delete(
    "/delete-item-in-history",
    async ({ body, set, db, error }) => {
      try {
        const { history_product_id } = body;
        await db.history_product.delete({
          where: {
            id: history_product_id,
          },
        });
        set.status = 200;
        return {
          status: 200,
          message: "ลบข้อมูลสําเร็จ",
        };
      } catch (err) {
        return error(400, "เกิดข้อผิดพลาดในการดึงข้อมูล");
      }
    },
    {
      body: t.Object({
        history_product_id: t.Number(),
      }),
    }
  );

import { PrismaClient } from "@prisma/client";
import Elysia, { t } from "elysia";

export const delProduct = new Elysia()
  .decorate("db", new PrismaClient())
  .delete(
    "/delete-produce",
    async ({ body, db, set, error }) => {
      try {
        const { product_id } = body;
        const res = await db.product.delete({
          where: {
            product_id: product_id,
          },
        });
        set.status = 200;
        return {
          status: 200,
          message: "ลบข้อมูลสําเร็จ",
          data: res,
        };
      } catch (err) {
        return error(400, "เกิดข้อผิดพลาดในการดึงข้อมูล");
      }
    },
    {
      body: t.Object({
        product_id: t.Number(),
      }),
    }
  );

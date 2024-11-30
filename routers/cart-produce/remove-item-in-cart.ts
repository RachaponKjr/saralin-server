import { PrismaClient } from "@prisma/client";
import Elysia, { t } from "elysia";

export const deleteItemInCart = new Elysia()
  .decorate("db", new PrismaClient())
  .delete(
    "/delete-item-in-cart",
    async ({ body, set, db, error }) => {
      try {
        const { cart_item_id } = body;
        const res = await db.cart_items.delete({
          where: {
            cart_item_id: cart_item_id,
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
        cart_item_id: t.Number(),
      }),
    }
  );

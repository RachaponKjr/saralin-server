import { PrismaClient } from "@prisma/client";
import Elysia, { t } from "elysia";

export const addToCart = new Elysia().decorate("db", new PrismaClient()).post(
  "/add-to-cart",
  async ({ body, set, error, db }) => {
    try {
      const { user_id, product_id } = body;
      //   ดึงเอา cart_id ออกมาใช้
      const cartId = await db.users.findUnique({
        where: {
          user_id: user_id,
        },
        select: {
          carts: true,
        },
      });

      const cart_id = cartId?.carts[0].cart_id;

      const setItemToCart = await db.cart_items.create({
        data: {
          cart_id: cart_id as number,
          product_id: product_id,
        },
      });

      set.status = 200;

      return {
        status: 200,
        message: "เพิ่มข้อมูลสําเร็จ",
        data: setItemToCart,
      };
    } catch (err) {
      return error(400, "เกิดข้อผิดพลาดในการดึงข้อมูล");
    }
  },
  {
    body: t.Object({
      user_id: t.String(),
      product_id: t.Number(),
    }),
  }
);

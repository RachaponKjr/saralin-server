import { PrismaClient } from "@prisma/client";
import Elysia, { t } from "elysia";

export const getItemCart = new Elysia().decorate("db", new PrismaClient()).post(
  "/get-item-cart",
  async ({ set, error, db, body }) => {
    try {
      const { user_id } = body;
      const res = await db.carts.findMany({
        where: {
          user_id: user_id,
        },
        select: {
          cart_items: {
            select: {
              product: {
                include: {
                  product_info: {
                    select: {
                      product_images: true,
                      price: true,
                      discounted_price: true,
                    },
                  },
                },
              },
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
  },
  {
    body: t.Object({
      user_id: t.String(),
    }),
  }
);

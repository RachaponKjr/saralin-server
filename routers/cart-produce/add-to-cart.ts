import { PrismaClient } from "@prisma/client";
import Elysia, { t } from "elysia";
import { CheckUser } from "../../libs/check-user";

export const addToCart = new Elysia()
  .decorate("db", new PrismaClient())
  .post(
    "/add-to-cart",
    async ({ body, set, error, db }) => {
      try {
        const { user_id, product_id } = body;

        // ตรวจสอบว่า user มี cart อยู่หรือไม่
        const userCart = await CheckUser(user_id).then((res) => {
          return db.carts.findUnique({
            where: {
              cart_id: res.carts[0].cart_id,
            },
            include: {
              cart_items: true,
            },
          });
        }).catch((err) => {
          console.log(err);
          return null;
        });

        if (!userCart) {
          return {
            status: 400,
            message: "ไม่พบผู้ใช้",
          }
        }

        // เช็คว่า product_id นี้มีใน cart_items ของผู้ใช้หรือยัง
        const existingItem = userCart.cart_items.some(
          (item) => item.product_id === product_id
        );

        if (existingItem) {
          // หากมีสินค้านี้อยู่แล้วใน cart
          return {
            status: 400,
            message: "สินค้านี้มีในตะกร้าแล้ว",
          };
        }

        // ดึง cart_id
        const cart_id = userCart.cart_id;

        // เพิ่มสินค้าใหม่เข้าไปใน cart_items
        const setItemToCart = await db.cart_items.create({
          data: {
            cart_id: cart_id,
            product_id: product_id,
          },
        });

        // ส่ง response ว่าสำเร็จ
        set.status = 200;
        return {
          status: 200,
          message: "เพิ่มสินค้าสำเร็จ",
          data: setItemToCart,
        };
      } catch (err) {
        console.error(err);
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

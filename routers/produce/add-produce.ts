import Elysia from "elysia";
import { TypeProductModel } from "../../models/produce/produce-model";
import { PrismaClient } from "@prisma/client";

export const addProduct = new Elysia()
  .decorate("db", new PrismaClient())
  .model("product.body", TypeProductModel)
  .post(
    "/add-product",
    async ({ body, db, set, error }) => {
      try {
        const { name, description, base_price, status, is_featured } = body;
        await db.product
          .create({
            data: {
              name,
              description,
              base_price,
              status: status || ("AVAILABLE" as any),
              is_featured,
            },
          })
          .then((res) => {
            set.status = 200;
            return {
              status: 200,
              message: "เพิ่มข้อมูลสําเร็จ",
              data: res,
            };
          })
          .catch((err) => {
            set.status = 400;
            return {
              status: 400,
              message: "เกิดข้อผิดพลาดในการเพิ่มข้อมูล",
              data: err,
            };
          });
      } catch (err) {
        error(400, "เกิดข้อผิดพลาดในการดึงข้อมูล");
      }
    },
    {
      body: "product.body",
    }
  );

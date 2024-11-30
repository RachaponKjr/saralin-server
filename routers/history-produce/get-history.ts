import { PrismaClient } from "@prisma/client";
import Elysia, { t } from "elysia";
import { product } from "../produce/plugin";

export const getHistory = new Elysia().decorate("db", new PrismaClient()).post(
  "/get-history",
  async ({ body, set, error, db }) => {
    const { user_id } = body;
    try {
      const res = await db.history.findFirst({
        where: {
          user_id: user_id,
        },
        include: {
          history_product: true,
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

import { PrismaClient } from "@prisma/client";
import Elysia, { t } from "elysia";
import { location } from "./plugin";

export const getLocation = new Elysia().decorate("db", new PrismaClient()).post(
  "/get-location",
  async ({ body, set, error, db }) => {
    try {
      const { user_id } = body;
      if (!user_id) {
        return error(400, {
          message: "กรุณากรอก user_id !",
        });
      }
      const locationFound = await db.locations.findMany({
        where: {
          user_id: user_id,
        },
      });
      // const [res] = await db.query("SELECT * FROM location WHERE user_id = ?", [
      //   user_id,
      // ]);
      set.status = 200;
      return {
        status: 200,
        message: "ดึงข้อมูลสําเร็จ",
        data: locationFound,
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

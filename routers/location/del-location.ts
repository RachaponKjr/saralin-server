import { PrismaClient } from "@prisma/client";
import Elysia, { t } from "elysia";

export const deleteLocation = new Elysia()
  .decorate("db", new PrismaClient())
  .delete(
    "/delete-location",
    async ({ body, set, error, db }) => {
      try {
        const { location_id } = body;
        const del = await db.locations.delete({
          where: {
            location_id: location_id,
          },
        });
        set.status = 200;
        return {
          status: 200,
          message: "ลบข้อมูลสําเร็จ",
          data: del,
        };
      } catch (err) {
        return error(400, "เกิดข้อผิดพลาดในการดึงข้อมูล");
      }
    },
    {
      body: t.Object({
        location_id: t.Number(),
      }),
    }
  );

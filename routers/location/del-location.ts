import Elysia, { t } from "elysia";
import db from "../../db/dbConnect";

export const deleteLocation = new Elysia().delete(
  "/delete-location",
  async ({ body, set, error }) => {
    try {
      const { location_id } = body;
      const [res] = await db.query(
        "DELETE FROM location WHERE location_id = ?",
        [location_id]
      );
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
      location_id: t.Number(),
    }),
  }
);

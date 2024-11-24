import Elysia from "elysia";
import db from "../../db/dbConnect";

export const getLocation = new Elysia().post(
  "/get-location",
  async ({ body, set, error }: { body: any; set: any; error: any }) => {
    try {
      const { user_id } = body;
      if (user_id.value || user_id.value === "") {
        return error(400, {
          message: "กรุณากรอก user_id !",
        });
      }
      const [res] = await db.query("SELECT * FROM location WHERE user_id = ?", [
        user_id,
      ]);
      set.status = 200;
      return {
        status: 200,
        message: "ดึงข้อมูลสําเร็จ",
        data: res,
      }
    } catch (err) {
      return error(400, "เกิดข้อผิดพลาดในการดึงข้อมูล");
    }
  }
);

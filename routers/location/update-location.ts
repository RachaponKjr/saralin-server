import Elysia from "elysia";
import { BodyReqUpdateLocation } from "./setup";
import db from "../../db/dbConnect";

export const updateLocation = new Elysia().use(BodyReqUpdateLocation).put(
  "/update-location",
  async ({ body, set, error }) => {
    try {
      const { location_id,location } = body;
      const [res] = await db.query(
        "UPDATE location SET ? WHERE location_id = ?",
        [location, location_id]
      );
      set.status = 200;
      return {
        status: 200,
        message: "อัปเดตข้อมูลสําเร็จ",
        data: res,
      };
    } catch (err) {
        console.log(err);
      return error(400, "เกิดข้อผิดพลาดในการดึงข้อมูล");
    }
  },
  {
    body: "updateLocation.body",
  }
);

import Elysia from "elysia";
import { BodyReqLocation } from "./setup";
import { GetLocation } from "./utils/getLocation";
import { SetLocation } from "./utils/setLocation";

export const setLocation = new Elysia().use(BodyReqLocation).post(
  "/set-location",
  async ({body,set}) => {
    const { user_id } = body;
    const locationFound = await GetLocation({ user_id });

    if (locationFound.length > 8) {
        set.status = 400;
        return {
            status: 400,
            message: "คุณไม่สามารถเพิ่มที่อยู่ได้มากกว่า 1",
        }
    }
    const setLocation = await SetLocation({ body });
    if (setLocation.status === 200) {
        set.status = 200;
        return {
            status: 200,
            message: "เพิ่มที่อยู่สําเร็จ",
        }
    }
  },
  {
    body: "location.body",
  }
);

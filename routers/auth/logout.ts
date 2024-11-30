import Elysia, { t } from "elysia";
import StatusUser from "../../libs/update-status";
import { AuthService } from "../../middleware/auth-service";

export const logout = new Elysia().use(AuthService).post(
  "/logout",
  async ({ body, set, error, cookie: { access_token } }) => {
    try {
      const userStatus = new StatusUser(body.email);
      await userStatus.logout();
      access_token.remove();
      set.status = 200;
      return {
        status: 200,
        message: "Logout Success",
      };
    } catch (err) {
      return error(400, "เกิดข้อผิดพลาดในการดึงข้อมูล");
    }
  },
  {
    body: t.Object({
      email: t.String(),
    }),
    isAuth: true,
  }
);

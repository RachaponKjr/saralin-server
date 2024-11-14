import Elysia from "elysia";
import { GetUser } from "../../libs/getUser";
import StatusUser from "../../libs/update-status";
import { acceptToken } from "./setup";

export const login = new Elysia().use(acceptToken).post(
  "/login",
  async ({
    body,
    set,
    acceptToken,
  }: {
    body: { email: string; password: string };
    set: any;
    acceptToken: any;
  }) => {
    try {
      const { data } = await GetUser(body.email);
      const user = data[0];
      if (user) {
        const verifyPassword = await Bun.password.verify(
          body.password,
          user.password
        );
        if (verifyPassword) {
          const userStatus = new StatusUser(body.email);
          await userStatus.login();

          // สร้าง token และเซ็ตคุกกี้
          const token = await acceptToken.sign({
            id: user.user_id,
          });

          set.status = 200;
          return { status: 200, message: "Login Success", data: { accessToken: token } };
        }
        set.status = 400;
        return { status: 400, message: "Login Fail" };
      }
      set.status = 400;
      return { status: 400, message: "Not Found" };
    } catch (error) {
      console.log(error);
      set.status = 500;
      return { status: 500, message: "Internal Server Error" };
    }
  }
);

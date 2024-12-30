import Elysia from "elysia";
import { GetUser } from "../../libs/getUser";
import StatusUser from "../../libs/update-status";
import { acceptToken } from "./setup";
import { TypeAuthModel } from "../../models/auth/auth-model";

const AuthModel = new Elysia().model({
  "auth.body": TypeAuthModel,
});

export const login = new Elysia()
  .use(AuthModel)
  .use(acceptToken)
  .post(
    "/login",
    async ({ body, set, acceptToken, cookie: { access_token } }) => {
      try {
        const res = await GetUser(body.email);
        const user = res.data as any;

        if (!user) {
          set.status = 404;
          return { status: 404, message: "อีเมลไม่ถูกต้อง" };
        }

        const verifyPassword = await Bun.password.verify(
          body.password,
          user.password
        );
        if (!verifyPassword) {
          set.status = 404;
          return { status: 404, message: "รหัสผ่านไม่ถูกต้อง" };
        }

        const userStatus = new StatusUser(body.email);
        await userStatus.login();

        const token = await acceptToken.sign({
          id: user.user_id,
        });

        access_token.set({
          value: token,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          path: "/",
        });

        set.status = 200;
        return {
          status: 200,
          message: "เข้าสู่ระบบสําเร็จ",
          data: { accessToken: token, user: res.data },
        };
      } catch (error) {
        set.status = 500;
        return { status: 500, message: "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง" };
      }
    },
    {
      body: "auth.body",
    }
  );

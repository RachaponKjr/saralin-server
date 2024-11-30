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

        if (!user || user.length === 0) {
          set.status = 404;
          return { status: 404, message: "User not found" };
        }

        const verifyPassword = await Bun.password.verify(
          body.password,
          user[0].password
        );
        if (!verifyPassword) {
          set.status = 400;
          return { status: 400, message: "Invalid credentials" };
        }

        const userStatus = new StatusUser(body.email);
        await userStatus.login();

        const token = await acceptToken.sign({
          id: user[0].user_id,
        });

        access_token.set({
          value: token,
          httpOnly: true,
          path: "/",
        });
     
        set.status = 200;
        return {
          status: 200,
          message: "Login Success",
          data: { accessToken: token },
        };
      } catch (error) {
        console.log(error);
        set.status = 500;
        return { status: 500, message: "Internal Server Error" };
      }
    },
    {
      body: "auth.body",
    }
  );

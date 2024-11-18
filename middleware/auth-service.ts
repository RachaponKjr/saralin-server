import Elysia from "elysia";
import { boolean } from "zod";

export const AuthService = new Elysia({ name: "auth-service" })
  .derive({ as: "scoped" }, ({ cookie: { session } }) => ({
    Auth: {
      user: session.value,
    },
  }))
  .macro(({ onBeforeHandle }) => ({
    isAuth(value: boolean) {
      onBeforeHandle(({ Auth,error }) => {
        if (!Auth?.user) return error(401, "Unauthorized");
      })
    },
  }));

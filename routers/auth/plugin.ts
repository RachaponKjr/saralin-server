import Elysia from "elysia";
import { register } from "./register";
import { login } from "./login";
import { verifyEmail } from "./verify-email";
import { test } from "./test";

export const auth = new Elysia({ prefix: "/api/v1",tags: ["Auth"] })
  .use(register)
  .use(login)
  .use(verifyEmail)
  .use(test)


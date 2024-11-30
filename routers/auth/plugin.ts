import Elysia from "elysia";
import { register } from "./register";
import { login } from "./login";
import { verifyEmail } from "./verify-email";
import { test } from "./test";
import { logout } from "./logout";

export const auth = new Elysia({ prefix: "/api/v1", tags: ["Auth"] })
  .use(register)
  .use(login)
  .use(logout)
  .use(verifyEmail)
  .use(test);

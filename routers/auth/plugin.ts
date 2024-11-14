import Elysia from "elysia";
import { register } from "./register";
import { login } from "./login";
import { verifyEmail } from "./verify-email";

export const auth = new Elysia({ prefix: "/api/v1" })
  .use(register)
  .use(login)
  .use(verifyEmail);

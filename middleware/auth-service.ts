import jwt from "@elysiajs/jwt";
import { Elysia } from "elysia";

const SECRET_KEY = process.env.JWT_SECRET!;

export const AuthService = new Elysia({ name: "auth-service" })
  .use(
    jwt({
      secret: SECRET_KEY,
      name: "jwt",
    })
  )
  .macro(({ onBeforeHandle }) => ({
    isAuth() {
      onBeforeHandle(async ({ request, error, set, jwt }) => {
        const auth = request.headers.get("Authorization");
        const authtoken = auth?.split(" ")[1];
        if (!authtoken) {
          return error(401, "Unauthorized: No token provided");
        }
        try {
          // ตรวจสอบความถูกต้องของ token และ decode payload
          const decoded = await jwt.verify(authtoken); // ตรวจสอบและ decode token
          if (!decoded) {
            return error(401, "Unauthorized: Invalid token");
          }
          set.status = 200;
        } catch (err) {
          // ถ้า token ไม่ถูกต้องหรือหมดอายุ จะเกิด error นี้
          return error(401, "Unauthorized: Invalid or expired token");
        }
      });
    },
  }));

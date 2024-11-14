import Elysia from "elysia";
import db from "../../db/dbConnect";
import StatusUser from "../../libs/update-status";

export const verifyEmail = new Elysia().get(
    "/verify-email",
    async ({ query, set, error }: { query: any; set: any; error: any }) => {
      const { email } = query;
      const [user] = await db.query("SELECT * FROM user WHERE email = ?", [email]);
      if (user.length > 0) {
        if(user[0].email_verified == 1){
            return error(400, "Email already verified");
        }
        const verify = new StatusUser(email);
        await verify.verifyEmail();
        set.status = 200;
        return {
          status: 200,
          message: "Email verified",
        };
      } else {
        return error(400, "Email not found");
      }
    }
  );
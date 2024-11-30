// import db from "../db/dbConnect";

import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

class StatusUser {
  email: string;
  user_id: string;
  constructor(email?: string, user_id?: string) {
    this.email = email!;
    this.user_id = user_id!;
  }
  login = async () => {
    try {
      await db.users.update({
        where: {
          email: this.email,
        },
        data: {
          is_active: true,
        },
      });
    } catch (error) {
      console.error("Error updating user status:", error);
      throw error;
    }
  };
  logout = async () => {
    try {
      await db.users.update({
        where: {
            email: this.email,
        },
        data: {
          is_active: false,
        },
      });
    } catch (error) {
      console.error("Error updating user status:", error);
      throw error;
    }
  };
  //   verifyEmail = async () => {
  //     try {
  //       await db.query("UPDATE user SET email_verified = ? WHERE email = ?", [
  //         1,
  //         this.email,
  //       ]);
  //     } catch (error) {
  //       console.error("Error updating user status:", error);
  //       throw error;
  //     }
  //   };
}

export default StatusUser;

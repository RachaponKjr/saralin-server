import Elysia from "elysia";
import db from "../../db/dbConnect";

export const register = new Elysia().post(
  "/register",
  async ({
    body,
    set,
    error,
  }: {
    body: { username: string; password: string; email: string };
    set: any;
    error: any;
  }) => {
    const { username, password, email } = body;

  // ตรวจสอบข้อมูลที่จำเป็น
  if (!username || !password || !email) {
    return error(400, "กรุณากรอกข้อมูลให้ครบ");
  }

  const [existingEmail] = await db.query("SELECT * FROM user WHERE email = ?", [
    email,
  ]);
  const [existingUsername] = await db.query(
    "SELECT * FROM user WHERE username = ?",
    [username]
  );

  if (existingUsername.length > 0 || existingEmail.length > 0) {
    return error(400, "อีเมลนี้ถูกใช้ไปแล้ว");
  }

  try {
    // แฮชรหัสผ่าน
    const hashpassword = await Bun.password.hash(password, {
      algorithm: "bcrypt",
      cost: 4,
    });

    // เพิ่มข้อมูลผู้ใช้ใหม่ลงในฐานข้อมูล
    await db.query(
      "INSERT INTO user (username, password, email) VALUES (?, ?, ?)",
      [username, hashpassword, email]
    );

    // ส่งผลลัพธ์สำเร็จ
    set.status = 201;
    return {
      message: "ลงทะเบียนสำเร็จ",
      status: 201,
    };
  } catch (err: any) {
    // จัดการข้อผิดพลาดที่เกิดขึ้น
    console.error("Registration Error:", err);
    return error(500, "เกิดข้อผิดพลาดในการลงทะเบียน");
  }
  }
);

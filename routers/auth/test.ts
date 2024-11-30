import Elysia from "elysia";
import * as fs from 'fs'

export const test = new Elysia().get("/yo", async function* ({ error }) {
  // เปิดไฟล์สำหรับการอ่าน
  const fileStream = fs.createReadStream('/Users/racha.k/Documents/saralin-server/test/large-file.csv', { encoding: 'utf8' });

  let numLines = 0;
  // ส่งข้อมูลทีละส่วนผ่าน yield
  for await (const chunk of fileStream) {
    numLines++;
    yield chunk, `\n number of lines: ${numLines} `;  // ส่งข้อมูลแต่ละส่วนไปยัง client (Postman)
  }

  // Optional: สามารถส่งข้อความสุดท้ายหลังจากส่งข้อมูลเสร็จได้ (เช่น EOF)
  yield `\nFinished sending file. Total lines:`;
});

import { PrismaClient } from "@prisma/client";
import Elysia, { t } from "elysia";
import { ElysiaWS } from "elysia/dist/ws";

const db = new PrismaClient();

// เก็บ WebSocket clients ทั้งหมด
const clientsMap = new Map<string, ElysiaWS<any, any>>();

export const productWS = new Elysia().ws("/realtime-product", {
  body: t.Object({
    user_id: t.String(),
    product_id: t.String(),
    type: t.String(),
  }),

  async open(ws) {
    const { user_id } = ws.data.query;

    // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
    const userConnect = await db.users.findUnique({
      where: {
        user_id: user_id,
      },
    });

    console.log("WebSocket client connected", userConnect);

    // เก็บ client ที่เชื่อมต่อ
    clientsMap.set(user_id as string, ws);

    // เชื่อมต่อไปยัง "product-updated" channel
    ws.subscribe("product-updated");

    // ส่งข้อมูลผู้ใช้ที่เชื่อมต่อมา
    ws.send(
      JSON.stringify({
        data: userConnect,
        message: "Connected to Realtime Product Service",
      })
    );
  },

  async message(ws, message) {
    // แสดงข้อมูลที่ได้รับจาก client
    console.log("Received message:", message);

    // ส่งข้อมูลกลับไปให้ client
    ws.send(
      JSON.stringify({
        message: "Message received from Realtime Product Service",
        receivedData: message,
      })
    );

    // ตัวอย่าง: การส่งข้อมูล "สินค้าถูกซื้อแล้ว" ไปยังทุกคน
    if (message.type === "purchase") {
      // เมื่อมีการซื้อสินค้า, ส่งข้อมูลไปยังทุกคน
      const productId = message.product_id; // สมมติว่า message มี productId
      const purchasedBy = message.user_id; // user_id ที่ทำการซื้อ

      // ส่งข้อมูลไปยังทุกคนที่เชื่อมต่อ
      clientsMap.forEach((client, userId) => {
        client.send(
          JSON.stringify({
            message: `Product ${productId} has been purchased by ${purchasedBy}.`,
            type: "product-updated",
          })
        );
      });
    }
  },

  close(ws) {
    console.log("WebSocket client disconnected");

    // ลบ client ออกจาก Map เมื่อปิดการเชื่อมต่อ
    clientsMap.forEach((client, userId) => {
      if (client === ws) {
        clientsMap.delete(userId);
      }
    });

    ws.unsubscribe("product-updated");
    ws.send(
      JSON.stringify({ message: "Disconnected from Realtime Product Service" })
    );
  },
});

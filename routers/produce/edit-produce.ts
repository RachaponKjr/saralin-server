import { PrismaClient } from "@prisma/client";
import Elysia, { t } from "elysia";

export const editProduct = new Elysia().decorate("db", new PrismaClient()).post(
  "/edit-produce",
  async ({ body, db, set, error }) => {
    try {
      const {
        product_id,
        name,
        price,
        discounted_price,
        description,
        category,
      } = body;

      // ตรวจสอบว่า product_id มีค่าหรือไม่
      if (!product_id) {
        return error(400, {
          message: "กรุณากรอก product_id !",
        });
      }

      // ตรวจสอบค่าฟิลด์และเตรียมข้อมูลที่จะอัพเดต
      const updateData: any = {};

      // หากมีการส่งค่า name, price, discounted_price หรือ description มาจะทำการอัพเดต
      if (name) updateData.name = name;
      if (price) updateData.price = price;
      if (discounted_price !== undefined)
        updateData.discounted_price = discounted_price;
      if (description) updateData.description = description;

      // หากมีการส่งค่า category เข้ามา จะใช้ connectOrCreate เพื่อเชื่อมโยงหรือสร้าง category
      if (category) {
        updateData.category = {
          connectOrCreate: {
            where: {
              name: category,
            },
            create: {
              name: category,
            },
          },
        };
      }

      // อัพเดตข้อมูลของ product ในฐานข้อมูล
      const product = await db.product.update({
        where: {
          product_id: product_id,
        },
        data: updateData,
      });

      set.status = 200;
      return {
        status: 200,
        message: "แก้ไขสินค้าสำเร็จ",
        data: product,
      };
    } catch (err) {
      console.error(err); // แสดงข้อผิดพลาด
      return error(400, "เกิดข้อผิดพลาดในการแก้ไขสินค้า");
    }
  },
  {
    body: t.Object({
      product_id: t.Number(),
      name: t.Optional(t.String()), // ชื่อสินค้าเป็น Optional
      price: t.Optional(t.Number()), // ราคาสินค้าเป็น Optional
      discounted_price: t.Optional(t.Number()), // ราคาส่วนลดเป็น Optional
      description: t.Optional(t.String()), // คำอธิบายสินค้าเป็น Optional
      category: t.Optional(t.String()), // หมวดหมู่สินค้าเป็น Optional
    }),
  }
);

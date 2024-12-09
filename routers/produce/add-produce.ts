import Elysia from "elysia";
import { TypeProductModel } from "../../models/produce/produce-model";
import { PrismaClient } from "@prisma/client";

export const addProduct = new Elysia()
  .decorate("db", new PrismaClient())
  .model("product.body", TypeProductModel)
  .post(
    "/add-product",
    async ({ body, db, set, error }) => {
      try {
        const {
          name,
          description,
          base_price,
          status,
          category_id,
          is_featured,
          product_info,
        } = body;

        // เพิ่มข้อมูลในฐานข้อมูล
        const res = await db.product.create({
          data: {
            name,
            description,
            base_price,
            category: {
              connect: {
                category_id: category_id, // เชื่อมโยงกับหมวดหมู่
              },
            },
            product_info: {
              create: {
                price: product_info.price,
                fabric_id: product_info.fabric_id,
                color: product_info.color,
                brand: product_info.brand,
                weight_item: product_info.weight_item,
                chest: product_info.chest,
                arm_circumference: product_info.arm_circumference,
                forearm_length: product_info.forearm_length,
                shoulder_width: product_info.shoulder_width,
                neck_width: product_info.neck_width,
                sleeve_length: product_info.sleeve_length,
                product_images: {
                  create: product_info.product_image.map(
                    (image: { image_url: string; alt_text: string }) => ({
                      image_url: image.image_url,
                      alt_text: image.alt_text || null,
                    })
                  ),
                },
              },
            },
            status: status || ("AVAILABLE" as any),
            is_featured: is_featured || false,
          },
          include: {
            category: true,
            product_info: true,
          },
        });

        // ตอบกลับด้วยข้อมูลสินค้าใหม่ที่ถูกเพิ่ม
        set.status = 200;
        return {
          status: 200,
          message: "เพิ่มข้อมูลสำเร็จ",
          data: res, // ส่งกลับข้อมูลสินค้าที่ถูกเพิ่ม
        };
      } catch (err) {
        console.error(err); // แสดงข้อผิดพลาดใน server
        return error(400, "เกิดข้อผิดพลาดในการดึงข้อมูล");
      }
    },
    {
      body: "product.body", // ใช้ model "product.body" จากที่คุณกำหนด
    }
  );

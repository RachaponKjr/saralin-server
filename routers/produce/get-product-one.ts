import { PrismaClient } from "@prisma/client";
import Elysia from "elysia";

export const getProductById = new Elysia()
  .decorate("db", new PrismaClient())
  .get("/get-product/:product_id", async ({ params, set, error, db }) => {
    try {
      const { product_id } = params;

      const product = await db.product.findUnique({
        where: { product_id: parseInt(product_id) },
        include: {
          category: true,
          product_info: {
            include: {
              product_images: true,
            },
          },
        },
      });

      if (!product) {
        return error(404, "Product not found");
      }

      return {
        status: 200,
        message: "Product found",
        data: product,
      };
    } catch (err) {
      return error(500, "Something went wrong");
    }
  });

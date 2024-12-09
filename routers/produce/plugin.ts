import Elysia from "elysia";
import { addProduct } from "./add-produce";
import { delProduct } from "./del-produce";
import { getProducts } from "./get-produce";
import { getProductById } from "./get-product-one";
import { getProductByCategory } from "./get-produce-category";

export const product = new Elysia({ prefix: "/api/v1", tags: ["Product"] })
  .use(addProduct)
  .use(delProduct)
  .use(getProducts)
  .use(getProductById)
  .use(getProductByCategory);

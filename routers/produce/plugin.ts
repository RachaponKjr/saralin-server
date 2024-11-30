import Elysia from "elysia";
import { addProduct } from "./add-produce";
import { delProduct } from "./del-produce";
import { getProduct } from "./get-produce";

export const product = new Elysia({ prefix: "/api/v1", tags: ["Product"] })
  .use(addProduct)
  .use(delProduct)
  .use(getProduct);

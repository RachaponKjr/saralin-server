import Elysia from "elysia";
import { addToCart } from "./add-to-cart";
import { deleteItemInCart } from "./remove-item-in-cart";
import { getItemCart } from "./get-item-cart";

export const cart = new Elysia({ prefix: "/api/v1", tags: ["Cart"] })
  .use(addToCart)
  .use(deleteItemInCart)
  .use(getItemCart)

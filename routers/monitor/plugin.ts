import Elysia from "elysia";
import { createCategory } from "./monitor-create-category";

export const monitor = new Elysia({ prefix: "/api/v1", tags: ["Monitor"] }).use(
  createCategory
);

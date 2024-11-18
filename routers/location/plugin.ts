import Elysia from "elysia";
import { getLocation } from "./get-location";

export const location = new Elysia({ prefix: "/api/v1", tags: ["Location"] }).use(getLocation)
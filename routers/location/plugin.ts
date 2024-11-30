import Elysia from "elysia";
import { getLocation } from "./get-location";
import { setLocation } from "./set-location";
import { updateLocation } from "./update-location";
import { deleteLocation } from "./del-location";

export const location = new Elysia({ prefix: "/api/v1", tags: ["Location"] })
  .use(getLocation)
  .use(setLocation)
  .use(updateLocation)
  .use(deleteLocation);

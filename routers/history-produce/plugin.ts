import Elysia from "elysia";
import { addItemToHistory } from "./add-item-to-history";
import { getHistory } from "./get-history";
import { deleteItemInHistory } from "./delete-item-history";

export const history = new Elysia({ prefix: "/api/v1", tags: ["History"] })
  .use(addItemToHistory)
  .use(getHistory)
  .use(deleteItemInHistory);

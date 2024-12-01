import cors from "@elysiajs/cors";
import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import dotenv from "dotenv";
import { auth } from "../routers/auth/plugin";
import { location } from "../routers/location/plugin";
import { product } from "../routers/produce/plugin";
import { cart } from "../routers/cart-produce/plugin";
import { history } from "../routers/history-produce/plugin";

dotenv.config();
const app = new Elysia()
  .use(auth)
  .use(location) 
  .use(product)
  .use(cart)
  .use(history);

// cors
app.use(cors());
// swagger plugin
app.use(swagger());

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

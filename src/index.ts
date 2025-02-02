import cors from "@elysiajs/cors";
import { Elysia, t } from "elysia";
import swagger from "@elysiajs/swagger";
import dotenv from "dotenv";
import { auth } from "../routers/auth/plugin";
import { location } from "../routers/location/plugin";
import { product } from "../routers/produce/plugin";
import { cart } from "../routers/cart-produce/plugin";
import { history } from "../routers/history-produce/plugin";
import { monitor } from "../routers/monitor/plugin";
import { adaptMiddleware } from "../utils/adaptMiddleware";
import { helmet } from "elysia-helmet";
import { treaty } from "@elysiajs/eden";
import { productWS } from "../ws/product-socket";

dotenv.config();

const app = new Elysia()
  .use(auth)
  .use(location)
  .use(product)
  .use(cart)
  .use(history)
  .use(monitor)
  .use(productWS);

// socket
// productSocket(app);

// helmet
// app.use(helmet());

// cookie perser

// cors
app.use(
  cors({
    origin: "*",
  })
);
// swagger plugin
app.use(swagger());

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port} Layer:${
    process.env.NODE_ENV === "production" ? "Production" : "Development"
  }`
);

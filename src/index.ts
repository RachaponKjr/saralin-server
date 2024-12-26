import cors from "@elysiajs/cors";
import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import dotenv from "dotenv";
import { auth } from "../routers/auth/plugin";
import { location } from "../routers/location/plugin";
import { adaptMiddleware } from "../utils/adaptMiddleware";
import { helmet } from "elysia-helmet";

const app = new Elysia().use(auth).use(location);
dotenv.config();

// helmet
app.use(helmet());

// cors
app.use(cors());
// swagger plugin
app.use(swagger());

app.listen(3010);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

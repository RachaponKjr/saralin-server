import cors from "@elysiajs/cors";
import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import dotenv from "dotenv";
import { auth } from "../routers/auth/plugin";

const app = new Elysia().use(auth);
dotenv.config();
// cors
app.use(cors());
// swagger plugin
app.use(swagger());

app.listen(3010);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

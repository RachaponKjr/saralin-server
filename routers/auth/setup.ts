import jwt from "@elysiajs/jwt";
import Elysia, { t } from "elysia";

export const acceptToken = new Elysia({
    name: "acceptToken",
}).use(jwt({
    secret: process.env.JWT_SECRET!,
    schema: t.Object({
        id: t.String(),
    }),
    name: "acceptToken",
    exp: "1d"
}))
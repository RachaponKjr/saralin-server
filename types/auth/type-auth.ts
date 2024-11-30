import { t } from "elysia";

const TypeAuthBody = t.Object({
    email: t.String(),
    password: t.String(),
});
export default TypeAuthBody
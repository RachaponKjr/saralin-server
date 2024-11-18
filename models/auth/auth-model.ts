import { t } from "elysia";

export const TypeAuthModel = t.Object({
    email: t.String(
        {
            format: "email",
            description:"Email must be a valid email address"
        }
    ),
    password: t.String(
        {
            minLength: 8,
            description:"Password must be at least 8 characters long"
        }
    ),
});

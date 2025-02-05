import Elysia from "elysia";
import { BodyReqLocation } from "./setup";
import { PrismaClient } from "@prisma/client";

export const setLocation = new Elysia()
  .decorate("db", new PrismaClient())
  .use(BodyReqLocation)
  .post(
    "/set-location",
    async ({ body, set, db }) => {
      const {
        user_id,
        address_line1,
        address_line2,
        city,
        district,
        postal_code,
        latitude,
        longitude,
        is_default,
      } = body;
      const locationFound = await db.users.findUnique({
        where: {
          user_id: user_id,
        },
        include: {
          locations: true,
        },
      });

      if (locationFound?.locations.length === 4) {
        set.status = 400;
        return {
          status: 400,
          message: "คุณไม่สามารถเพิ่มที่อยู่ได้มากกว่า 4",
        };
      }

      const createlocation = await db.locations.create({
        data: {
          user_id: user_id,
          address_line1: address_line1,
          district: district,
          city: city,
          postal_code: postal_code,
          ...(address_line2 && { address_line2 }),
          ...(latitude && { latitude }),
          ...(longitude && { longitude }),
          is_default: is_default ?? false,
        },
      });
      set.status = 200;
      return {
        status: 200,
        message: "เพิ่มที่อยู่สําเร็จ",
        data: createlocation,
      };
    },
    {
      body: "location.body",
    }
  );

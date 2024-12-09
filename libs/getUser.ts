import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
export const GetUser = async (email: string) => {
  const rows = await db.users.findFirst({
    where: {
      email: email,
    },
    select: {
      user_id: true,
      username: true,
      email: true,
      password: true,
      user_info: {
        select: {
          avatar_image: true,
          date_of_birth: true,
          first_name: true,
          gender: true,
          last_name: true,
          phone_number: true,
          role: true,
        },
      },
      locations: {
        where: {
          is_default: true,
        },
        select: {
          location_id: true,
          address_line1: true,
          address_line2: true,
          district: true,
          city: true,
          postal_code: true,
          latitude: true,
          longitude: true,
          is_default: true,
        },
      },
    },
  });
  if (rows) {
    return {
      status: 200,
      massage: "User Found",
      data: rows,
    };
  }
  return {
    status: 400,
    massage: "User Not Found",
  };
};

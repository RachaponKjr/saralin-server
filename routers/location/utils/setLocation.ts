import db from "../../../db/dbConnect";
import { Location } from "../../../types/location/location-type";

export const SetLocation = async ({ body }: { body: Location }) => {
  const { user_id, location } = body;
  const [rows]: any = await db.query(
    "INSERT INTO location (user_id, address, subdistrict, district, state, postal_code, country, lat, lng) VALUES (?,?,?,?,?,?,?,?,?)",
    [
      user_id,
      location.address,
      location.subdistrict,
      location.district,
      location.state,
      location.postal_code,
      location.country,
      location.latitude,
      location.longitude,
    ]
  );
  
  return {
    status: 200,
    message: "เพิ่มที่อยู่สําเร็จ",
    data: rows,
  };
};

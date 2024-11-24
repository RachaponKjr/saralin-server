import db from "../../../db/dbConnect";

export const GetLocation = async ({ user_id }: { user_id: string }) => {
  const [rows] : any = await db.query("SELECT * FROM location WHERE user_id = ?", [
    user_id,
  ]);
  return rows;
};

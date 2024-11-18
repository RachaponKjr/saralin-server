import db from "../db/dbConnect";

export const GetUser = async (email: string) => {
    const [rows] = await db.query("SELECT * FROM user WHERE email = ?", [email]);
    if(rows){
        return {
            status:200,
            massage:"User Found",
            data:rows
        };
    }
    return {
        status:400,
        massage:"User Not Found"
    };
};
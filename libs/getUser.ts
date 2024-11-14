import db from "../db/dbConnect";

export const GetUser = async (email: string) => {
    const user = await db.query("SELECT * FROM user WHERE email = ?", [email]);
    if(user[0].length > 0){
        return {
            status:200,
            massage:"User Found",
            data:user[0]
        };
    }
    return {
        status:400,
        massage:"User Not Found"
    };
};
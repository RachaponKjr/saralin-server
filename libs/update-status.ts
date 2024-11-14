import db from "../db/dbConnect";

class StatusUser {
    email: string;
    constructor(email: string) {
        this.email = email
    }
    login = async () => {
        try {
            await db.query(
                "UPDATE user SET is_active = ? WHERE email = ?",
                [1, this.email]
            );
        } catch (error) {
            console.error("Error updating user status:", error);
            throw error;
        }
    }
    logout = async () => {
        try {
            await db.query(
                "UPDATE user SET is_active = ? WHERE email = ?",
                [0, this.email]
            );
        } catch (error) {
            console.error("Error updating user status:", error);
            throw error;
        }
    }
    verifyEmail = async () => {
        try {
            await db.query(
                "UPDATE user SET email_verified = ? WHERE email = ?",
                [1, this.email]
            );
        } catch (error) {
            console.error("Error updating user status:", error);
            throw error;
        }
    }
}

export default StatusUser
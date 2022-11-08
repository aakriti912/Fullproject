import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
    let message = {
        status: false,
        message: "Database connection failed",
        error: null
    }
    try {
       return  await mongoose.connect(process.env.MONGO_DB_URL).then(() => {
            return message = {
                status: true,
                message: "Database connection successful"
            }
        }).catch((err) => {
            return message = {
                status: false,
                message: "Database connection failed",
                error: err
            }
        });
    } catch (error) {
        console.log(error);
    }

}
export default connectDB;


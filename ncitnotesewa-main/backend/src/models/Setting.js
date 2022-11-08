import mongoose from "mongoose";

let SettingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});

export default mongoose.model("Setting", SettingSchema);

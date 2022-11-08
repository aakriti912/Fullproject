import mongoose from "mongoose";

let bannerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    subtitle: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});

export default mongoose.model("Banner", bannerSchema);
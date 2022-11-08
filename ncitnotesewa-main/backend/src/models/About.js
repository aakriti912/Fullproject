import mongoose from "mongoose";

let aboutSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
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

export default mongoose.model("About", aboutSchema);
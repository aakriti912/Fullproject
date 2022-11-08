import mongoose from "mongoose";


let FacultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Faculty", FacultySchema);

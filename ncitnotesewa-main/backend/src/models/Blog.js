import mongoose from "mongoose";

let blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String
    },
    summary: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});
blogSchema.pre('save', function (next) {
    this.slug = this.title.replace(/[^a-zA-Z ]/g, "").replace(/\s/g, '-').toLowerCase();
    next();
});

export default mongoose.model("Blog", blogSchema);
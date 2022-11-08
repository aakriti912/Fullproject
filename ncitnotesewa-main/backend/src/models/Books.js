import mongoose from "mongoose";


const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    pages: {
        type: Number,
        default: 1
    }
}, {
    versionKey: false
});


export default mongoose.model("Book", BookSchema);

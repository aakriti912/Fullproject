import mongoose from "mongoose";

const BookOrdersSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
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

export default mongoose.model("BookOrders", BookOrdersSchema);
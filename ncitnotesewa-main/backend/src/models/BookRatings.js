import mongoose from "mongoose";

const bookRating = mongoose.Schema({
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
    rating: {
        type: Number,
        required: true,
        default: 1
    },
    review: {
        type: String,
    }
});

export default mongoose.model("BookRating", bookRating);

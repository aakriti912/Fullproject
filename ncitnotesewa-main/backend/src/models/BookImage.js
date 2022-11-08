import mongoose from "mongoose";

let BookImageSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});

export default mongoose.model("BookImage", BookImageSchema);
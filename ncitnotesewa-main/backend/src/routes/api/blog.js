import express from "express";
import multer from "multer";

import BlogController from "../../controllers/api/BlogController.js";

const blogRoute = express.Router();
let blogInstance = new BlogController();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/blogs');
    },

    filename: function (req, file, cb) {
        let fileName = file.originalname.trim();
        let imageName = Date.now() + '-' + Math.round(Math.random() * 1E9) + "-" + fileName;
        cb(null, imageName)
    }
});

const upload = multer({storage: storage})

blogRoute.get("/", blogInstance.index);
blogRoute.get("/:id", blogInstance.show);
blogRoute.post("/", upload.array('images', 1), blogInstance.store);
blogRoute.put("/", upload.array('images', 1), blogInstance.update);
blogRoute.delete("/:id", blogInstance.destroy);

export default blogRoute;
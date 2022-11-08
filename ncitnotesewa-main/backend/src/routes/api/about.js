import express from "express";
import multer from "multer";

import AboutController from "../../controllers/api/AboutController.js";

const aboutRoute = express.Router();
let aInstance = new AboutController();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/about');
    },

    filename: function (req, file, cb) {
        let fileName = file.originalname.trim();
        let imageName = Date.now() + '-' + Math.round(Math.random() * 1E9) + "-" + fileName;
        cb(null, imageName)
    }
});

const upload = multer({storage: storage})

aboutRoute.get("/", aInstance.index);
aboutRoute.post("/", upload.array('images', 1), aInstance.store);
aboutRoute.get("/:id", aInstance.show);
aboutRoute.put("/", upload.array('images', 1), aInstance.update);
aboutRoute.delete("/:id", aInstance.destroy);

export default aboutRoute;
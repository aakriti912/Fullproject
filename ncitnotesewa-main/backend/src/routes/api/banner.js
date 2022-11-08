import express from "express";
import multer from "multer";

import BannerController from "../../controllers/api/BannerController.js";

const bannerRoute = express.Router();
let bInstance = new BannerController();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/banner');
    },

    filename: function (req, file, cb) {
        let fileName = file.originalname.trim();
        let imageName = Date.now() + '-' + Math.round(Math.random() * 1E9) + "-" + fileName;
        cb(null, imageName)
    }
});

const upload = multer({storage: storage})

bannerRoute.get("/", bInstance.index);
bannerRoute.post("/", upload.array('images', 1), bInstance.store);
bannerRoute.get("/:id", bInstance.show);
bannerRoute.put("/", upload.array('images', 1), bInstance.update);
bannerRoute.delete("/:id", bInstance.destroy);

export default bannerRoute;
import express from "express";
import multer from "multer";

import SettingController from "../../controllers/api/SettingController.js";

const sRoute = express.Router();
let sInstance = new SettingController();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/setting');
    },

    filename: function (req, file, cb) {
        let fileName = file.originalname.trim();
        let imageName = Date.now() + '-' + Math.round(Math.random() * 1E9) + "-" + fileName;
        cb(null, imageName)
    }
});

const upload = multer({storage: storage})

sRoute.get("/", sInstance.index);
sRoute.put("/", upload.array('images', 1), sInstance.update);

export default sRoute;
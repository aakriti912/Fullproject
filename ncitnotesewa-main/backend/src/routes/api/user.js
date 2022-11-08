import express from "express";
import UserController from "../../controllers/api/UserController.js";
import multer from "multer";

const userRoute = express.Router();
const userInstance = new UserController();

/*
========================Update user profile========================
 */
let imageName;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/users');
    },

    filename: function (req, file, cb) {
        let fileName = file.originalname.trim();
        imageName = Date.now() + '-' + Math.round(Math.random() * 1E9) + "-" + fileName;
        cb(null, imageName)
    }
})

const upload = multer({storage: storage})

/*
========================Een Update user profile========================
 */

userRoute.get("/", userInstance.index);

userRoute.post("/", upload.single('image'), (req, res) => {
    return userInstance.store(req, res, imageName);
});
userRoute.put("/", upload.single('image'), (req, res) => {
    return userInstance.update(req, res, imageName);
});


userRoute.get("/:id", userInstance.show);
userRoute.delete("/:id", userInstance.delete);
userRoute.post('/change-password', userInstance.changePassword);
userRoute.get('/user-search/:id', userInstance.searchUser);


export default userRoute;


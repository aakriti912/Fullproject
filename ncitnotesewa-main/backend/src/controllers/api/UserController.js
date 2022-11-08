import dotenv from "dotenv";
import User from "../../models/User.js";
import fs from "fs";
import bcrypt from "bcrypt";

dotenv.config();


export default class UserController {

    async index(req, res) {
        let users = await User.find();
        users = users.map((user) => {
            if (user.image) {
                user.image = process.env.BASE_URL + "/uploads/users/" + user.image;
            } else {
                user.image = process.env.BASE_URL + "/uploads/icons/imagenotfound.jpg";

            }
            return user;
        });
        res.status(200).json({users: users});
    }

    async store(req, res, imageName) {
        try {
            return await User.create({...req.body, image: imageName}).then((user) => {
                return res.status(200).json({success: "User created successfully"});
            }).catch((err) => {
                return res.json(err);
            });
        } catch (e) {
            return res.json(e);
        }

    }


    async update(req, res, imageName) {
        let id = req.body.id;
        let name = req.body.name;
        let email = req.body.email;
        let gender = req.body.gender;
        return await User.findByIdAndUpdate(id,
            {name, email, gender, image: imageName}).then((user) => {
            return res.status(200).json({success: "User updated successfully"});
        }).catch((err) => {
            return res.json(err);
        });
    }


    async show(req, res) {
        let id = req.params.id;
        try {
            let users = await User.findById(id);
            if (users.image) {
                users.image = process.env.BASE_URL + "/uploads/users/" + users.image;
            } else {
                users.image = process.env.BASE_URL + "/uploads/icons/imagenotfound.jpg";
            }
            res.status(200).json({users: users});
        } catch (err) {
            res.json(err);
        }
    }

    async delete(req, res) {
        let id = req.params.id;
        let findData = await User.findById(id);
        if (findData.image) {
            let filePath = process.cwd() + "\\public\\uploads\\users\\" + findData.image;
            if (fs.existsSync(filePath)) {
                console.log("file exist");
                fs.unlinkSync(filePath);
                await User.findByIdAndDelete(id);
                return res.status(200).json({success: "User deleted successfully"});
            }
            await User.findByIdAndDelete(id);
            return res.status(200).json({success: "Banner deleted successfully"});
        } else {

            try {
                await User.findByIdAndDelete(id);
                return res.status(200).json({success: "User deleted successfully"});
            } catch (err) {
                return res.json(err);
            }
        }
    }

    async changePassword(req, res) {
        let id = req.body.id;
        let oldPassword = req.body.old_password;
        let findData = await User.findById(id);
        let match = await bcrypt.compare(oldPassword, findData.password);
        if (match) {
            findData.password = req.body.password;
            await findData.save();
            return res.status(200).json({success: "Password match"});
        } else {
            return res.status(200).json({error: "Password does not match"});
        }
    }

    async searchUser(req, res) {
        let name = req.params.id;
        let users = await User.find({name: {$regex: name, $options: 'i'}});
        if (users.length > 0) {
            users = users.map((user) => {
                if (user.image) {
                    user.image = process.env.BASE_URL + "/uploads/users/" + user.image;
                } else {
                    user.image = process.env.BASE_URL + "/uploads/icons/imagenotfound.jpg";
                }
                return user;
            });
            return res.status(200).json({users: users});
        }
    }
}


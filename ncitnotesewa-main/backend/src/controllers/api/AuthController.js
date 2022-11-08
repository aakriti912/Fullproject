import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class AuthController {

    async login(req, res, next) {
        let {email, password} = req.body;
        let user = await User.findOne({email: email});
        if (user) {
            let match = await bcrypt.compare(password, user.password);
            if (match) {
                let token = jwt.sign({id: user._id}, process.env.JWT_TOKEN, {expiresIn: "1h"});
                // delete user password
                let response = user.toObject();
                delete response.password;
                response.token = token;
                return res.status(200).json({success: true, authResponse: response});
            } else {
                return res.status(200).json({error: "Password does not match"});
            }

        } else {

            return res.status(200).json({error: "User not found"});
        }


    }

}

export default AuthController;
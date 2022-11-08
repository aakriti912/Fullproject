import dotenv from "dotenv";
import Setting from "../../models/Setting.js";
import fs from "fs";


dotenv.config();

class SettingController {
    async index(request, response) {
        const settingData = await Setting.findOne().sort('_id');
        if (settingData) {
            if (settingData.logo) {
                settingData.logo = process.env.BASE_URL + "/uploads/setting/" + settingData.logo;
            } else {
                settingData.logo = process.env.BASE_URL + "/uploads/icons/ncslogo.svg";
            }
            return response.status(200).json({settings: settingData});
        } else {
            let settingInfo = {
                name: 'demo company',
                email: 'info@demo.com',
                phone: '123456789',
                address: 'demo address',
                logo: 'logo.png',
            }
            return response.status(200).json({settings: settingInfo});
        }

    }

    async update(req, res) {
        let id = req.body.id;
        let name = req.body.name;
        let email = req.body.email;
        let phone = req.body.phone;
        let address = req.body.address;
        let findData = await Setting.findById(id);
        let imageName = "";
        if (req.files) {
            req.files.map(async (file) => {
                imageName = file.filename;
            });
            if (imageName) {
                let filePath = process.cwd() + "\\public\\uploads\\setting\\" + findData.logo;
                if (fs.existsSync(filePath)) {
                    console.log("file exist");
                    fs.unlinkSync(filePath);
                    return await Setting.findByIdAndUpdate(id, {
                        name,
                        email,
                        phone,
                        address,
                        logo: imageName
                    }).then((sObj) => {
                        return res.status(200).json({success: "Setting updated successfully"});
                    }).catch((err) => {
                        return res.json(err);
                    });
                } else {
                    return await Setting.findByIdAndUpdate(id, {
                        name,
                        email,
                        phone,
                        address,
                        logo: imageName
                    }).then((banner) => {
                        return res.status(200).json({success: "Setting updated successfully"});
                    }).catch((err) => {
                        return res.json(err);
                    });
                }
            } else {
                return await Setting.findByIdAndUpdate(id, {
                    name,
                    email,
                    phone,
                    address,
                    image: findData.logo
                }).then((sObj) => {
                    return res.status(200).json({success: "Setting updated successfully"});
                }).catch((err) => {
                    return res.json(err);
                });
            }

        }

    }
}

export default SettingController;
import dotenv from "dotenv";
import fs from "fs";
import About from "../../models/About.js";

dotenv.config();

class AboutController {
    async index(req, res) {
        const abouts = await About.find({});
        abouts.map(async (about) => {
            if (about.image) {
                about.image = process.env.BASE_URL + "/uploads/about/" + about.image;
            } else {
                about.image = process.env.BASE_URL + "/uploads/icons/imagenotfound.jpg";
            }
            return about;
        });
        return res.status(200).json({abouts: abouts});
    }

    async store(req, res) {

        try {
            let imageName = "";
            if (req.files) {
                req.files.map(async (file) => {
                    imageName = file.filename;
                });
            }
            return await About.create({...req.body, image: imageName}).then((banner) => {
                return res.status(200).json({success: "About created successfully"});
            }).catch((err) => {
                return res.json(err);
            });
        } catch (e) {
            return res.json(e);
        }
    }

    async update(req, res) {
        let id = req.body.id;
        let title = req.body.title;
        let description = req.body.description;
        let findData = await About.findById(id);
        let imageName = "";
        if (req.files) {
            req.files.map(async (file) => {
                imageName = file.filename;
            });
            if (imageName) {
                let image = findData.image ?? "";
                let filePath = process.cwd() + "\\public\\uploads\\about\\" + image;
                if (fs.existsSync(filePath) && image) {
                    console.log("file exist");
                    fs.unlinkSync(filePath);
                    return await About.findByIdAndUpdate(id, {
                        title,
                        description,
                        image: imageName
                    }).then((about) => {
                        return res.status(200).json({success: "About updated successfully"});
                    }).catch((err) => {
                        return res.json(err);
                    });
                } else {
                    return await About.findByIdAndUpdate(id, {
                        title,
                        description,
                        image: findData.image
                    }).then((about) => {
                        return res.status(200).json({success: "About updated successfully"});
                    }).catch((err) => {
                        return res.json(err);
                    });
                }
            } else {
                return await About.findByIdAndUpdate(id, {
                    title,
                    description,
                    image: findData.image
                }).then((about) => {
                    return res.status(200).json({success: "About updated successfully"});
                }).catch((err) => {
                    return res.json(err);
                });
            }
        } else {
            return await About.findByIdAndUpdate(id, {
                title,
                description,
                image: findData.image
            }).then((about) => {
                return res.status(200).json({success: "About updated successfully"});
            }).catch((err) => {
                return res.json(err);
            });
        }

    }

    async show(req, res) {
        let id = req.params.id;
        try {
            let abouts = await About.findById(id);
            return res.status(200).json({abouts: abouts});
        } catch (err) {
            return res.json(err);
        }
    }

    async destroy(req, res) {
        let id = req.params.id;
        let findData = await About.findById(id);
        if (findData.image) {
            let image = findData.image ?? "";
            let filePath = process.cwd() + "\\public\\uploads\\about\\" + image;
            if (fs.existsSync(filePath) && image) {
                console.log("file exist");
                fs.unlinkSync(filePath);
                await About.findByIdAndDelete(id);
                return res.status(200).json({success: "About deleted successfully"});
            }
            await About.findByIdAndDelete(id);
            return res.status(200).json({success: "About deleted successfully"});
        } else {

            try {
                await About.findByIdAndDelete(id);
                return res.status(200).json({success: "About deleted successfully"});
            } catch (err) {
                return res.json(err);
            }
        }
    }

}

export default AboutController;
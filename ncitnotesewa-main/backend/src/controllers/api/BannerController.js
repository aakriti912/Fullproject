import dotenv from "dotenv";
import fs from "fs";
import Banner from "../../models/Banner.js";

dotenv.config();

class BannerController {
    async index(req, res) {
        const banners = await Banner.find({});
        banners.map(async (banner) => {
            if (banner.image) {
                banner.image = process.env.BASE_URL + "/uploads/banner/" + banner.image;
            } else {
                banner.image = process.env.BASE_URL + "/uploads/icons/imagenotfound.jpg";
            }
            return banner;
        });
        return res.status(200).json({banners: banners});
    }

    async store(req, res) {

        try {
            let imageName = "";
            if (req.files) {
                req.files.map(async (file) => {
                    imageName = file.filename;
                });
            }
            return await Banner.create({...req.body, image: imageName}).then((banner) => {
                return res.status(200).json({success: "Banner created successfully"});
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
        let subtitle = req.body.subtitle;
        let description = req.body.description;
        let findData = await Banner.findById(id);
        let imageName = "";
        if (req.files) {
            req.files.map(async (file) => {
                imageName = file.filename;
            });
            if (imageName) {
                let image = findData.image ?? "";
                let filePath = process.cwd() + "\\public\\uploads\\banner\\" + image;
                if (fs.existsSync(filePath) && image) {
                    console.log("file exist");
                    fs.unlinkSync(filePath);
                    return await Banner.findByIdAndUpdate(id, {
                        title,
                        subtitle,
                        description,
                        image: imageName
                    }).then((banner) => {
                        return res.status(200).json({success: "Banner updated successfully"});
                    }).catch((err) => {
                        return res.json(err);
                    });
                } else {
                    return await Banner.findByIdAndUpdate(id, {
                        title,
                        subtitle,
                        description,
                        image: findData.image
                    }).then((banner) => {
                        return res.status(200).json({success: "Banner updated successfully"});
                    }).catch((err) => {
                        return res.json(err);
                    });
                }
            } else {
                return await Banner.findByIdAndUpdate(id, {
                    title,
                    subtitle,
                    description,
                    image: findData.image
                }).then((banner) => {
                    return res.status(200).json({success: "Banner updated successfully"});
                }).catch((err) => {
                    return res.json(err);
                });
            }
        } else {
            return await Banner.findByIdAndUpdate(id, {
                title,
                subtitle,
                description,
                image: findData.image
            }).then((banner) => {
                return res.status(200).json({success: "Banner updated successfully"});
            }).catch((err) => {
                return res.json(err);
            });
        }

    }

    async show(req, res) {
        let id = req.params.id;
        try {
            let banners = await Banner.findById(id);
            return res.status(200).json({banners: banners});
        } catch (err) {
            return res.json(err);
        }
    }

    async destroy(req, res) {
        let id = req.params.id;
        let findData = await Banner.findById(id);
        if (findData.image) {
            let image = findData.image ?? "";
            let filePath = process.cwd() + "\\public\\uploads\\banner\\" + image;
            if (fs.existsSync(filePath) && image) {
                console.log("file exist");
                fs.unlinkSync(filePath);
                await Banner.findByIdAndDelete(id);
                return res.status(200).json({success: "Banner deleted successfully"});
            }
            await Banner.findByIdAndDelete(id);
            return res.status(200).json({success: "Banner deleted successfully"});
        } else {

            try {
                await Banner.findByIdAndDelete(id);
                return res.status(200).json({success: "Banner deleted successfully"});
            } catch (err) {
                return res.json(err);
            }
        }
    }

}

export default BannerController;
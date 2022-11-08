import fs from "fs";
import dotenv from "dotenv";
import Blog from "../../models/Blog.js";

dotenv.config();

class BlogController {
    async index(req, res) {
        const blogData = await Blog.find({});
        blogData.map(async (blog) => {
            if (blog.image) {
                blog.image = process.env.BASE_URL + "/uploads/blogs/" + blog.image;
            } else {
                blog.image = process.env.BASE_URL + "/uploads/icons/imagenotfound.jpg";
            }
            return blog;
        });
        return res.status(200).json({blogs: blogData});

    }

    async show(req, res) {
        let id = req.params.id;
        try {
            let blogData = await Blog.findById(id);
            if (blogData.image) {
                blogData.image = process.env.BASE_URL + "/uploads/blogs/" + blogData.image;
            } else {
                blogData.image = process.env.BASE_URL + "/uploads/icons/imagenotfound.jpg";
            }
            console.log(blogData);
            return res.status(200).json({blogs: blogData});
        } catch (err) {
            return res.json(err);
        }

    }

    async store(req, res) {
        try {
            let imageName = "";
            if (req.files) {
                req.files.map(async (file) => {
                    imageName = file.filename;
                });
            }
            return await Blog.create({...req.body, image: imageName}).then((blog) => {
                return res.status(200).json({success: "Blog created successfully"});
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
        let slug = req.body.slug;
        slug = slug.replace(/[^a-zA-Z ]/g, "").replace(/\s/g, '-').toLowerCase()
        let summary = req.body.summary;
        let description = req.body.description;
        let findData = await Blog.findById(id);
        let imageName = "";
        if (req.files) {
            req.files.map(async (file) => {
                imageName = file.filename;
            });
            if (imageName) {
                let findImage = findData.image ?? "";
                let filePath = process.cwd() + "\\public\\uploads\\blogs\\" + findImage;
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    return await Blog.findByIdAndUpdate(id, {
                        title,
                        slug,
                        summary,
                        description,
                        image: imageName
                    }).then((blog) => {
                        return res.status(200).json({success: "Blog updated successfully"});
                    }).catch((err) => {
                        return res.json(err);
                    });
                } else {
                    return await Blog.findByIdAndUpdate(id, {
                        title,
                        slug,
                        summary,
                        description,
                        image: findData.image
                    }).then((blog) => {
                        return res.status(200).json({success: "Blog updated successfully"});
                    }).catch((err) => {
                        return res.json(err);
                    });
                }
            } else {
                return await Blog.findByIdAndUpdate(id, {
                    title,
                    slug,
                    summary,
                    description,
                    image: findData.image
                }).then((blog) => {
                    return res.status(200).json({success: "summary  updated successfully"});
                }).catch((err) => {
                    return res.json(err);
                });
            }
        } else {
            return await Blog.findByIdAndUpdate(id, {
                title,
                slug,
                summary,
                description,
                image: findData.image
            }).then((banner) => {
                return res.status(200).json({success: "Blog updated successfully"});
            }).catch((err) => {
                return res.json(err);
            });
        }


    }

    async destroy(req, res) {
        let id = req.params.id;
        let findData = await Blog.findById(id);
        if (findData.image) {
            let filePath = process.cwd() + "\\public\\uploads\\blogs\\" + findData.image;
            if (fs.existsSync(filePath)) {
                console.log("file exist");
                fs.unlinkSync(filePath);
                await Blog.findByIdAndDelete(id);
                return res.status(200).json({success: "blog deleted successfully"});
            }
            await Blog.findByIdAndDelete(id);
            return res.status(200).json({success: "blog deleted successfully"});
        } else {

            try {
                await Blog.findByIdAndDelete(id);
                return res.status(200).json({success: "Blog deleted successfully"});
            } catch (err) {
                return res.json(err);
            }
        }
    }


}

export default BlogController;
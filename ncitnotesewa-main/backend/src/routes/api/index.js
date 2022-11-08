import express from "express";
import userRoute from "./user.js";
import bookRoute from "./books.js";
import UserAuthRoute from "./auth.js";
import bannerRoute from "./banner.js";
import facultyRoute from "./faculty.js";
import sRoute from "./setting.js";
import blogRoute from "./blog.js";
import contactRoute from "./contact.js";
import messageRouter from "./message.js";
import aboutRoute from "./about.js";
import ckEditorRoute from "./ckeditorimages.js";

const apiRoute = express.Router();

apiRoute.use('/login', UserAuthRoute);
apiRoute.use('/about', aboutRoute);
apiRoute.use("/users", userRoute);
apiRoute.use("/books", bookRoute);
apiRoute.use("/faculty", facultyRoute);
apiRoute.use('/banner', bannerRoute);
apiRoute.use('/setting', sRoute);
apiRoute.use('/blogs', blogRoute);
apiRoute.use('/contact', contactRoute);
apiRoute.use('/message', messageRouter);
apiRoute.use('/ckeditor', ckEditorRoute);

export default apiRoute;
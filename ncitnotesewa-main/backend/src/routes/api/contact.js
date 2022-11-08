import express from "express";

import ContactController from "../../controllers/api/ContactController.js";

const contactRoute = express.Router();
let cInstance = new ContactController();

contactRoute.get("/", cInstance.index);
contactRoute.post("/", cInstance.store);
contactRoute.get("/:id", cInstance.show);
contactRoute.delete("/:id", cInstance.destroy);

export default contactRoute;
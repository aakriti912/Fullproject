import express from "express";

import FacultyController from "../../controllers/api/FacultyController.js";

const facultyRoute = express.Router();
let fInstance = new FacultyController();

facultyRoute.get("/", fInstance.index);
facultyRoute.get("/:id", fInstance.show);
facultyRoute.post("/", fInstance.store);
facultyRoute.post("/status", fInstance.updateStatus);
facultyRoute.put("/", fInstance.update);
facultyRoute.delete("/:id", fInstance.destroy);
export default facultyRoute;
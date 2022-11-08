import express from "express";

import apiRoute from "./api/index.js";


const router = express.Router();

router.use('/api', apiRoute);

export default router;
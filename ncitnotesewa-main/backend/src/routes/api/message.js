import express from "express";
import ChatMessageController from "../../controllers/api/ChatMessageController.js";


let messageRouter = express.Router();
let mInstance = new ChatMessageController();

messageRouter.post('/', mInstance.index);

export default messageRouter;
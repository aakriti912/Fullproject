import Message from "../../models/Message.js";

class ChatMessageController {

    async index(req, res) {
        let senderId = req.body.senderId;
        let receiverId = req.body.receiverId;
        let messages = await Message.find({
            $or: [
                {sender: senderId, receiver: receiverId},
                {receiver: senderId, sender: receiverId}
            ]
        });
        return res.status(200).json({message: messages});
    }
}

export default ChatMessageController;
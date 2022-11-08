import Contact from "../../models/Contact.js";


class ContactController {
    async index(req, res) {
        const contact = await Contact.find({});
        return res.status(200).json({contact});
    }

    async store(req, res) {
        try {
            return await Contact.create({...req.body}).then((banner) => {
                return res.status(200).json({success: "Contact created successfully"});
            }).catch((err) => {
                return res.json(err);
            });
        } catch (e) {
            return res.json(e);
        }
    }

    async show(req, res) {
        let id = req.params.id;
        try {
            let contact = await Contact.findById(id);
            return res.status(200).json({contact});
        } catch (err) {
            return res.json(err);
        }
    }

    async destroy(req, res) {
        let id = req.params.id;
        try {
            await Contact.findByIdAndDelete(id);
            return res.status(200).json({success: "Contact deleted successfully"});
        } catch (err) {
            return res.json(err);
        }

    }

}

export default ContactController;
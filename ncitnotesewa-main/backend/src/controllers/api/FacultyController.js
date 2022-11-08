import Faculty from "../../models/Faculty.js";
import Books from "../../models/Books.js";

class FacultyController {

    async index(req, res) {
        const facultyData = await Faculty.aggregate([{
            $lookup: {
                from: "books",
                localField: "_id",
                foreignField: "faculty",
                as: "books"
            }
        }]);
        facultyData.forEach((faculty) => {
            faculty.totalBooks = faculty.books.length;
            delete faculty.books;
        });
        res.status(200).json({faculty: facultyData});

    }

    async show(req, res) {
        const faculty = await Faculty.findById(req.params.id);
        res.status(200).json({faculty: faculty});
    }

    async store(req, res) {
        let insertData = {
            name: req.body.name,
        }
        try {
            await Faculty.create(insertData)
            res.status(201).json({success: "Faculty created successfully"});
        } catch (e) {
            res.status(200).json({error: "Faculty name already exists"});
        }

    }

    async update(req, res) {
        let id = req.body.id;
        const faculty = await Faculty.findByIdAndUpdate(id);
        faculty.name = req.body.name;
        try {
            await faculty.save();
            res.status(200).json({faculty: faculty, success: "Faculty updated successfully"});
        } catch (e) {
            res.status(200).json({error: "Faculty name already exists"});
        }


    }

    async destroy(req, res) {
        let facultyId = req.params.id;
        const totalBooks = await Books.countDocuments({faculty: facultyId});
        if (totalBooks > 0) {
            res.status(200).json({error: "You can not delete this faculty because it has books"});
        } else {
            const faculty = await Faculty.findByIdAndDelete(req.params.id);
            res.status(200).json({faculty: faculty});
        }

    }

    async updateStatus(req, res) {
        let id = req.body.id;
        const faculty = await Faculty.findByIdAndUpdate(id);
        if (faculty.status === "active") {
            faculty.status = "inactive";
        } else {
            faculty.status = "active";
        }
        await faculty.save();
        res.status(200).json({faculty: faculty, success: "Faculty status updated successfully"});
    }
}

export default FacultyController;
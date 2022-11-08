import Faculty from "../models/Faculty.js";

class FacultyTableSeeder {

    constructor() {
        Faculty.countDocuments({}, (err, count) => {
            if (err) {
                console.log(err);
            } else {
                if (count === 0) {
                    let fOjb = Faculty.insertMany([
                        {name: "engineering"},

                    ]);
                    fOjb.then((res) => {
                        console.log("Faculty table seeded");
                    });
                }
            }
        });


    }

}

export default FacultyTableSeeder;
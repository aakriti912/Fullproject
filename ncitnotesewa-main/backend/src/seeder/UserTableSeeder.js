import User from "../models/User.js";

class UserTableSeeder {

    constructor() {
        User.countDocuments({}, (err, count) => {
            if (err) {
                console.log(err);
            } else {
                if (count === 0) {
                    let uObj = new User({
                        "name": "Admin",
                        "email": "admin@gmail.com",
                        "password": "admin",
                        "role": "admin",
                        "gender": "male"
                    });
                    uObj.save().then((res) => {
                        console.log("User table seeded");
                    });
                }
            }
        });
    }
}

export default UserTableSeeder;
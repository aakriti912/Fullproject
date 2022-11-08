import SettingTableSeeder from "./SettingTableSeeder.js";
import UserTableSeeder from "./UserTableSeeder.js";
import FacultyTableSeeder from "./FacultyTableSeeder.js";

class DbSeeder {

    run() {
        new SettingTableSeeder();
        new UserTableSeeder();
        new FacultyTableSeeder();
    }

}

export default DbSeeder;

import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

function AdminHeaderComponents() {
    const authData = useSelector((store) => store);
    let authUser = authData.auth.data;

    let logout = () => {
        localStorage.clear();
        window.location.href = "/login";
    }
    return (
        <header id="header" className="header fixed-top d-flex align-items-center">
            <div className="d-flex align-items-center justify-content-between">
                <Link to="/dashboard" className="logo d-flex align-items-center">
                    <span className="d-none d-lg-block">NCIT NOTE SEWA</span>
                </Link>
                <i className="bi bi-list toggle-sidebar-btn"/>
            </div>
            <div className="search-bar">
                <form className="search-form d-flex align-items-center" method="POST" action="#">
                    <input type="text" name="query" placeholder="Search" title="Enter search keyword"/>
                    <button type="submit" title="Search"><i className="bi bi-search"/></button>
                </form>
            </div>
            <nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">
                    <li className="nav-item d-block d-lg-none">
                        <a className="nav-link nav-icon search-bar-toggle " href="#">
                            <i className="bi bi-search"/>
                        </a>
                    </li>

                    <li className="nav-item dropdown pe-3">
                        <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#"
                           data-bs-toggle="dropdown">
                            <img src={authUser.image} alt="Profile" className="rounded-circle"/>
                            <span className="d-none d-md-block dropdown-toggle ps-2">
                                {authUser.name}
                            </span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                            <li>
                                <Link to="/update-profile" className="dropdown-item d-flex align-items-center">
                                    <i className="bi bi-person"/>
                                    Update Profile
                                </Link>
                            </li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li>
                                <Link to="/change-password" className="dropdown-item d-flex align-items-center">
                                    <i className="bi bi-person"/>
                                    Change Password
                                </Link>
                            </li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li>
                                <button onClick={logout} className="dropdown-item d-flex align-items-center">
                                    <i className="bi bi-box-arrow-right"/>
                                    <span>Sign Out</span>
                                </button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>

    )
}

export default AdminHeaderComponents;
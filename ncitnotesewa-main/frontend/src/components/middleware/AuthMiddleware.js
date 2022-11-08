import {Navigate, Outlet} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import "../../assets/css/AdminStyle.css";
import "../../assets/bootstrap-icons/bootstrap-icons.css";
import {getAuthUser} from "../../store/reducers/authSlice";


function AuthMiddleware() {
    const isLogged = localStorage.getItem("token");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAuthUser(localStorage.getItem("userId")));
    });
    return isLogged ? <Outlet/> : <Navigate to="/login"/>;
}

export default AuthMiddleware;
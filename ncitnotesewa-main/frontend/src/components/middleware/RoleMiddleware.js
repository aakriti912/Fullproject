// import {useDispatch, useSelector} from "react-redux";
// import {Navigate, Outlet} from "react-router-dom";
// import {useEffect} from "react";
// import {getUserById} from "../../store/reducers/usersSlice";
//
// function RoleMiddleware() {
//     const dispatch = useDispatch();
//     useEffect(() => {
//         dispatch(getUserById(localStorage.getItem("userId")));
//     });
//     let userData = useSelector(state => state);
//     let userRole = userData.user.data.role === 'admin' ? true : null;
//     return userRole ? <Outlet/> : <Navigate to="/dashboard"/>;
//
// }
//
// export default RoleMiddleware;
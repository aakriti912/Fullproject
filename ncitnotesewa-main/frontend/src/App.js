import React from "react";
import MasterComponents from "./components/master/MasterComponents";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./assets/css/FrontendStyle.scss";

import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getSetting} from "./store/reducers/settingSlice";
import {getAuthUser} from "./store/reducers/authSlice";
import {getFaculty} from "./store/reducers/facultySlice";


function App() {
    let dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem('userId')) {
            dispatch(getAuthUser(localStorage.getItem('userId')));
        }
        dispatch(getSetting())
        dispatch(getFaculty());
    }, []);
    return (
        <React.Fragment>
            <MasterComponents/>
        </React.Fragment>
    )
}


export default App;

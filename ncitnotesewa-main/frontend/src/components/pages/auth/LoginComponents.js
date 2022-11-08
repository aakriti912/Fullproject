import React, {useContext} from "react";
import {useDispatch} from "react-redux";

import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import {loginUser} from "../../../store/reducers/usersSlice";
import HeaderComponents from "../../layouts/HeaderComponents";
import FooterComponents from "../../layouts/FooterComponents";
import "./Login.css";

const LoginSchema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
});

function LoginComponents() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(LoginSchema)
    });
    let pStyle = {
        color: "#f60000",
    }
    const onSubmit = (data) => {
        dispatch(loginUser(data)).then((res) => {
            if (res.payload.success) {
                let responseData = res.payload.authResponse;
                localStorage.setItem('token', responseData.token);
                localStorage.setItem('userId', responseData._id);
                window.location.href = "/";
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: `${res.payload.error} `,
                    showConfirmButton: true,
                });
            }

        }, [])

    };


    return (
        <React.Fragment>
            <HeaderComponents/>
            <div className="container mt-5 mt-5 mb-5">
                <div className="row  justify-content-center">
                    <div className="col-md-4">
                        <h1>Login</h1>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group mb-3">
                                <label>Email:
                                    {errors.email && <a style={pStyle}>{errors.email.message}</a>}
                                </label>
                                <input {...register("email")} type="email" className="form-control"/>

                            </div>
                            <div className="form-group mb-3">
                                <label>Password:
                                    {errors.password && <a style={pStyle}>{errors.password.message}</a>}
                                </label>
                                <input {...register("password")} type="password" className="form-control"/>

                            </div>
                            <div className="form-group mb-5">
                                <button className="login-btn">
                                    <i className="bi bi-file-lock-fill"></i> Login </button>
                                <Link to="/register" className="float-end">Create Account</Link>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
            <FooterComponents/>
        </React.Fragment>
    );
}

export default LoginComponents;




import React from "react";
import {Link} from "react-router-dom";

import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import {changePassword} from "../../../../store/reducers/usersSlice";

import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import AdminFooterComponents from "../../layouts/AdminFooterComponents";


const RegisterSchema = yup.object().shape({
    old_password: yup.string().required(),
    password: yup.string().required(),
    confirm_password: yup.string().required()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),

});

function UpdateUserComponents() {
    const dispatch = useDispatch();

    const {
        register, reset, handleSubmit, formState: {errors}
    } = useForm({
        resolver: yupResolver(RegisterSchema)
    });
    let pStyle = {
        color: "#f60000",
    }


    const customPasswordChange = (data) => {
        data.id = localStorage.getItem("userId");
        dispatch(changePassword(data)).then((res) => {
            if (res.payload.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Password Changed',
                    text: res.payload.message,
                })
                reset();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.payload.error,
                })
            }
        });

    }


    return (
        <div>
            <AdminHeaderComponents/>
            <AdminAsideComponents/>
            <main id="main" className="main">
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h1 className="card-title-dp">
                                        <i className="bi bi-pencil-square"></i> Change Password
                                        <Link to="/dashboard" className="btn btn-primary float-end">
                                            <i className="bi bi-arrow-right-square-fill"></i> Goto Dashboard
                                        </Link>
                                    </h1>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <form action="" onSubmit={handleSubmit(customPasswordChange)}>
                                                <div className="form-group mb-2">
                                                    <label htmlFor="old_password">Old Password:
                                                        {errors.old_password &&
                                                            <a style={pStyle}>{errors.old_password.message}</a>}
                                                    </label>
                                                    <input type="password" className="form-control"
                                                           {...register("old_password")} name="old_password"/>

                                                </div>
                                                <div className="form-group mb-2">
                                                    <label htmlFor="password">Password:
                                                        {errors.password &&
                                                            <a style={pStyle}>{errors.password.message}</a>}
                                                    </label>
                                                    <input type="password" className="form-control"
                                                           {...register("password")} name="password"/>

                                                </div>
                                                <div className="form-group mb-2">
                                                    <label htmlFor="confirm_password">Confirm Password:
                                                        {errors.confirm_password &&
                                                            <a style={pStyle}>{errors.confirm_password.message}</a>}
                                                    </label>
                                                    <input type="password" className="form-control"
                                                           {...register("confirm_password")} name="confirm_password"/>

                                                </div>
                                                <div className="form-group mb-2">
                                                    <button type="submit" className="btn btn-primary">
                                                        <i className="bi bi-pencil-square"></i> Update Password
                                                    </button>

                                                </div>

                                            </form>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </main>
            <AdminFooterComponents/>
        </div>

    );
}

export default UpdateUserComponents;

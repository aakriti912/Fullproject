import React, {useState} from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import Swal from "sweetalert2";
import {useDispatch} from "react-redux";
import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import AdminFooterComponents from "../../layouts/AdminFooterComponents";
import {createFaculty} from "../../../../store/reducers/facultySlice";
import {Link} from "react-router-dom";

const facultySchema = yup.object().shape({
    name: yup.string().required(),
});

function AddFacultyComponents() {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(facultySchema)
    });
    let pStyle = {
        color: "#f60000",
    }

    const add = (data) => {
        dispatch(createFaculty(data)).then((res) => {
            if (res.payload.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Faculty added successfully',
                    showConfirmButton: true,
                    timer: 2500,
                    footer: '<a href="/show-faculty">Click here to show faculty</a>'
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
    return (<div>
        <AdminHeaderComponents/>
        <AdminAsideComponents/>
        <main id="main" className="main">
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h1 className="card-title-dp">
                                    <i className="bi bi-bag-plus-fill"></i> Add Faculty
                                    <Link to="/show-faculty" className="btn btn-primary float-end">
                                        Show Faculty
                                    </Link>
                                </h1>
                                <form action="" onSubmit={handleSubmit(add)}>
                                    <div className="form-group mb-2">
                                        <label htmlFor="name">Name:
                                            {errors.name && <a style={pStyle}>{errors.name.message}</a>}
                                        </label>
                                        <input type="text" name="name"
                                               {...register("name")}
                                               className="form-control"/>
                                    </div>
                                    <div className="form-group mb-2">
                                        <button className="btn btn-success">Add Faculty</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </main>
        <AdminFooterComponents/>
    </div>)
}

export default AddFacultyComponents
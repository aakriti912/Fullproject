import React, {useEffect} from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import Swal from "sweetalert2";
import {useDispatch} from "react-redux";
import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import AdminFooterComponents from "../../layouts/AdminFooterComponents";
import {updateFaculty} from "../../../../store/reducers/facultySlice";
import {Link, useParams} from "react-router-dom";
import api from "../../../../config/api";

const facultySchema = yup.object().shape({
    name: yup.string().required(),
});

function UpdateFacultyComponents() {
    const dispatch = useDispatch();
    let params = useParams();


    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(facultySchema)
    });
    let pStyle = {
        color: "#f60000",
    }

    useEffect(() => {
        api.get(`/faculty/${params.id}`).then((response) => {
            let faculty = response.data.faculty;
            setValue('id', faculty._id);
            setValue("name", faculty.name);

        });
    }, [params.id]);


    const update = (data) => {
        dispatch(updateFaculty(data)).then((res) => {
            if (res.payload.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Update added successfully',
                    showConfirmButton: true,
                    timer: 2500,
                    footer: '<a href="/show-faculty">Click here to show faculty</a>'
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.payload.error,
                    showConfirmButton: true,
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
                                    <i className="bi bi-bag-plus-fill"></i> Update Faculty
                                    <Link to="/show-faculty" className="btn btn-primary float-end">
                                        <i className="bi bi-bag-plus-fill"></i> Show Faculty</Link>
                                </h1>
                                <form action="" onSubmit={handleSubmit(update)}>
                                    <div className="form-group mb-2">
                                        <label htmlFor="name">Name:
                                            {errors.name && <a style={pStyle}>{errors.name.message}</a>}
                                        </label>
                                        <input type="text" name="name"
                                               {...register("name")}
                                               className="form-control"/>
                                    </div>
                                    <div className="form-group mb-2">
                                        <button className="btn btn-success"><i
                                            className="bi bi-pencil-square"></i> Update Faculty
                                        </button>
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

export default UpdateFacultyComponents
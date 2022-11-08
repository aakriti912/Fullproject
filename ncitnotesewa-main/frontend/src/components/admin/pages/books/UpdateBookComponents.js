import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import {useDispatch} from "react-redux";
import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import AdminFooterComponents from "../../layouts/AdminFooterComponents";
import api from "../../../../config/api";
import {Link, useParams} from "react-router-dom";

const BookSchema = yup.object().shape({
    title: yup.string().required(),
    price: yup.number().required(),
    quantity: yup.number().required(),
    faculty: yup.string().required(),
    description: yup.string().required(),
});

function UpdateBookComponents() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(BookSchema)
    });
    const [faculties, setFaculties] = useState([]);
    const [facultyId, setFacultyId] = useState();
    const [facultyName, setFacultyName] = useState();

    let params = useParams();

    const getBookById = () => {
        api.get(`/books/${params.id}`).then(res => {
            let book = res.data.book;
            setFacultyId(book.faculty_id);
            setFacultyName(book.faculty_name);
            setValue('title', book.title);
            setValue('price', book.price);
            setValue('quantity', book.quantity);
            setValue('faculty', book.faculty);
            setValue('description', book.description);
        });

    }

    const getFaculties = () => {
        api.get('/faculty').then(res => {
            console.log(res.data);
            setFaculties(res.data.faculty);
        });
    }

    useEffect(() => {
        getBookById();
        getFaculties();

    }, []);


    let pStyle = {
        color: "#f60000",
    }


    const update = (data) => {
        data = {...data, postedBy: localStorage.getItem("userId")};
        api.put(`/books/${params.id}`, data).then(res => {
            if (res.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Book updated successfully',
                    showConfirmButton: true,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
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
                                        <i className="bi bi-pencil-square"></i> Update Book
                                        <Link to="/show-book" className="btn btn-primary float-end">
                                            <i className="bi bi-arrow-right-square-fill"></i> Show Books
                                        </Link>
                                    </h1>
                                    <form action="#"
                                          onSubmit={handleSubmit(update)}>
                                        <div className="form-group mb-2">
                                            <label htmlFor="title">Title:
                                                {errors.title && <a style={pStyle}>{errors.title.message}</a>}
                                            </label>
                                            <input type="text" name="title"
                                                   {...register("title")}
                                                   className="form-control"/>
                                        </div>
                                        <div className="form-group mb-2">
                                            <label htmlFor="price">Price:
                                                {errors.price && <a style={pStyle}>{errors.price.message}</a>}
                                            </label>
                                            <input type="number" name="price"
                                                   {...register("price")}
                                                   className="form-control"/>
                                        </div>
                                        <div className="form-group mb-2">
                                            <label htmlFor="quantity">quantity:
                                                {errors.quantity && <a style={pStyle}>{errors.quantity.message}</a>}
                                            </label>
                                            <input type="number" name="quantity"
                                                   {...register("quantity")}
                                                   className="form-control"/>
                                        </div>
                                        <div className="form-group mb-2">
                                            <label htmlFor="faculty">Faculty:
                                                {errors.faculty && <a style={pStyle}>{errors.faculty.message}</a>}
                                            </label>
                                            <select name="faculty" {...register("faculty")} id=""
                                                    className="form-control">
                                                <option value={facultyId}>{facultyName}</option>
                                                {faculties.map((faculty) => (
                                                    <option key={faculty._id} value={faculty._id}>
                                                        {faculty.name}
                                                    </option>

                                                ))}

                                            </select>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="description">Description:
                                                {errors.description &&
                                                    <a style={pStyle}>{errors.description.message}</a>}
                                            </label>
                                            <textarea name="description"
                                                      {...register("description")}
                                                      className="form-control"></textarea>
                                        </div>
                                        <div className="form-group mb-3">
                                            <button className="btn btn-success">
                                                <i className="bi bi-pencil-square"></i> Update Books
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
        </div>

    )
}

export default UpdateBookComponents;
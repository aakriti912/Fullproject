import React, {useState} from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {useDispatch} from "react-redux";
import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import AdminFooterComponents from "../../layouts/AdminFooterComponents";
import Swal from "sweetalert2";
import {insertBlog} from "../../../../store/reducers/blogSlice";
import {Link} from "react-router-dom";

const blogSchema = yup.object().shape({
    title: yup.string().required(),
    slug: yup.string().required(),
    summary: yup.string().required(),
    description: yup.string().required(),
});

function AddBlogComponents() {
    const [value, setValue] = useState("");
    const getValue = (value) => {
        setValue(value);
    };

    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(blogSchema)
    });
    let pStyle = {
        color: "#f60000",
    }
    const [images, setImages] = useState([]);


    const imageHandler = (e) => {
        setImages(e.target.files);
    }
    const addBlog = (data) => {
        let sendData = new FormData();
        sendData.append('title', data.title);
        sendData.append('slug', data.slug);
        sendData.append('summary', data.summary);
        sendData.append('description', data.description);
        Object.values(images).forEach(file => {
            sendData.append("images", file);
        });
        dispatch(insertBlog(sendData)).then((res) => {
            if (res.payload.success) {
                Swal.fire({
                    icon: 'success',
                    title: res.payload.success,
                    showConfirmButton: true,
                    timer: 1500
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
        <React.Fragment>
            <AdminHeaderComponents/>
            <AdminAsideComponents/>
            <main id="main" className="main">
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h1 className="card-title-dp">
                                        <i className="bi bi-bag-plus-fill"></i> Add Blog
                                        <Link to="/show-blog" className="btn btn-primary float-end">
                                            Show Blogs
                                        </Link>
                                    </h1>
                                    <form action="" onSubmit={handleSubmit(addBlog)}>
                                        <div className="form-group mb-2">
                                            <label htmlFor="title">Title:
                                                {errors.title && <a style={pStyle}>{errors.title.message}</a>}
                                            </label>
                                            <input type="text" name="title"
                                                   {...register("title")}
                                                   className="form-control"/>
                                        </div>
                                        <div className="form-group mb-2">
                                            <label htmlFor="slug">Slug:
                                                {errors.slug && <a style={pStyle}>{errors.slug.message}</a>}
                                            </label>
                                            <input type="text" name="slug"
                                                   {...register("slug")}
                                                   className="form-control"/>
                                        </div>
                                        <div className="form-group mb-2">
                                            <label htmlFor="summary">Summary:
                                                {errors.summary && <a style={pStyle}>{errors.summary.message}</a>}
                                            </label>
                                            <textarea name="description"
                                                      {...register("summary")}
                                                      id="editor" className="form-control"></textarea>
                                        </div>

                                        <div className="form-group mb-2">
                                            <label htmlFor="description">Description:
                                                {errors.description &&
                                                    <a style={pStyle}>{errors.description.message}</a>}
                                            </label>
                                            <textarea name="description"></textarea>
                                        </div>
                                        <div className="form-group mb-2">
                                            <label htmlFor="images">Images:

                                            </label>
                                            <input type="file" name="images" multiple
                                                   onChange={imageHandler}
                                                   className="form-control"/>
                                        </div>
                                        <div className="form-group mb-2">
                                            <button className="btn btn-success">
                                                <i className="bi bi-bag-plus-fill"></i> Add Blog
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
        </React.Fragment>
    )

}

export default AddBlogComponents
import React, {useEffect, useState} from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import Swal from "sweetalert2";
import {useDispatch} from "react-redux";

import {Link, useParams} from "react-router-dom";
import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import AdminFooterComponents from "../../layouts/AdminFooterComponents";
import api from "../../../../config/api";
import {updateBlog} from "../../../../store/reducers/blogSlice";

const bannerSchema = yup.object().shape({
    title: yup.string().required(),
    slug: yup.string().required(),
    summary: yup.string().required(),
    description: yup.string().required(),
});

function UpdateBlogComponents() {
    const dispatch = useDispatch();
    const params = useParams();
    const {register, handleSubmit, setValue, formState: {errors}} = useForm({
        resolver: yupResolver(bannerSchema)
    });
    let pStyle = {
        color: "#f60000",
    }
    const [images, setImages] = useState([]);

    const imageHandler = (e) => {
        setImages(e.target.files);
    }


    const updateBannerData = (data) => {
        let sendData = new FormData();
       sendData.append('id', params.id);
        sendData.append('title', data.title);
        sendData.append('slug', data.slug);
        sendData.append('summary', data.summary);
        sendData.append('description', data.description);
        Object.values(images).forEach(file => {
            sendData.append("images", file);
        });

        dispatch(updateBlog(sendData)).then((res) => {
            if (res.payload.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Banner updated successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            }
        }, []);


    }

    useEffect(() => {
        api.get(`/blogs/${params.id}`).then((response) => {
            let banner = response.data.blogs;
            setValue("title", banner.title);
            setValue("slug", banner.slug);
            setValue("summary", banner.summary);
            setValue("description", banner.description);
        });
    }, [params.id]);
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
                                    <i className="bi bi-bag-plus-fill"></i> Update Blog
                                    <Link to="/show-blog" className="btn btn-primary float-end">
                                        Show Blogs
                                    </Link>
                                </h1>
                                <form action="" onSubmit={handleSubmit(updateBannerData)}>
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
                                        <label htmlFor="description">Summary:
                                            {errors.summary &&
                                                <a style={pStyle}>{errors.summary.message}</a>}
                                        </label>
                                        <textarea name="summary"
                                                  {...register("summary")}
                                                  id="editor" className="form-control"></textarea>
                                    </div>

                                    <div className="form-group mb-2">
                                        <label htmlFor="description">Description:
                                            {errors.description &&
                                                <a style={pStyle}>{errors.description.message}</a>}
                                        </label>
                                        <textarea name="description"
                                                  {...register("description")}
                                                  id="editor" className="form-control"></textarea>
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
                                            <i className="bi bi-pencil-square"></i> Update Blog
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

export default UpdateBlogComponents
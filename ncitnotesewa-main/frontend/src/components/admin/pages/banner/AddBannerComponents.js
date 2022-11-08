import React, {useState} from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import Swal from "sweetalert2";
import {useDispatch} from "react-redux";
import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import AdminFooterComponents from "../../layouts/AdminFooterComponents";
import {createBanner} from "../../../../store/reducers/bannerSlice";
import MyEditor from "../../../editor/MyEditor";

const bannerSchema = yup.object().shape({
    title: yup.string().required(),
    subtitle: yup.string().required(),
});

function AddBannerComponents(props) {
    const [editor, setEditor] = useState(null);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(bannerSchema)
    });
    let pStyle = {
        color: "#f60000",
    }
    const [images, setImages] = useState([]);


    const imageHandler = (e) => {
        setImages(e.target.files);
    }
    const addBanner = (data) => {
        let sendData = new FormData();
        sendData.append('title', data.title);
        sendData.append('subtitle', data.title);
        sendData.append('description', editor);
        Object.values(images).forEach(file => {
            sendData.append("images", file);
        });
        dispatch(createBanner(sendData)).then((res) => {
            if (res.payload.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Banner added successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                reset();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
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
                                    <i className="bi bi-bag-plus-fill"></i> Add Banner
                                </h1>
                                <form action="" onSubmit={handleSubmit(addBanner)}>
                                    <div className="form-group mb-2">
                                        <label htmlFor="title">Title:
                                            {errors.title && <a style={pStyle}>{errors.title.message}</a>}
                                        </label>
                                        <input type="text" name="title"
                                               {...register("title")}
                                               className="form-control"/>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label htmlFor="subtitle">Sub Title:
                                            {errors.subtitle && <a style={pStyle}>{errors.subtitle.message}</a>}
                                        </label>
                                        <input type="text" name="subtitle"
                                               {...register("subtitle")}
                                               className="form-control"/>
                                    </div>

                                    <div className="form-group mb-2">
                                        <label htmlFor="description">Description: </label>
                                        <MyEditor
                                            handleChange={(data) => {
                                                setEditor(data);
                                            }}
                                            data={editor}
                                            {...props} />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label htmlFor="images">Images:

                                        </label>
                                        <input type="file" name="images" multiple
                                               onChange={imageHandler}
                                               className="form-control"/>
                                    </div>
                                    <div className="form-group mb-2">
                                        <button className="btn btn-success">Add Banner</button>
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

export default AddBannerComponents;



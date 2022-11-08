import React, {useEffect, useState} from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import Swal from "sweetalert2";
import {useDispatch} from "react-redux";
import AdminHeaderComponents from "../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../layouts/AdminAsideComponents";
import AdminFooterComponents from "../layouts/AdminFooterComponents";
import api from "../../../config/api";
import {updateSetting} from "../../../store/reducers/settingSlice";

const bannerSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email(),
    phone: yup.string().required(),
    address: yup.string().required(),
});

function SettingComponents() {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(bannerSchema)
    });
    let pStyle = {
        color: "#f60000",
    }
    const [setting, setSetting] = useState([]);
    const [images, setImages] = useState([]);


    const imageHandler = (e) => {
        setImages(e.target.files);
    }
    const addBanner = (data) => {
        let sendData = new FormData();
        sendData.append("id", setting._id);
        sendData.append('name', data.name);
        sendData.append('email', data.email);
        sendData.append('phone', data.phone);
        sendData.append('address', data.address);
        Object.values(images).forEach(file => {
            sendData.append("images", file);
        });
        dispatch(updateSetting(sendData)).then((res) => {
            if (res.payload.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Setting was successfully Updated',
                    showConfirmButton: true,
                    timer: 2000
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

    useEffect(() => {
        api.get(`/setting`).then((response) => {
            let settingData = response.data.settings;

            setSetting(settingData);
            setValue("name", settingData.name);
            setValue("email", settingData.email);
            setValue("phone", settingData.phone);
            setValue("address", settingData.address);
        });
    }, []);
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
                                    <i className="bi bi-gear-fill"></i> Settings
                                </h1>
                                <div className="row">
                                    <div className="col-md-8">
                                        <form action="" onSubmit={handleSubmit(addBanner)}>
                                            <div className="form-group mb-2">
                                                <label htmlFor="name">Company Name:
                                                    {errors.name && <a style={pStyle}>{errors.name.message}</a>}
                                                </label>
                                                <input type="text" name="name"
                                                       {...register("name")}
                                                       className="form-control"/>
                                            </div>
                                            <div className="form-group mb-2">
                                                <label htmlFor="email">Email:
                                                    {errors.email && <a style={pStyle}>{errors.email.message}</a>}
                                                </label>
                                                <input type="text" name="email"
                                                       {...register("email")}
                                                       className="form-control"/>
                                            </div>
                                            <div className="form-group mb-2">
                                                <label htmlFor="phone">Phone:
                                                    {errors.phone && <a style={pStyle}>{errors.phone.message}</a>}
                                                </label>
                                                <input type="text" name="phone"
                                                       {...register("phone")}
                                                       className="form-control"/>
                                            </div>
                                            <div className="form-group mb-2">
                                                <label htmlFor="address">Address:
                                                    {errors.address && <a style={pStyle}>{errors.address.message}</a>}
                                                </label>
                                                <input type="text" name="address"
                                                       {...register("address")}
                                                       className="form-control"/>
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
                                                    <i className="bi bi-gear-fill"></i> Save
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-md-4">
                                        <img src={setting.logo} alt="" className="img-fluid"/>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </main>
        <AdminFooterComponents/>
    </div>)
}

export default SettingComponents
import React from "react";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import HeaderComponents from "../../layouts/HeaderComponents";
import FooterComponents from "../../layouts/FooterComponents";
import api from "../../../config/api";


const contactSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email(),
    phone: yup.number().required(),
    message: yup.string().required(),

});

function ContactComponents() {
    const dispatch = useDispatch();
    const {
        register, handleSubmit, reset, formState: {errors}
    } = useForm({
        resolver: yupResolver(contactSchema)
    });
    let pStyle = {
        color: "#f60000",
    }

    const contactUsRecord = (data) => {
        api.post("/contact", data).then((res) => {
            if (res.data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: res.data.success,
                    showConfirmButton: false,
                    timer: 1500,
                });
                reset();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: res.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });

    }

    return (
        <React.Fragment>
            <HeaderComponents/>
            <div className="container mb-5 mt-5">
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <h1 className="card-title-dp">Contact US</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <form action="" onSubmit={handleSubmit(contactUsRecord)}>
                            <div className="form-group mb-2">
                                <label htmlFor="name">Name:
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
                                <input type="email" className="form-control"
                                       {...register("email")}
                                       name="email"/>


                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="phone">Phone:
                                    {errors.phone && <a style={pStyle}>{errors.phone.message}</a>}
                                </label>
                                <input type="number" className="form-control"
                                       {...register("phone")}
                                       name="phone"/>


                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="message">Message:
                                    {errors.message && <a style={pStyle}>{errors.message.message}</a>}
                                </label>

                                <textarea  {...register("message")}
                                           name="message"
                                           className="form-control" style={{height: 200}}>

                                </textarea>


                            </div>


                            <div className="form-group mb-2">
                                <button className="btn btn-primary">Contact Us</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
            <FooterComponents/>
        </React.Fragment>
    );
}

export default ContactComponents;

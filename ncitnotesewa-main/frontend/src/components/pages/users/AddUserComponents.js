import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import { createUser } from "../../../store/reducers/usersSlice";
import HeaderComponents from "../../layouts/HeaderComponents";
import FooterComponents from "../../layouts/FooterComponents";
import "./Login.css";

const RegisterSchema = yup.object().shape({
  name: yup.string().required(),
  // email: yup.string().required().email(),
  password: yup.string().required(),
  confirm_password: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  gender: yup.string().required(),
});

function AddUserComponents() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });
  let pStyle = {
    color: "#f60000",
  };
  const [profile, setProfile] = useState("");

  const onEmailhandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const imageHandler = (e) => {
    setProfile(e.target.files[0]);
  };
  const insertUser = (data) => {
    let sendData = new FormData();
    sendData.append("name", data.name);
    sendData.append("email", email);
    sendData.append("password", data.password);
    sendData.append("gender", data.gender);
    sendData.append("image", profile);
    dispatch(createUser(sendData))
      .then((res) => {
        if (res.payload.success) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${res.payload.success} `,
            showConfirmButton: true,
          });
          reset();
          setTimeout(() => {
            window.location.href = "/login";
          }, 5000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <HeaderComponents />
      <div className="container mb-5 mt-5">
        <div className="row">
          <div className="col-md-12 mb-3">
            <h1 className="card-title-dp">Create New Account</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <form action="" onSubmit={handleSubmit(insertUser)}>
              <div className="form-group mb-2">
                <label htmlFor="name">
                  Name:
                  {errors.name && <a style={pStyle}>{errors.name.message}</a>}
                </label>
                <input
                  type="text"
                  name="name"
                  {...register("name")}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="email">
                  Email:
                  <a style={{ color: "red", textDecortion: "none" }}>
                    Email must be @ncit.edu.np
                  </a>
                  {errors.email && <a style={pStyle}>{errors.email.message}</a>}
                </label>
                <input
                  type="email"
                  className="form-control"
                  pattern=".+@ncit.edu\.np"
                  required
                  name="email"
                  onChange={onEmailhandler}
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="password">
                  Password:
                  {errors.password && (
                    <a style={pStyle}>{errors.password.message}</a>
                  )}
                </label>
                <input
                  type="password"
                  className="form-control"
                  {...register("password")}
                  name="password"
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="confirm_password">
                  Confirm Password:
                  {errors.confirm_password && (
                    <a style={pStyle}>{errors.confirm_password.message}</a>
                  )}
                </label>
                <input
                  type="password"
                  className="form-control"
                  {...register("confirm_password")}
                  name="confirm_password"
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="gender">
                  Gender:
                  {errors.gender && (
                    <a style={pStyle}>{errors.gender.message}</a>
                  )}
                </label>
                <select
                  name="gender"
                  {...register("gender")}
                  className="form-control"
                >
                  <option value="">--select gender---</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={imageHandler}
                />
              </div>
              <div className="form-group mb-2">
                <button className="login-btn">Create User</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <FooterComponents />
    </React.Fragment>
  );
}

export default AddUserComponents;

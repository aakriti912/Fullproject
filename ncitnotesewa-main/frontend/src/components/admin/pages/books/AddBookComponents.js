import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { createBook } from "../../../../store/reducers/bookSlice";
import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import AdminFooterComponents from "../../layouts/AdminFooterComponents";
import api from "../../../../config/api";
import { Link } from "react-router-dom";

const BookSchema = yup.object().shape({
  title: yup.string().required(),
  price: yup.number().required(),
  quantity: yup.number().required(),
  faculty: yup.string().required(),
  description: yup.string().required(),
});

function AddBookComponents() {
  const [faculties, setFaculties] = useState([]);
  let dispatch = useDispatch();

  useEffect(() => {
    api.get("/faculty").then((response) => {
      setFaculties(response.data.faculty);
    });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(BookSchema),
  });
  let pStyle = {
    color: "#f60000",
  };
  const [images, setImages] = useState([]);

  const imageHandler = (e) => {
    setImages(e.target.files);
  };

  const addBook = (data) => {
    let sendData = new FormData();
    sendData.append("title", data.title);
    sendData.append("price", data.price);
    sendData.append("quantity", data.quantity);
    sendData.append("faculty", data.faculty);
    sendData.append("description", data.description);
    Object.values(images).forEach((file) => {
      sendData.append("images", file);
    });
    sendData.append("postedBy", localStorage.getItem("userId"));
    dispatch(createBook(sendData)).then((res) => {
      if (res.payload.success) {
        Swal.fire({
          icon: "success",
          title: "books added successfully",
          showConfirmButton: true,
          timer: 3000,
          footer: '<a href="/show-book">Go to books list</a>',
        });
        reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    });
  };
  return (
    <div>
      <AdminHeaderComponents />
      <AdminAsideComponents />
      <main id="main" className="main">
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h1 className="card-title-dp">
                    <i className="bi bi-bag-plus-fill"></i> Add Product
                    <Link
                      to="/show-book"
                      style={{ backgroundColor: "#023246" }}
                      className="btn btn-primary float-end"
                    >
                      <i className="bi bi-arrow-right-square-fill"></i> Show
                      Product
                    </Link>
                  </h1>
                  <form action="#" onSubmit={handleSubmit(addBook)}>
                    <div className="form-group mb-1">
                      <label htmlFor="title">
                        Title:
                        {errors.title && (
                          <a style={pStyle}>{errors.title.message}</a>
                        )}
                      </label>
                      <input
                        type="text"
                        name="title"
                        {...register("title")}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group mb-1">
                      <label htmlFor="price">
                        Price:
                        {errors.price && (
                          <a style={pStyle}>{errors.price.message}</a>
                        )}
                      </label>
                      <input
                        type="number"
                        name="price"
                        {...register("price")}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group mb-1">
                      <label htmlFor="quantity">
                        quantity:
                        {errors.quantity && (
                          <a style={pStyle}>{errors.quantity.message}</a>
                        )}
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        {...register("quantity")}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group mb-1">
                      <label htmlFor="faculty">
                        Faculty:
                        {errors.faculty && (
                          <a style={pStyle}>{errors.faculty.message}</a>
                        )}
                      </label>
                      <select
                        name="faculty"
                        {...register("faculty")}
                        id=""
                        className="form-control"
                      >
                        <option value="">---Select Faculty</option>
                        {faculties.map((faculty) => (
                          <option key={faculty._id} value={faculty._id}>
                            {faculty.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group mb-1">
                      <label htmlFor="description">
                        Description:
                        {errors.description && (
                          <a style={pStyle}>{errors.description.message}</a>
                        )}
                      </label>
                      <textarea
                        name="description"
                        {...register("description")}
                        className="form-control"
                      ></textarea>
                    </div>
                    <div className="form-group mb-1">
                      <label htmlFor="images">Images:</label>
                      <input
                        type="file"
                        name="images"
                        multiple
                        onChange={imageHandler}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group mb-1">
                      <button
                        className="btn"
                        style={{ backgroundColor: "#287094" }}
                      >
                        <i className="bi bi-bag-plus-fill"></i>
                        Add Book
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <AdminFooterComponents />
    </div>
  );
}

export default AddBookComponents;

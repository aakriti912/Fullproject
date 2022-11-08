import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import AdminFooterComponents from "../../layouts/AdminFooterComponents";
import { createAbout } from "../../../../store/reducers/aboutSlice";

const aboutSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
});

function AddAboutComponents() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(aboutSchema),
  });
  let pStyle = {
    color: "#f60000",
  };
  const [images, setImages] = useState([]);

  const imageHandler = (e) => {
    setImages(e.target.files);
  };
  const addAbout = (data) => {
    let sendData = new FormData();
    sendData.append("title", data.title);
    sendData.append("description", data.description);
    Object.values(images).forEach((file) => {
      sendData.append("images", file);
    });
    dispatch(createAbout(sendData)).then((res) => {
      if (res.payload.success) {
        Swal.fire({
          icon: "success",
          title: "About added successfully",
          showConfirmButton: true,
          timer: 1500,
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
                    <i className="bi bi-bag-plus-fill"></i> Add About
                  </h1>
                  <form action="" onSubmit={handleSubmit(addAbout)}>
                    <div className="form-group mb-2">
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

                    <div className="form-group mb-2">
                      <label htmlFor="description">
                        Description:
                        {errors.description && (
                          <a style={pStyle}>{errors.description.message}</a>
                        )}
                      </label>
                      <textarea
                        name="description"
                        {...register("description")}
                        id="editor"
                        className="form-control"
                      ></textarea>
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="images">Images:</label>
                      <input
                        type="file"
                        name="images"
                        multiple
                        onChange={imageHandler}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group mb-2">
                      <button className="btn btn-success">Add About</button>
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

export default AddAboutComponents;

import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import AdminFooterComponents from "../../layouts/AdminFooterComponents";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {addBookImage, getBookImages} from "../../../../store/reducers/bookGallerySlice";
import {useDispatch, useSelector} from "react-redux";
import {createBook} from "../../../../store/reducers/bookSlice";
import Swal from "sweetalert2";

function BookImageGalleryComponents() {
    const dispatch = useDispatch();
    const params = useParams();
    let bookImageData = useSelector((state) => state);
    let bookImages = bookImageData.bookGallery.data;

    const [images, setImages] = useState([]);
    const imageHandler = (e) => {
        setImages(e.target.files);
    }
    const addImage = (e) => {
        e.preventDefault();
        let sendData = new FormData();
        sendData.append('bookId', params.id);
        Object.values(images).forEach(file => {
            sendData.append("images", file);
        });
        dispatch(addBookImage(sendData)).then((res) => {
            if (res.payload.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'books added successfully',
                    showConfirmButton: true,
                    timer: 3000,
                })
                setImages([]);
                dispatch(getBookImages(params.id));
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
        dispatch(getBookImages(params.id));
    }, []);


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
                                        <i className="bi bi-bag-plus-fill"></i> Manage Book Gallery
                                    </h1>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <form action="" onSubmit={addImage}>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="bookImage">Add Image</label>
                                                    <input type="file" onChange={imageHandler} required
                                                           className="form-control" multiple/>
                                                </div>
                                                <div className="form-group">
                                                    <button className="btn btn-success">Upload Image</button>
                                                </div>
                                            </form>
                                            <hr/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {bookImages && bookImages.map((bookImage, index) => (
                                            <div className="col-md-3" key={bookImage._id}>
                                                <div className="card">
                                                    <div className="card-body">
                                                        <img src={bookImage.image} alt="bookImage"
                                                             className="img-fluid"/>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

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

export default BookImageGalleryComponents;
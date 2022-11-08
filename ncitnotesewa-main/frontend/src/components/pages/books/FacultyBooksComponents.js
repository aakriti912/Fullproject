import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import HeaderComponents from "../../layouts/HeaderComponents";
import FooterComponents from "../../layouts/FooterComponents";
import "./Faculty.css";
import {getAllBookByFaculty} from "../../../store/reducers/bookSlice";
import {Link, useNavigate, useParams} from "react-router-dom";
import {orderBook} from "../../../store/reducers/bookOrderSlice";
import Swal from "sweetalert2";

function BookDetailsComponents() {
    const dispatch = useDispatch();
    let books = useSelector((state) => state.books.data);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllBookByFaculty(params.id));

    }, []);

    const orderBookHandle = (bookId, ownerId) => {
        let loginUserId = localStorage.getItem('userId');
        if (loginUserId) {
            let sendData = {
                bookId: bookId,
                ownerId: ownerId,
                userId: loginUserId
            }
            dispatch(orderBook(sendData)).then((response) => {
                if (response.payload.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Order was successfully',
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
        } else {
            navigate(`/login`);
        }
    }


    return (
        <React.Fragment>
            <HeaderComponents/>
            <section className="section-products">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-12">
                            <div className="header">
                                <h2>Faculty Books</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {books.map((book, index) => (
                            <div className="col-md-6 col-lg-4 col-xl-3" key={book._id}>
                                <div id="product-1" className="single-product">
                                    <div className="part-1">
                                        <ul>
                                            <li>
                                                <Link to={`/book-details/${book._id}`}>Details</Link>
                                            </li>
                                            <li>
                                                <button  onClick={() => orderBookHandle(book._id, book.ownerId)}>Order Now</button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="part-2">
                                        <h3 className="product-title">
                                            <Link to={`/book-details/${book._id}`}>{book.title}</Link>
                                        </h3>
                                        <h4 className="product-price">Rs:</h4>
                                        <h4 className="product-price">{book.price}</h4>
                                    </div>
                                </div>
                            </div>
                        ))}


                    </div>
                </div>
            </section>
            <FooterComponents/>
        </React.Fragment>);
}

export default BookDetailsComponents;

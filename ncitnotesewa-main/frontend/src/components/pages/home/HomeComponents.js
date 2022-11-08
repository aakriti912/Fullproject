import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getBooks} from "../../../store/reducers/bookSlice";
import HeaderComponents from "../../layouts/HeaderComponents";
import FooterComponents from "../../layouts/FooterComponents";
import {Link, useNavigate} from "react-router-dom";
import HomeBannerComponents from "../../layouts/HomeBannerComponents";
import {orderBook} from "../../../store/reducers/bookOrderSlice";
import Swal from "sweetalert2";
import HomeBlogListComponents from "./HomeBlogListComponents";

function HomeComponents() {
    const dispatch = useDispatch();
    const booksData = useSelector((state) => state);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getBooks());
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
        <HeaderComponents />
        <HomeBannerComponents />
        <section className="container pt-md-3 pb-5 mb-md-3">
          <h2 className="h3 text-center">Trending Books</h2>
          <div className="row pt-4 mx-n2">
            {booksData.books.data.map((book) => (
              <div
                key={book._id}
                className="col-lg-3 col-md-4 col-sm-6 px-2 mb-4"
              >
                <div className="card product-card">
                  <button
                    className="btn-wishlist btn-sm"
                    type="button"
                    data-bs-toggle="tooltip"
                    data-bs-placement="left"
                    title="Add to wishlist"
                  >
                    <i className="ci-heart" />
                  </button>
                  <Link
                    to={`/book-details/${book._id}`}
                    className="card-img-top d-block overflow-hidden"
                  >
                    <img src={book.image} height="300" alt="Product" />
                  </Link>
                  <div className="card-body py-2">
                    <h3 className="product-title fs-sm">
                      <Link to={`/book-details/${book._id}`}>{book.title}</Link>
                    </h3>
                    <div className="d-flex justify-content-between">
                      <div className="product-price">
                        <span className="text-accent">Rs. {book.price}</span>
                      </div>
                      <div className="star-rating">
                        <i className="star-rating-icon ci-star-filled active" />
                        <i className="star-rating-icon ci-star-filled active" />
                        <i className="star-rating-icon ci-star-filled active" />
                        <i className="star-rating-icon ci-star-half active" />
                        <i className="star-rating-icon ci-star" />
                      </div>
                    </div>
                  </div>
                  <div className="card-body card-body-hidden">
                    <button
                      className="btn btn-primary btn-sm d-block w-100 mb-2"
                      onClick={() => orderBookHandle(book._id, book.ownerId)}
                      type="button"
                      style={{ backgroundColor: "#287094" }}
                    >
                      <i className="ci-cart fs-sm me-1" />
                      Order Now
                    </button>
                    <div className="text-center">
                      <Link
                        to={`/book-details/${book._id}`}
                        className="nav-link-style fs-ms"
                      >
                        <i className="ci-eye align-middle me-1" />
                        Quick view
                      </Link>
                    </div>
                  </div>
                </div>
                <hr className="d-sm-none" />
              </div>
            ))}
          </div>
          <div className="text-center pt-3">
            <Link to="/" className="btn btn-outline-accent">
              More Books
              <i className="ci-arrow-right ms-1" />
            </Link>
          </div>
        </section>
        <HomeBlogListComponents />
        <FooterComponents />
      </React.Fragment>
    );
}

export default HomeComponents;


import React, {useEffect} from "react";
import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import AdminFooterComponents from "../../layouts/AdminFooterComponents";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {deleteBook, getBookByLoginUser} from "../../../../store/reducers/bookSlice";

function ShowBookComponents() {
    const dispatch = useDispatch();
    let booksData = useSelector((state) => state)
    let books = booksData.books.data;
    const authUserId = localStorage.getItem("userId");
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getBookByLoginUser(authUserId))
    }, []);
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Do you want to delete?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteBook(id));
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    };

    const gotoGallery = (id) => {
        navigate(`/book-gallery/${id}`);
    }


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
                                        <i className="bi bi-bag-plus-fill"></i> Books List

                                    </h1>
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>S.n</th>
                                            <th>Title</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Faculty</th>
                                            <th>Image</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {books && books.map((book, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{book.title}</td>
                                                <td>{book.price}</td>
                                                <td>{book.quantity}</td>
                                                <td>
                                                    {book.faculty}
                                                </td>
                                                <td>
                                                    <img src={book.image} width="40" alt=""/>
                                                    <hr/>
                                                    <button onClick={() => gotoGallery(book._id)}>Goto Gallery</button>
                                                </td>
                                                <td>
                                                    <button className="btn btn-primary"
                                                            onClick={() => navigate(`/update-book/${book._id}`)}
                                                            title="Update Book">
                                                        <i className="bi bi-pencil-square"></i>
                                                    </button>
                                                    <button title="Delete Book"
                                                            onClick={() => handleDelete(book._id)}
                                                            className="btn btn-danger">
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
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

export default ShowBookComponents;
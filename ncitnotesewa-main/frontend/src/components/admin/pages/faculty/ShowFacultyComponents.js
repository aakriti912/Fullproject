import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import AdminFooterComponents from "../../layouts/AdminFooterComponents";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import Swal from "sweetalert2";
import {Link, useNavigate} from "react-router-dom";
import {deleteFaculty, getFaculty, updateStatus} from "../../../../store/reducers/facultySlice";

function ShowFacultyComponents() {
    let dispatch = useDispatch();
    const navigate = useNavigate();
    const facultyData = useSelector((store) => store);


    useEffect(() => {
        dispatch(getFaculty());
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
                dispatch(deleteFaculty(id)).then((res) => {
                    Swal.fire({
                            icon: 'warning',
                            title: res.payload.error,

                        }
                    )

                }).finally(() => {
                    dispatch(getFaculty());
                });
            }
        })
    };

    const handleEdit = (id) => {
        navigate(`/update-faculty/${id}`);
    }

    const updateFacultyStatus = (id) => {
        let sendData = {
            id: id
        }
        dispatch(updateStatus(sendData)).then((res) => {
            if (res.payload.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Faculty status updated successfully',
                    showConfirmButton: true,
                    timer: 2500,
                    footer: '<a href="/show-faculty">Click here to show faculty</a>'
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            }
        }).finally(() => {
            dispatch(getFaculty());
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
                                        <i className="bi bi-bag-plus-fill"></i> Show Faculty
                                        <Link to="/add-faculty" className="btn btn-primary float-end">
                                            <i className="bi bi-bag-plus-fill"></i> Add Faculty</Link>
                                    </h1>
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Status</th>
                                            <th>Total Books</th>
                                            <th>Created At</th>
                                            <th>Updated At</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {facultyData && facultyData.faculty.data.map((faculty, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{++index}</td>
                                                    <td>{faculty.name}</td>
                                                    <td>
                                                        {faculty.status === 'active' ?
                                                            <button onClick={() => updateFacultyStatus(faculty._id)}
                                                                    className="btn btn-success">Active</button> :
                                                            <button onClick={() => updateFacultyStatus(faculty._id)}
                                                                    className="btn btn-warning">Inactive</button>
                                                        }
                                                    </td>
                                                    <td>
                                                        {faculty.totalBooks}
                                                    </td>
                                                    <td>{faculty.createdAt}</td>
                                                    <td>{faculty.updatedAt}</td>
                                                    <td>
                                                        <button
                                                            onClick={() => handleEdit(faculty._id)}
                                                            className="btn btn-primary">
                                                            <i className="bi bi-pencil-square"></i>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(faculty._id)}
                                                            className="btn btn-danger">
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>);
                                        })}
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

export default ShowFacultyComponents
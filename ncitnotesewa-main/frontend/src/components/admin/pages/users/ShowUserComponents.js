import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import AdminFooterComponents from "../../layouts/AdminFooterComponents";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import Swal from "sweetalert2";
import {Link, useNavigate} from "react-router-dom";
import {getUsers, deleteUser} from "../../../../store/reducers/usersSlice";

function ShowUserComponents() {
    let dispatch = useDispatch();
    const navigate = useNavigate();
    const usersData = useSelector((store) => store);

    useEffect(() => {
        dispatch(getUsers());
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
                dispatch(deleteUser(id));
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    };


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
                                        <i className="bi bi-bag-plus-fill"></i> Show Users
                                    </h1>
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Gender</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Images</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {usersData && usersData.user.data.map((user, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{++index}</td>
                                                    <td>{user.name}</td>
                                                    <td>{user.gender}</td>
                                                    <td>{user.email}</td>
                                                    <td>
                                                        {user.role === 'admin' ?
                                                            <button className="btn btn-primary">Admin</button> :
                                                            <button className="btn btn-warning">User</button>}

                                                    </td>
                                                    <td>
                                                        <img src={user.image} width="40" alt=""/>
                                                    </td>
                                                    <td>
                                                        <button
                                                            onClick={() => handleDelete(user._id)}
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

export default ShowUserComponents
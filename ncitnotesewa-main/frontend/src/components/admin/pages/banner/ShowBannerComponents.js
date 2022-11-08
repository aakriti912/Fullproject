import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import AdminFooterComponents from "../../layouts/AdminFooterComponents";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {deleteBanner, getBanner} from "../../../../store/reducers/bannerSlice";
import Swal from "sweetalert2";
import {Link, useNavigate} from "react-router-dom";

function ShowBannerComponents() {
    let dispatch = useDispatch();
    const navigate = useNavigate();
    const bannerData = useSelector((state) => state);

    useEffect(() => {
        dispatch(getBanner());
    }, [dispatch]);


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
                dispatch(deleteBanner(id));
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    };

    const updateBannerData = (id) => {
        navigate(`/update-banner/${id}`);
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
                                        <i className="bi bi-bag-plus-fill"></i> Show Banner
                                    </h1>
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Title</th>
                                            <th>Sub Title</th>
                                            <th>Description</th>
                                            <th>Images</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {bannerData && bannerData.banner.data.map((banner, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{++index}</td>
                                                    <td>{banner.title}</td>
                                                    <td>{banner.subtitle}</td>
                                                    <td>{banner.description}</td>
                                                    <td>
                                                        <img src={banner.image} width="40" alt=""/>
                                                    </td>
                                                    <td>
                                                        <button onClick={() => updateBannerData(banner._id)}
                                                                className="btn btn-success">Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(banner._id)}
                                                            className="btn btn-danger">Delete
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

export default ShowBannerComponents
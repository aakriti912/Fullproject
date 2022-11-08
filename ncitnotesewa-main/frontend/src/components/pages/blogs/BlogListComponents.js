import React, {useEffect, useState} from "react";
import HeaderComponents from "../../layouts/HeaderComponents";
import FooterComponents from "../../layouts/FooterComponents";
import {Link} from "react-router-dom";
import api from "../../../config/api";

function BlogListComponents() {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        api.get(`/blogs/`).then((response) => {
            setBlogs(response.data.blogs);
        });
    }, []);


    return (
        <React.Fragment>
            <HeaderComponents/>
            <section className="container mt-5 pt-md-3 pb-5 mb-md-3">
                <h2 className="h3 text-left">Blog List</h2>
                <div className="row pt-4 mx-n2">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="col-lg-3 col-md-4 col-sm-6 px-2 mb-4">
                            <div className="card product-card">
                                <button className="btn-wishlist btn-sm" type="button" data-bs-toggle="tooltip"
                                        data-bs-placement="left" title="Add to wishlist"><i className="ci-heart"/>
                                </button>
                                <Link to={`/blog-details/${blog._id}`} className="card-img-top d-block overflow-hidden">
                                    <img src={blog.image} height="300" alt="Product"/></Link>
                                <div className="card-body py-2">
                                    <h3 className="product-title fs-sm">
                                        <Link to={`/blog-details/${blog._id}`} >{blog.title}</Link></h3>
                                </div>
                                <div className="card-body card-body-hidden">
                                    <div className="text-center">
                                        <Link to={`/blog-details/${blog._id}`} className="nav-link-style fs-ms">
                                            <i className="ci-eye align-middle me-1"/>
                                            Quick view</Link></div>
                                </div>
                            </div>
                            <hr className="d-sm-none"/>
                        </div>
                    ))}


                </div>

            </section>
            <FooterComponents/>
        </React.Fragment>);
}

export default BlogListComponents;

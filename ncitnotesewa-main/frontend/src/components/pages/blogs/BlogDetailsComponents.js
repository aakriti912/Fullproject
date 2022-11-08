import React, {useEffect, useState} from "react";
import HeaderComponents from "../../layouts/HeaderComponents";
import FooterComponents from "../../layouts/FooterComponents";
import {Link, useParams} from "react-router-dom";
import api from "../../../config/api";

function BlogDetailsComponents() {

    const [blogs, setBlogs] = useState([]);
    const params = useParams();


    useEffect(() => {
        api.get(`/blogs/${params.id}`).then((response) => {
            setBlogs(response.data.blogs);
        });
    }, []);
    
    return (
        <React.Fragment>
            <HeaderComponents/>
            <section className="container mt-5 pt-md-3 pb-5 mb-md-3">
                <h2 className="h3 text-left">Blog Details</h2>
                <div className="row pt-4 mx-n2">
                    <h1>{blogs.title}</h1>
                    <img src={blogs.image} className="img-fluid" alt=""/>
                    <p>
                        {blogs.description}
                    </p>
                </div>
            </section>
            <FooterComponents/>
        </React.Fragment>);
}

export default BlogDetailsComponents;

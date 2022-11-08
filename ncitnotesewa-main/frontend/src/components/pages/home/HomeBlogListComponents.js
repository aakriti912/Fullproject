import React, { useEffect, useState } from "react";
import api from "../../../config/api";
import { Link } from "react-router-dom";

function HomeBlogListComponents() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    api.get(`/blogs/`).then((response) => {
      setBlogs(response.data.blogs);
    });
  }, []);

  return (
    <React.Fragment>
      <section className="container pt-md-3 pb-5 mb-md-3">
        <div className="row">
          <h1>Blogs</h1>
        </div>
        <div className="row">
          {blogs.map((blog) => (
            <div className="card" key={blog._id} style={{ width: "18rem" }}>
              <img
                src={blog.image}
                height="200"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/blog-details/${blog._id}`}> {blog.title}</Link>
                </h5>
                <p className="card-text">{blog.description}</p>
                <Link
                  to={`/blog-details/${blog._id}`}
                  className="btn btn-primary"
                  style={{ backgroundColor: "#287094" }}
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </React.Fragment>
  );
}

export default HomeBlogListComponents;

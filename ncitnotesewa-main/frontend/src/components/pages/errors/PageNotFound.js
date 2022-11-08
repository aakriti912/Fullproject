import React from "react";
import HeaderComponents from "../../layouts/HeaderComponents";
import FooterComponents from "../../layouts/FooterComponents";
import {Link} from "react-router-dom";

function PageNotFound() {
    return (
        <React.Fragment>
            <HeaderComponents/>
            <div className="container py-5 mb-lg-3">
                <div className="row justify-content-center pt-lg-4 text-center">
                    <div className="col-lg-5 col-md-7 col-sm-9">
                        <h1 className="display-404 py-lg-3">404</h1>
                        <h2 className="h3 mb-4">We can't seem to find the page you are looking for.</h2>
                        <p className="fs-md mb-4">
                            <u>Here are some helpful links instead:</u>
                        </p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-xl-3 col-lg-3">
                        <Link to="/" className="btn btn-success btn-block mb-3">Go To Home Page</Link>
                    </div>
                </div>
            </div>
            <FooterComponents/>
        </React.Fragment>
    );
}

export default PageNotFound;
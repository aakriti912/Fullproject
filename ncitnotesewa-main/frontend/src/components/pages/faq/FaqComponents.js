import React from "react";
import HeaderComponents from "../../layouts/HeaderComponents";
import FooterComponents from "../../layouts/FooterComponents";

function AboutUsComponents() {
    return (
        <React.Fragment>
            <HeaderComponents/>
            <div className="container mb-5 mt-5">
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <h1 className="card-title-dp">Faq</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">

                    </div>

                </div>
            </div>
            <FooterComponents/>
        </React.Fragment>
    );
}

export default AboutUsComponents;
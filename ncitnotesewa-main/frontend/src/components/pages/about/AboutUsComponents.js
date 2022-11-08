import React, {useEffect} from "react";
import HeaderComponents from "../../layouts/HeaderComponents";
import FooterComponents from "../../layouts/FooterComponents";
import {useDispatch, useSelector} from "react-redux";
import {getAbout} from "../../../store/reducers/aboutSlice";

function AboutUsComponents() {
    let aboutResponse = useSelector(state => state);
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAbout());
    }, []);
    return (
        <React.Fragment>
            <HeaderComponents/>
            <div className="container mb-5 mt-5">
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <h1 className="card-title-dp">About Us</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            {aboutResponse.about.data.map((item, index) => (
                                <div className="card" key={item._id} style={{width: '18rem'}}>
                                    <img className="card-img-top" src={item.image} alt="Card image cap"/>
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className="card-text">
                                            {item.description}
                                        </p>
                                        <a href="#" className="btn btn-primary">Go somewhere</a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
            <FooterComponents/>
        </React.Fragment>
    );
}

export default AboutUsComponents;
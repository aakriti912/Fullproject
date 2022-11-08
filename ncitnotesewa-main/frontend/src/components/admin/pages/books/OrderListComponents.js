import React, {useEffect} from "react";
import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import AdminFooterComponents from "../../layouts/AdminFooterComponents";
import {useDispatch, useSelector} from "react-redux";
import {getBookOrderListByLoginUser} from "../../../../store/reducers/bookOrderSlice";
import api from "../../../../config/api";

function OrderListComponents() {
    let dispatch = useDispatch();
    let userId = localStorage.getItem("userId");
    let orderData = useSelector((state) => state.bookOrder.data);


    const orderUpdateStatus = (id, status) => {
        let sendData = {
            orderId: id,
            status: status
        }
        api.post("/books/update-order-status", sendData).then((res) => {
            dispatch(getBookOrderListByLoginUser(userId));
        }).catch((err) => {
            console.log(err);
        });

    }


    useEffect(() => {
        dispatch(getBookOrderListByLoginUser(userId));

    }, []);

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
                                        <i className="bi bi-bag-plus-fill"></i> Order List
                                    </h1>
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>S.n</th>
                                            <th>Book Name</th>
                                            <th>Order By</th>
                                            <th>Quantity</th>
                                            <th>Order Data</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {orderData.map((order, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{order.book}</td>
                                                    <td>{order.user}</td>
                                                    <td>{order.quantity}</td>
                                                    <td>{order.createdAt}</td>
                                                    <td>{order.status}</td>
                                                    <td>
                                                        {order.userId === localStorage.getItem('userId') ? (
                                                            <React.Fragment>
                                                                <button
                                                                    type="cancel"
                                                                    onClick={() => orderUpdateStatus(order._id, 'cancel')}
                                                                    className="btn btn-danger">Cancel
                                                                </button>
                                                            </React.Fragment>
                                                        ) : (
                                                            <React.Fragment>
                                                                <button
                                                                    onClick={() => orderUpdateStatus(order._id, 'accepted')}
                                                                    className="btn btn-primary">Accept
                                                                </button>
                                                                <button
                                                                    onClick={() => orderUpdateStatus(order._id, 'rejected')}
                                                                    className="btn btn-danger">Reject
                                                                </button>
                                                            </React.Fragment>
                                                        )}

                                                    </td>
                                                </tr>
                                            );
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

export default OrderListComponents;
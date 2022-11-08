import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import Swal from "sweetalert2";

import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import AdminFooterComponents from "../../layouts/AdminFooterComponents";
import api from "../../../../config/api";


function ContactListComponents() {
    const [contacts, setContacts] = useState([]);

    let getContact = () => {
        api.get("/contact")
            .then((response) => {
                setContacts(response.data.contact);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const deleteContact = (id) => {
        api.delete("/contact/" + id)
            .then((response) => {
                getContact();
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getContact();
    });


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
                                        <i className="bi bi-pencil-square"></i> Contact List
                                        <Link to="/dashboard" className="btn btn-primary float-end">
                                            <i className="bi bi-arrow-right-square-fill"></i> Goto Dashboard
                                        </Link>
                                    </h1>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Message</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {contacts.map((contact, index) => (
                                                    <tr key={++index}>
                                                        <td>{++index}</td>
                                                        <td>{contact.name}</td>
                                                        <td>{contact.email}</td>
                                                        <td>{contact.phone}</td>
                                                        <td>{contact.message}</td>
                                                        <td>
                                                            <button onClick={() => deleteContact(contact._id)}
                                                                    className="btn btn-danger btn-sm">Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </main>
            <AdminFooterComponents/>
        </div>

    );
}

export default ContactListComponents;

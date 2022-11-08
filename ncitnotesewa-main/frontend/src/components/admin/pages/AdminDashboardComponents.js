import AdminHeaderComponents from "../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../layouts/AdminAsideComponents";
import AdminFooterComponents from "../layouts/AdminFooterComponents";

function AdminDashboardComponents() {
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
                                    <h1>Dashboard Section</h1>
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

export default AdminDashboardComponents;
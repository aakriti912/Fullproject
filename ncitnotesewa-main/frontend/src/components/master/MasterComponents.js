import React from "react";
import RouterComponents from "../routers/RouterComponents";

function MasterComponents() {
    return (
        <React.Fragment>
            <RouterComponents/>
        </React.Fragment>
    )
}

window.loginUserId = localStorage.getItem("userId");

export default MasterComponents;

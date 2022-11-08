function LogoutComponents() {

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        window.location.href = "/";
    }

    let logoutBtnStyle = {
        background: "red",
        color: "white",
        minWidth: "100px",
        border:"1px solid red",
        borderRadius:"2px",
    }

    return (
        <div>
            <button onClick={logout} style={logoutBtnStyle}>Logout</button>
        </div>
    )

}

export default LogoutComponents;

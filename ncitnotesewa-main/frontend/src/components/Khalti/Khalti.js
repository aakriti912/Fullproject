import React from "react";
import KhaltiCheckout from "khalti-checkout-web";
import config from "./KhaltiConfig";

// import BookDetailsComponents from "../pages/books/BooksDetailsComponents";

export default function Khalti() {
  let checkout = new KhaltiCheckout(config);

  let buttonStyles = {
    backgroundColor: "purple",
    padding: "10px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    border: "1px solid white",
  };
  return (
    <div style={{ textAlign: "center", padding: "10px" }}>
      {/* <button
        onClick={() => checkout.show({ amount: 10000 })}
        style={buttonStyles}
      >
        Pay Via Khalti
      </button> */}
      <button
        type="button"
        class="btn btn-success"
        style={{ textAlign: "center" }}
        onClick={() => checkout.show({ amount: 20000 })}
      >
        Pay Via Khalti
      </button>
    </div>
  );
}

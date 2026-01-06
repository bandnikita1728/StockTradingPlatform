import React from "react";
import { Link } from "react-router-dom";

function OpenAccount() {
  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <h1 className="mt-5">Open a free trading account</h1>
        <p className="text-muted">
          Modern platforms and apps, ₹0 delivery investments, and flat ₹20 intraday and F&amp;O trades.
        </p>
        <div>
          <Link to="/signup" className="btn btn-primary btn-lg px-5 mb-5">
            Sign up free
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OpenAccount;
// open account updated

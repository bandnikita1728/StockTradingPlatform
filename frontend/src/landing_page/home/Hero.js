import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container py-4">
      <div className="row text-center align-items-center">
        <h1 className="mb-3" style={{ fontSize: "2.5rem", fontWeight: "700" }}>Invest in everything</h1>
        <p className="mb-4 text-muted fs-5">
          Online platform to invest in stocks, derivatives, mutual funds, and more
        </p>
        <div className="mb-4">
          <Link to="/signup" className="btn btn-primary btn-lg px-5">
            Signup Now
          </Link>
        </div>
        <div>
          <img
            src="/homeHero.png"
            alt="StockTradingPlatform by Nikita"
            className="img-fluid"
            style={{ maxHeight: "500px", objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;

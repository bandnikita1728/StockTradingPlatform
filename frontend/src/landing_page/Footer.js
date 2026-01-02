import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={{ backgroundColor: "rgb(250,250,250)" }}>
      <div className="container border-top mt-5">
        <div className="row mt-5">
          <div className="col-3">
            <img src="/logo.svg" style={{ width: "60%" }} alt="Logo" />
            <p className="mt-3 text-muted small">
              &copy; 2024–2026 StockTradingPlatform by Nikita Band. All rights reserved.
            </p>
            <p className="text-muted small">
              Built by <strong>Nikita Band</strong>, IIITDM Jabalpur
            </p>
          </div>
          <div className="col-2">
            <p className="fw-semibold">Company</p>
            <Link to="/about" style={{ textDecoration:"none", color:"#555", display:"block", lineHeight:"2.2", fontSize:"14px" }}>About</Link>
            <Link to="/product" style={{ textDecoration:"none", color:"#555", display:"block", lineHeight:"2.2", fontSize:"14px" }}>Products</Link>
            <Link to="/pricing" style={{ textDecoration:"none", color:"#555", display:"block", lineHeight:"2.2", fontSize:"14px" }}>Pricing</Link>
            <Link to="/support" style={{ textDecoration:"none", color:"#555", display:"block", lineHeight:"2.2", fontSize:"14px" }}>Careers</Link>
          </div>
          <div className="col-2">
            <p className="fw-semibold">Support</p>
            <Link to="/support" style={{ textDecoration:"none", color:"#555", display:"block", lineHeight:"2.2", fontSize:"14px" }}>Contact</Link>
            <Link to="/support" style={{ textDecoration:"none", color:"#555", display:"block", lineHeight:"2.2", fontSize:"14px" }}>Support portal</Link>
            <a href="#" style={{ textDecoration:"none", color:"#555", display:"block", lineHeight:"2.2", fontSize:"14px" }}>Blog</a>
            <a href="#" style={{ textDecoration:"none", color:"#555", display:"block", lineHeight:"2.2", fontSize:"14px" }}>Downloads</a>
          </div>
          <div className="col-2">
            <p className="fw-semibold">Account</p>
            <Link to="/signup" style={{ textDecoration:"none", color:"#555", display:"block", lineHeight:"2.2", fontSize:"14px" }}>Open an account</Link>
            <Link to="/login" style={{ textDecoration:"none", color:"#555", display:"block", lineHeight:"2.2", fontSize:"14px" }}>Login</Link>
            <a href="#" style={{ textDecoration:"none", color:"#555", display:"block", lineHeight:"2.2", fontSize:"14px" }}>Fund transfer</a>
          </div>
          <div className="col-3">
            <p className="fw-semibold">Legal</p>
            <p className="text-muted small">
              Investments in securities market are subject to market risks. Read all related documents carefully before investing.
            </p>
            <p className="text-muted small">
              This is a demo project for educational purposes — IIITDM Jabalpur.
            </p>
          </div>
        </div>
        <div className="mt-4 pb-4 border-top pt-3 text-center text-muted small">
          StockTradingPlatform &middot; Built by Nikita Band &middot; IIITDM Jabalpur &middot; June 2026
        </div>
      </div>
    </footer>
  );
}

export default Footer;

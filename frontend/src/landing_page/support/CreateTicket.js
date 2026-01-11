import React from "react";

const categories = [
  {
    icon: "fa-user-plus",
    title: "Account Opening",
    links: ["Online Account Opening", "Offline Account Opening", "NRI Account Opening", "Company / HUF Account", "Getting Started", "KYC & Documents"],
  },
  {
    icon: "fa-chart-line",
    title: "Trading & Orders",
    links: ["Place an Order", "Order Types (Limit / Market / SL)", "Intraday Trading", "F&O Orders", "Order Rejection Issues", "GTT Orders"],
  },
  {
    icon: "fa-wallet",
    title: "Payments & Funds",
    links: ["Add Funds via UPI", "Bank Transfer (NEFT/RTGS)", "Withdraw Funds", "Fund Transfer Delays", "Payment Failures", "Charges & Taxes"],
  },
  {
    icon: "fa-briefcase",
    title: "Portfolio & Holdings",
    links: ["View Holdings", "Holdings Not Reflecting", "Sell Holdings", "Demat Statement", "Corporate Actions", "Dividend Credits"],
  },
  {
    icon: "fa-shield-alt",
    title: "Account & Security",
    links: ["Reset Password", "Two-Factor Authentication", "Update Mobile / Email", "Account Freeze / Block", "Login Issues", "Profile Update"],
  },
  {
    icon: "fa-headset",
    title: "General Support",
    links: ["Contact Support Team", "Report a Bug", "Feature Request", "Platform Feedback", "Regulatory Queries", "Investor Education"],
  },
];

function CreateTicket() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 mb-5">
        <h1 className="fs-2 mb-4">To create a ticket, select a relevant topic</h1>
        {categories.map((cat) => (
          <div key={cat.title} className="col-4 p-4 mt-2 mb-2">
            <h5>
              <i className={`fas ${cat.icon} me-2`} aria-hidden="true" style={{ color: "#387ed1" }}></i>
              {cat.title}
            </h5>
            {cat.links.map((link) => (
              <React.Fragment key={link}>
                <a href="#" style={{ textDecoration: "none", lineHeight: "2.5", fontSize: "14px", color: "#555" }}>
                  {link}
                </a>
                <br />
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateTicket;

import React from "react";

import Menu from "./Menu";

const TopBar = () => {
  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">24,141.95</p>
          <p className="percent" style={{ color: "green" }}>+0.62%</p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">79,408.50</p>
          <p className="percent" style={{ color: "green" }}>+0.58%</p>
        </div>
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;

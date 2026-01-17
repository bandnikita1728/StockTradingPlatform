import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LANDING_URL = process.env.REACT_APP_LANDING_URL || "http://localhost:3000";

const navItems = [
  { label: "Dashboard", path: "/", idx: 0 },
  { label: "Orders", path: "/orders", idx: 1 },
  { label: "Holdings", path: "/holdings", idx: 2 },
  { label: "Positions", path: "/positions", idx: 3 },
  { label: "Funds", path: "/funds", idx: 4 },
  { label: "Apps", path: "/apps", idx: 5 },
];

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user"));
      if (u?.name) setUserName(u.name);
    } catch (_) {}
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = LANDING_URL;
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" alt="logo" style={{ width: "50px", flexShrink: 0 }} />
      <div className="menus">
        <ul>
          {navItems.map(({ label, path, idx }) => (
            <li key={idx}>
              <Link style={{ textDecoration: "none" }} to={path} onClick={() => setSelectedMenu(idx)}>
                <p className={selectedMenu === idx ? activeMenuClass : menuClass}>{label}</p>
              </Link>
            </li>
          ))}
        </ul>
        <div className="user-section">
          <div className="avatar">{userName.charAt(0).toUpperCase()}</div>
          <span className="username-label">{userName}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
// menu complete

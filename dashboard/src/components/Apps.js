import React from "react";

const apps = [
  { name: "Kite", icon: "📈", description: "Ultra-fast flagship trading platform with streaming market data, advanced charts, and elegant UI.", color: "#387ed1", url: "https://kite.zerodha.com" },
  { name: "Coin", icon: "🪙", description: "Buy direct mutual funds online, commission-free, delivered directly to your Demat account.", color: "#f0821c", url: "https://coin.zerodha.com" },
  { name: "Varsity", icon: "📚", description: "Free, in-depth stock market lessons with beautiful illustrations. Learn at your own pace.", color: "#2fa82e", url: "https://varsity.zerodha.com" },
  { name: "Console", icon: "🖥️", description: "Central dashboard for your Zerodha account. In-depth reports and visualisations of your trades.", color: "#6c6c6c", url: "https://console.zerodha.com" },
  { name: "Nudge", icon: "🔔", description: "Behavioural nudges that help you become a better investor and avoid common trading mistakes.", color: "#9c27b0", url: "https://zerodha.com/nudge" },
  { name: "Sentinel", icon: "🛡️", description: "Create market alerts for any instrument on any condition. Get notified via SMS, email, or app.", color: "#e53935", url: "https://sentinel.zerodha.com" },
];

const Apps = () => (
  <div style={{ padding: "24px" }}>
    <h3 className="title">Apps</h3>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px", marginTop: "16px" }}>
      {apps.map((app) => (
        <div key={app.name} style={{ border: "1px solid #e0e0e0", borderRadius: "10px", padding: "24px", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.07)", display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "2rem" }}>{app.icon}</span>
            <span style={{ fontSize: "1.1rem", fontWeight: "600", color: app.color }}>{app.name}</span>
          </div>
          <p style={{ fontSize: "13px", color: "#555", margin: 0, lineHeight: "1.5" }}>{app.description}</p>
          <a href={app.url} target="_blank" rel="noreferrer" style={{ marginTop: "auto", display: "inline-block", padding: "6px 18px", background: app.color, color: "#fff", borderRadius: "4px", textDecoration: "none", fontSize: "13px", fontWeight: "500", width: "fit-content" }}>
            Visit →
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default Apps;

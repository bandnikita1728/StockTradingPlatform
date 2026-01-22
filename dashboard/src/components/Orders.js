import React, { useState, useEffect } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:3002";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/allOrders`)
      .then((res) => setOrders(res.data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="orders"><p style={{ padding: "20px", color: "#888" }}>Loading orders…</p></div>;

  if (orders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders yet</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "16px" }}>
      <h3 className="title">Orders ({orders.length})</h3>
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Mode</th>
              <th>Option</th>
              <th>Qty</th>
              <th>Price (₹)</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i}>
                <td>{order.name}</td>
                <td style={{ color: order.mode === "BUY" ? "#2e7d32" : "#c62828", fontWeight: "600" }}>{order.mode}</td>
                <td style={{ color: "#888", fontSize: "12px" }}>{order.option || "MIS"}</td>
                <td>{order.qty}</td>
                <td>{Number(order.price).toFixed(2)}</td>
                <td style={{ color: "#2e7d32", fontSize: "12px", fontWeight: "500" }}>{order.status || "COMPLETE"}</td>
                <td style={{ fontSize: "12px", color: "#888" }}>
                  {order.date ? new Date(order.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "28 Jun 2026"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
// crud

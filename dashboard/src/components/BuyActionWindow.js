import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const API = process.env.REACT_APP_API_URL || "http://localhost:3002";

const OrderActionWindow = ({ uid, mode = "BUY" }) => {
  const generalContext = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [orderOption, setOrderOption] = useState("MIS");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const isBuy = mode === "BUY";

  const closeWindow = () => {
    if (isBuy) generalContext.closeBuyWindow();
    else generalContext.closeSellWindow();
  };

  const handleOrderClick = async () => {
    if (!stockPrice || Number(stockPrice) <= 0) {
      setStatus({ type: "error", msg: "Please enter a valid price." });
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      await axios.post(`${API}/newOrder`, {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode,
        option: orderOption,
      });
      const verb = isBuy ? "Bought" : "Sold";
      setStatus({ type: "success", msg: `✓ ${verb} ${stockQuantity} × ${uid} @ ₹${stockPrice}` });
      setTimeout(closeWindow, 1500);
    } catch (e) {
      setStatus({ type: "error", msg: e.response?.data?.error || "Order failed. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        {status && (
          <div style={{ padding: "6px 10px", marginBottom: "8px", borderRadius: "4px", fontSize: "13px", background: status.type === "success" ? "#e8f5e9" : "#ffebee", color: status.type === "success" ? "#2e7d32" : "#c62828" }}>
            {status.msg}
          </div>
        )}
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input type="number" name="qty" id="qty" min="1" onChange={(e) => setStockQuantity(e.target.value)} value={stockQuantity} />
          </fieldset>
          <fieldset>
            <legend>Price (₹)</legend>
            <input type="number" name="price" id="price" step="0.05" min="0.05" onChange={(e) => setStockPrice(e.target.value)} value={stockPrice} />
          </fieldset>
          <fieldset>
            <legend>Option</legend>
            <select value={orderOption} onChange={(e) => setOrderOption(e.target.value)} style={{ border: "none", fontSize: "0.85rem", padding: "2px 4px", cursor: "pointer" }}>
              <option value="MIS">MIS</option>
              <option value="CNC">CNC</option>
              <option value="NRML">NRML</option>
            </select>
          </fieldset>
        </div>
      </div>
      <div className="buttons">
        <span>Stock: <strong>{uid}</strong></span>
        <div>
          <button
            className="btn"
            onClick={handleOrderClick}
            disabled={loading}
            style={{ cursor: "pointer", border: "none", background: isBuy ? "#4184f3" : "#e53935", color: "#fff" }}
          >
            {loading ? "…" : isBuy ? "Buy" : "Sell"}
          </button>
          <button
            className="btn"
            onClick={closeWindow}
            style={{ cursor: "pointer", border: "none", background: "#9e9e9e", color: "#fff" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderActionWindow;
// sell modal
// cancel fixed

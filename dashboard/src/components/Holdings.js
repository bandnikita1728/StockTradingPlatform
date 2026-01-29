import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const API = process.env.REACT_APP_API_URL || "http://localhost:3002";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [toast, setToast] = useState(null);
  const [sellModal, setSellModal] = useState(null); // { name, price, maxQty }
  const [sellQty, setSellQty] = useState(1);
  const [sellLoading, setSellLoading] = useState(false);

  const fetchHoldings = () => {
    axios.get(`${API}/allHoldings`).then((res) => setAllHoldings(res.data));
  };

  useEffect(() => { fetchHoldings(); }, []);

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSell = async () => {
    if (!sellModal) return;
    setSellLoading(true);
    try {
      await axios.post(`${API}/newOrder`, {
        name: sellModal.name,
        qty: Number(sellQty),
        price: sellModal.price,
        mode: "SELL",
      });
      showToast("success", `✓ Sold ${sellQty} × ${sellModal.name} @ ₹${sellModal.price}`);
      setSellModal(null);
      fetchHoldings();
    } catch (e) {
      showToast("error", e.response?.data?.error || "Sell failed. Try again.");
    } finally {
      setSellLoading(false);
    }
  };

  const labels = allHoldings.map((s) => s.name);
  const data = {
    labels,
    datasets: [{ label: "Stock Price", data: allHoldings.map((s) => s.price), backgroundColor: "rgba(255, 99, 132, 0.5)" }],
  };

  return (
    <>
      {toast && (
        <div style={{ position: "fixed", top: 16, right: 16, zIndex: 9999, padding: "10px 20px", borderRadius: "6px", fontSize: "14px", fontWeight: "500", background: toast.type === "success" ? "#e8f5e9" : "#ffebee", color: toast.type === "success" ? "#2e7d32" : "#c62828", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
          {toast.msg}
        </div>
      )}

      {sellModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: "10px", padding: "28px", minWidth: "300px", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
            <h5 style={{ marginBottom: "16px" }}>Sell {sellModal.name}</h5>
            <p style={{ fontSize: "13px", color: "#555" }}>LTP: ₹{sellModal.price.toFixed(2)} &nbsp;|&nbsp; Max: {sellModal.maxQty}</p>
            <label style={{ fontSize: "13px", fontWeight: "500" }}>Quantity</label>
            <input type="number" min="1" max={sellModal.maxQty} value={sellQty} onChange={(e) => setSellQty(e.target.value)} style={{ display: "block", width: "100%", padding: "8px 10px", margin: "6px 0 16px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }} />
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={handleSell} disabled={sellLoading} style={{ flex: 1, padding: "9px", background: "#e53935", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "600" }}>
                {sellLoading ? "Selling…" : "Confirm Sell"}
              </button>
              <button onClick={() => setSellModal(null)} style={{ flex: 1, padding: "9px", background: "#f5f5f5", border: "1px solid #ddd", borderRadius: "4px", cursor: "pointer" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.length === 0 ? (
              <tr><td colSpan="9" style={{ textAlign: "center", padding: "20px", color: "#888" }}>No holdings yet. Buy stocks from the watchlist.</td></tr>
            ) : (
              allHoldings.map((stock, index) => {
                const curValue = stock.price * stock.qty;
                const isProfit = curValue - stock.avg * stock.qty >= 0.0;
                const profClass = isProfit ? "profit" : "loss";
                const dayClass = stock.isLoss ? "loss" : "profit";
                return (
                  <tr key={index}>
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>{stock.avg.toFixed(2)}</td>
                    <td>{stock.price.toFixed(2)}</td>
                    <td>{curValue.toFixed(2)}</td>
                    <td className={profClass}>{(curValue - stock.avg * stock.qty).toFixed(2)}</td>
                    <td className={profClass}>{stock.net}</td>
                    <td className={dayClass}>{stock.day}</td>
                    <td>
                      <button
                        onClick={() => { setSellModal({ name: stock.name, price: stock.price, maxQty: stock.qty }); setSellQty(1); }}
                        style={{ padding: "3px 12px", background: "#e53935", color: "#fff", border: "none", borderRadius: "3px", cursor: "pointer", fontSize: "12px" }}
                      >
                        Sell
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col"><h5>29,875.<span>55</span></h5><p>Total investment</p></div>
        <div className="col"><h5>31,428.<span>95</span></h5><p>Current value</p></div>
        <div className="col"><h5>1,553.40 (+5.20%)</h5><p>P&L</p></div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
// api fetch
// sell per row

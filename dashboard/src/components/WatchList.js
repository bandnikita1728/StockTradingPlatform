import React, { useState, useEffect, useContext } from "react";
import GeneralContext from "./GeneralContext";
import { Tooltip, Grow } from "@mui/material";
import { BarChartOutlined, KeyboardArrowDown, KeyboardArrowUp, MoreHoriz } from "@mui/icons-material";
import { watchlist as staticWatchlist } from "../data/data";
import { DoughnutChart } from "./DoughnoutChart";

const AV_KEY = process.env.REACT_APP_ALPHA_VANTAGE_KEY || "demo";
const CACHE_TTL = 10 * 60 * 1000;

const AV_SYMBOLS = {
  INFY: "INFY.BSE", ONGC: "ONGC.BSE", TCS: "TCS.BSE",
  KPITTECH: "KPITTECH.BSE", WIPRO: "WIPRO.BSE", "M&M": "M&M.BSE",
  RELIANCE: "RELIANCE.BSE", HUL: "HUL.BSE", HDFCBANK: "HDFCBANK.BSE",
  SBIN: "SBIN.BSE",
};

const getCached = (key) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { ts, data } = JSON.parse(raw);
    if (Date.now() - ts < CACHE_TTL) return data;
  } catch (_) {}
  return null;
};

const setCache = (key, data) => {
  try { localStorage.setItem(key, JSON.stringify({ ts: Date.now(), data })); } catch (_) {}
};

const WatchList = () => {
  const [stocks, setStocks] = useState(staticWatchlist);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (AV_KEY === "demo") return;
    const fetchPrices = async () => {
      const updated = [...staticWatchlist];
      for (let i = 0; i < updated.length; i++) {
        const name = updated[i].name;
        const sym = AV_SYMBOLS[name];
        if (!sym) continue;
        const cacheKey = `av_${sym}`;
        const cached = getCached(cacheKey);
        if (cached) { updated[i] = { ...updated[i], ...cached }; continue; }
        try {
          if (i > 0) await new Promise((r) => setTimeout(r, 13000)); // ~4.6/min to stay under 5/min limit
          const res = await fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${sym}&apikey=${AV_KEY}`
          );
          const json = await res.json();
          const q = json["Global Quote"];
          if (q && q["05. price"]) {
            const price = parseFloat(q["05. price"]);
            const pct = parseFloat(q["10. change percent"].replace("%", ""));
            const liveData = { price, percent: `${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%`, isDown: pct < 0 };
            setCache(cacheKey, liveData);
            updated[i] = { ...updated[i], ...liveData };
            setStocks([...updated]);
          }
        } catch (_) {}
      }
    };
    fetchPrices();
  }, []);

  const filtered = search
    ? stocks.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
    : stocks;

  const chartData = {
    labels: stocks.map((s) => s.name),
    datasets: [{
      label: "Price",
      data: stocks.map((s) => s.price),
      backgroundColor: ["rgba(255,99,132,0.5)","rgba(54,162,235,0.5)","rgba(255,206,86,0.5)","rgba(75,192,192,0.5)","rgba(153,102,255,0.5)","rgba(255,159,64,0.5)"],
      borderColor: ["rgba(255,99,132,1)","rgba(54,162,235,1)","rgba(255,206,86,1)","rgba(75,192,192,1)","rgba(153,102,255,1)","rgba(255,159,64,1)"],
      borderWidth: 1,
    }],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search eg: infy, tcs, reliance"
          className="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="counts">{filtered.length} / 50</span>
      </div>
      <ul className="list">
        {filtered.map((stock, index) => (
          <WatchListItem stock={stock} key={index} />
        ))}
      </ul>
      <DoughnutChart data={chartData} />
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showActions, setShowActions] = useState(false);
  return (
    <li onMouseEnter={() => setShowActions(true)} onMouseLeave={() => setShowActions(false)}>
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent" style={{ color: stock.isDown ? "rgb(223,73,73)" : "rgb(103,201,136)", marginRight: 4 }}>
            {stock.percent}
          </span>
          {stock.isDown ? <KeyboardArrowDown className="down" /> : <KeyboardArrowUp className="up" />}
          <span className="price" style={{ color: stock.isDown ? "rgb(223,73,73)" : "rgb(73,73,73)" }}>
            {Number(stock.price).toFixed(2)}
          </span>
        </div>
      </div>
      {showActions && <WatchListActions uid={stock.name} />}
    </li>
  );
};

const WatchListActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);
  return (
    <span className="actions">
      <span>
        <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
          <button className="buy" onClick={() => generalContext.openBuyWindow(uid)}>Buy</button>
        </Tooltip>
        <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
          <button className="sell" onClick={() => generalContext.openSellWindow(uid)}>Sell</button>
        </Tooltip>
        <Tooltip title="Analytics" placement="top" arrow TransitionComponent={Grow}>
          <button className="action"><BarChartOutlined className="icon" /></button>
        </Tooltip>
        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action"><MoreHoriz className="icon" /></button>
        </Tooltip>
      </span>
    </span>
  );
};
// watchlist complete
// alpha vantage api
// 10 min cache

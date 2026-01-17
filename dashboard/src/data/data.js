// 2026 market data (June 28, 2026)
export const watchlist = [
  { name: "INFY", price: 1892.35, percent: "+1.24%", isDown: false },
  { name: "ONGC", price: 287.60, percent: "+0.83%", isDown: false },
  { name: "TCS", price: 4218.75, percent: "-0.45%", isDown: true },
  { name: "KPITTECH", price: 1564.20, percent: "+2.18%", isDown: false },
  { name: "WIPRO", price: 612.90, percent: "+0.57%", isDown: false },
  { name: "M&M", price: 3142.50, percent: "-0.32%", isDown: true },
  { name: "RELIANCE", price: 3284.15, percent: "+1.05%", isDown: false },
  { name: "HUL", price: 2698.40, percent: "-0.18%", isDown: true },
  { name: "HDFCBANK", price: 1892.00, percent: "+0.72%", isDown: false },
  { name: "SBIN", price: 892.45, percent: "+1.38%", isDown: false },
];

// holdings — starter data with 2026 prices
export const holdings = [
  { name: "BHARTIARTL", qty: 2, avg: 1285.00, price: 1847.30, net: "+43.77%", day: "+0.92%" },
  { name: "HDFCBANK", qty: 2, avg: 1520.00, price: 1892.00, net: "+24.47%", day: "+0.72%" },
  { name: "HINDUNILVR", qty: 1, avg: 2450.00, price: 2698.40, net: "+10.14%", day: "-0.18%", isLoss: true },
  { name: "INFY", qty: 1, avg: 1600.00, price: 1892.35, net: "+18.27%", day: "+1.24%" },
  { name: "ITC", qty: 5, avg: 390.00, price: 498.75, net: "+27.88%", day: "+0.63%" },
  { name: "KPITTECH", qty: 5, avg: 1180.00, price: 1564.20, net: "+32.56%", day: "+2.18%" },
  { name: "M&M", qty: 2, avg: 2850.00, price: 3142.50, net: "+10.26%", day: "-0.32%", isLoss: true },
  { name: "RELIANCE", qty: 1, avg: 2950.00, price: 3284.15, net: "+11.33%", day: "+1.05%" },
  { name: "SBIN", qty: 4, avg: 720.00, price: 892.45, net: "+23.95%", day: "+1.38%" },
  { name: "TCS", qty: 1, avg: 3850.00, price: 4218.75, net: "+9.58%", day: "-0.45%", isLoss: true },
];

// positions
export const positions = [
  { product: "MIS", name: "NIFTY28JUN24900CE", qty: 50, avg: 142.50, price: 168.30, net: "+18.11%", day: "+12.40%" },
  { product: "CNC", name: "WIPRO", qty: 3, avg: 595.00, price: 612.90, net: "+3.01%", day: "+0.57%" },
];

import React from "react";

function Stats() {
  return (
    <div className="container p-3">
      <div className="row p-5">
        <div className="col-6 p-5">
          <h1 className="fs-2 mb-5">Trust with confidence</h1>
          <h2 className="fs-4">Customer-first always</h2>
          <p className="text-muted">
            Built with investors in mind — zero commissions on delivery trades,
            flat ₹20 on intraday and F&O, and full transparency on charges.
          </p>
          <h2 className="fs-4">No spam or gimmicks</h2>
          <p className="text-muted">
            No gimmicks, spam, "gamification", or annoying push notifications.
            High quality apps that you use at your pace, the way you like.
          </p>
          <h2 className="fs-4">The StockTradingPlatform universe</h2>
          <p className="text-muted">
            Not just an app, but a whole ecosystem — Kite, Coin, Varsity,
            Console, Nudge, and Sentinel — all accessible from your dashboard.
          </p>
          <h2 className="fs-4">Do better with money</h2>
          <p className="text-muted">
            With tools like Nudge and Kill Switch, we don't just facilitate
            transactions, but actively help you do better with your money.
          </p>
        </div>
        <div className="col-6 p-5">
          <img src="/ecosystem.png" style={{ width: "90%" }} />
          <div className="text-center">
            <a href="" className="mx-5" style={{ textDecoration: "none" }}>
              Explore our products{" "}
              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
            <a href="" style={{ textDecoration: "none" }}>
              Try Kite demo{" "}
              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;

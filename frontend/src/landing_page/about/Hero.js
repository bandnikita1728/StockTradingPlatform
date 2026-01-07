import React from "react";

function Hero() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 mb-5">
        <h1 className="fs-2 text-center">
          I was curious about how real trading platforms work —
          <br />
          so I built one myself.
        </h1>
      </div>

      <div
        className="row p-5 mt-5 border-top text-muted"
        style={{ lineHeight: "1.9", fontSize: "1.15em" }}
      >
        <div className="col-6 p-5">
          <p>
            I built StockTradingPlatform as a personal project to learn
            full-stack development. I'd been using apps like Zerodha and always
            wondered what was going on under the hood — how orders get saved,
            how portfolios update in real time, how authentication actually
            works. So I decided to figure it out by building it myself.
          </p>
          <p>
            The whole thing — frontend, backend, database, cloud deployment —
            was built from scratch. It was challenging, sometimes frustrating,
            but honestly taught me more than any tutorial ever could.
          </p>
          <p>
            The app lets you watch stocks, place buy/sell orders, track your
            holdings and positions, and manage funds — all wired up to a real
            MongoDB database running on AWS.
          </p>
        </div>
        <div className="col-6 p-5">
          <p>
            Through this project I learned React (hooks, routing, context),
            Node.js + Express for REST APIs, MongoDB Atlas for data, JWT
            authentication with bcrypt password hashing, Chart.js for data
            visualisation, and deploying full-stack apps on AWS with S3,
            CloudFront, EC2 and PM2.
          </p>
          <p>
            I'm Nikita Band, B.Tech ECE at IIITDM Jabalpur. I love building
            things that actually work in production — not just on localhost.
            This project is my way of proving that to myself.
          </p>
          <p>
            If you're curious, explore the app, create an account, and try
            placing an order. It's all real — saved to MongoDB, running on EC2,
            served over CloudFront.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;

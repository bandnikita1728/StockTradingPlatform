# StockTradingPlatform

> A full-stack stock trading platform built from scratch to learn how real trading systems work under the hood.

I built this project out of curiosity — I wanted to understand how platforms like Zerodha actually function end-to-end. So I built one myself, from the React landing page all the way to a live backend on AWS EC2. This project taught me more than any tutorial ever could.

**— Nikita Band, ECE, IIITDM Jabalpur**

---

## 🚀 Live Demo

| Service | URL |
|---|---|
| 🌐 Frontend (Landing Page) | https://d38jgk608zcs11.cloudfront.net |
| 📊 Dashboard | https://d1blyqfih02ltw.cloudfront.net |
| ⚙️ Backend API | https://dv61z46ptns4g.cloudfront.net |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER BROWSER                         │
└──────────────┬──────────────────────────┬───────────────────┘
               │                          │
               ▼                          ▼
┌──────────────────────┐    ┌─────────────────────────┐
│   AWS CloudFront     │    │     AWS CloudFront       │
│   (Frontend CDN)     │    │     (Dashboard CDN)      │
│  d38jgk608zcs11...   │    │   d1blyqfih02ltw...      │
└──────────┬───────────┘    └────────────┬────────────┘
           │                             │
           ▼                             ▼
┌──────────────────────┐    ┌─────────────────────────┐
│      AWS S3          │    │         AWS S3           │
│  (Frontend Build)    │    │    (Dashboard Build)     │
│   React Static App   │    │    React Static App      │
└──────────────────────┘    └─────────────────────────┘
                                         │
                                         │ API Calls (JWT)
                                         ▼
                          ┌──────────────────────────────┐
                          │       AWS CloudFront         │
                          │      (Backend HTTPS Proxy)   │
                          │     dv61z46ptns4g...         │
                          └──────────────┬───────────────┘
                                         │
                                         ▼
                          ┌──────────────────────────────┐
                          │         AWS EC2              │
                          │    (Node.js + Express)       │
                          │    Running via PM2           │
                          └──────────────┬───────────────┘
                                         │
                                         ▼
                          ┌──────────────────────────────┐
                          │      MongoDB Atlas            │
                          │   (Cloud Database)           │
                          │   Cluster0 - ap-south-1      │
                          └──────────────────────────────┘
```

---

## ✨ Features

### Landing Page
- Home page with Hero, Stats, Awards, Education, Pricing sections
- About page with personal story
- Products, Pricing, Support pages
- Signup and Login with JWT authentication
- Responsive Navbar and Footer

### Trading Dashboard
- **WatchList** — Live Indian stock prices via Alpha Vantage API with 10-min cache
- **Holdings** — Instrument, Qty, Avg Cost, LTP, Current Value, P&L, Net Change%, Day Change%. Sell button per row
- **Positions** — Open positions with P&L
- **Orders** — Full order history with Mode, Option, Status, Date
- **Funds** — Equity margin available and used
- **Apps** — Kite, Coin, Varsity, Console, Nudge, Sentinel
- **Buy/Sell Modals** — Qty + Price input with success/error feedback
- **TopBar** — Live NIFTY 50 and SENSEX, dynamic username from JWT, Logout

### Authentication
- Signup with bcrypt password hashing
- Login with JWT token
- Protected dashboard routes
- Dynamic greeting with logged-in username
- Logout clears token and redirects

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React | UI framework |
| React Router | Client-side routing |
| CSS3 | Styling |
| Axios | API calls |

### Dashboard
| Technology | Purpose |
|---|---|
| React | UI framework |
| ChartJS | Doughnut and vertical graphs |
| MUI | Component library |
| Alpha Vantage API | Live Indian stock prices |
| JWT | Authentication |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | Web framework |
| MongoDB Atlas | Cloud database |
| Mongoose | ODM |
| bcrypt | Password hashing |
| JSON Web Token | Auth |
| CORS | Cross-origin requests |

### DevOps
| Technology | Purpose |
|---|---|
| AWS S3 | Static hosting |
| AWS CloudFront | CDN + HTTPS |
| AWS EC2 t2.micro | Backend server |
| PM2 | Process manager |
| MongoDB Atlas | Managed cloud DB |

### Testing
| Technology | Purpose |
|---|---|
| Jest | Test framework |
| Supertest | HTTP endpoint testing |

---

## 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/signup` | ❌ | Register new user |
| POST | `/login` | ❌ | Login and get JWT |
| GET | `/allHoldings` | ✅ | Get all holdings |
| GET | `/allPositions` | ✅ | Get all positions |
| GET | `/allOrders` | ✅ | Get all orders |
| POST | `/newOrder` | ✅ | Place buy or sell order |

---

## 🧪 Tests

10 Jest tests covering all API endpoints:

```bash
cd backend
npm test
```

---

## ⚙️ Local Setup

```bash
git clone https://github.com/bandnikita1728/StockTradingPlatform.git
cd StockTradingPlatform

# Backend
cd backend && npm install
# Add .env: MONGO_URL=... and JWT_SECRET=...
node index.js

# Frontend
cd frontend && npm install && npm start

# Dashboard
cd dashboard && npm install && npm start
```

---

## 📚 What I Learned

- Full-stack React + Node.js + MongoDB architecture
- JWT authentication flow end to end
- Third-party API integration with caching (Alpha Vantage)
- ChartJS for financial data visualization
- AWS deployment — S3, CloudFront, EC2, PM2
- Writing Jest tests for REST APIs
- Debugging CORS issues in production

---

## 👩‍💻 Author

**Nikita Band**
B.Tech ECE — PDPM IIITDM Jabalpur (2023–2027)
Amazon Future Engineer Scholar

- GitHub: [@bandnikita1728](https://github.com/bandnikita1728)
- LinkedIn: [linkedin.com/in/nikita-band-122550289](https://linkedin.com/in/nikita-band-122550289)
- Email: nikitaband635@gmail.com
// cleanup done
// readme updated

# ⚡ NSE Paper Trader

> A real-time paper trading bot for Nifty 50 stocks built with React + Vite.
> Simulates MA Crossover + RSI strategy with auto-saved sessions.

![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)
![Status](https://img.shields.io/badge/status-educational%20simulation-yellow)

---

## ⚠️ Disclaimer

This is a **paper trading simulation for educational purposes only**.
- Prices are generated using Geometric Brownian Motion — not real NSE/BSE market data
- No real money is involved at any point
- This does not constitute financial advice
- Consult a SEBI-registered investment advisor before making real investment decisions

---

## 📸 Preview

```
┌─────────────────────────────────────────────────────────┐
│  RELIANCE ₹2851 ▲  TCS ₹3922 ▲  INFY ₹1780 ▲  ...     │  ← scrolling ticker
├─────────────────────────────────────────────────────────┤
│  ⚡ NSE Paper Trader          ● LIVE · Tick #42  ■ STOP │
│  MA Crossover + RSI Strategy · Session auto-saved 💾    │
├──────────┬──────────┬──────────┬────────┬───────────────┤
│ ₹10,082  │ ₹7,200   │ ₹2,882   │ +₹82   │  3 positions  │
│ TOTAL    │ CASH     │ INVESTED │ P&L    │               │
└──────────┴──────────┴──────────┴────────┴───────────────┘
```

---

## ✨ Features

- **8 Nifty 50 stocks** — RELIANCE, TCS, INFY, HDFCBANK, WIPRO, SBIN, TATAMOTORS, ITC
- **Live price simulation** — Geometric Brownian Motion, updates every 2 seconds
- **MA Crossover strategy** — 5-period fast SMA vs 20-period slow SMA
- **RSI filter** — RSI(14) prevents overbought entries and oversold exits
- **Auto-save** — full session persists in localStorage, survives page reloads
- **Scrolling ticker tape** — live prices with ▲▼ indicators at the top
- **Sparkline charts** — last 30 price points per stock, green/red trending
- **Trade log** — last 50 trades with realised P&L on each SELL
- **KPI strip** — Total Value, Cash, Invested, Total P&L, Realised P&L, Win/Loss, Positions
- **Dark terminal UI** — IBM Plex Mono font, #080c14 background

---

## 📈 Strategy Logic

### Signal generation

| Signal | Condition |
|--------|-----------|
| **BUY** | fast SMA > slow SMA × 1.002 **AND** RSI(14) < 65 |
| **SELL** | fast SMA < slow SMA × 0.998 **AND** RSI(14) > 55 |
| **HOLD** | Neither condition met |

### Parameters

| Parameter | Value |
|-----------|-------|
| Starting capital | ₹10,000 |
| Position sizing | 20% of available cash per BUY |
| Max positions | 1 per stock (no pyramiding) |
| Fast SMA period | 5 ticks |
| Slow SMA period | 20 ticks |
| RSI period | 14 ticks |
| Tick interval | 2 seconds |
| GBM drift (μ) | 0.012 |
| GBM shock (σ) | 0.018 |
| Save debounce | 800ms |

### Price simulation — Geometric Brownian Motion

```
Price(t+1) = Price(t) × exp((μ - σ²/2)·dt + σ·√dt·Z)

where:
  μ  = 0.012  (annual drift)
  σ  = 0.018  (annual volatility / shock)
  dt = 1/252  (one trading day)
  Z  = random normal variable
```

---

## 🗂️ Project Structure

```
nse-paper-trader/
├── .github/
│   └── workflows/
│       └── deploy.yml        # Auto-deploy to GitHub Pages on push
├── public/
├── src/
│   ├── App.jsx               # Main trading bot component (all logic + UI)
│   ├── main.jsx              # React entry point — imports storage shim first
│   └── storage.js            # localStorage shim for window.storage API
├── index.html                # Vite HTML entry point
├── vite.config.js            # Vite config with GitHub Pages base path
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- [Git](https://git-scm.com)

Check your versions:
```bash
node --version   # v18+
git --version    # any version
```

### Run locally

```bash
# 1. Extract the zip
# Windows PowerShell:
Expand-Archive -Path nse-paper-trader.zip -DestinationPath .

# Mac / Linux:
unzip nse-paper-trader.zip

# 2. Enter the project folder
cd nse-paper-trader

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Open your browser at: **http://localhost:5173/nse-paper-trader/**

Press **▶ START** to begin the simulation.

---

## 🌐 Deployment

### Option A — GitHub Pages (automatic CI/CD)

1. **Create a GitHub repo** at [github.com/new](https://github.com/new)
   - Name: `nse-paper-trader`
   - Visibility: Public
   - Don't tick any checkboxes

2. **Set the base path** in `vite.config.js` to match your repo name:
   ```js
   base: '/nse-paper-trader/',  // ← must match your repo name exactly
   ```

3. **Push your code:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/nse-paper-trader.git
   git push -u origin main
   ```

4. **Enable Pages:** Go to repo → **Settings → Pages → Source → `gh-pages` branch → Save**

5. **Live URL** (ready in ~2 minutes):
   ```
   https://YOUR_USERNAME.github.io/nse-paper-trader/
   ```

Every subsequent `git push` to `main` auto-redeploys via the included GitHub Actions workflow.

---

### Option B — Vercel (fastest, drag and drop)

1. Sign up free at [vercel.com](https://vercel.com)
2. Click **Add New → Project**
3. Drag your project folder in, or connect your GitHub repo
4. Click **Deploy**

Live in ~60 seconds. No extra configuration needed.

---

### Option C — Netlify (drag and drop the build)

```bash
npm run build          # creates the dist/ folder
```

Then drag the `dist/` folder to [app.netlify.com/drop](https://app.netlify.com/drop).

---

## 🔧 Configuration

### Changing the base path

If your GitHub repo has a different name, update `vite.config.js`:

```js
export default defineConfig({
  plugins: [react()],
  base: '/YOUR-REPO-NAME/',   // ← change this
})
```

### Adding more stocks

In `src/App.jsx`, add to the `STOCKS_CONFIG` array:

```js
const STOCKS_CONFIG = [
  // existing stocks...
  { symbol: "BAJFINANCE", base: 6800, sector: "Finance" },
  { symbol: "ASIANPAINT", base: 2900, sector: "Consumer" },
];
```

### Adjusting strategy parameters

```js
const DRIFT       = 0.012   // GBM annual drift
const SHOCK       = 0.018   // GBM annual volatility
const FAST_PERIOD = 5       // Fast SMA period
const SLOW_PERIOD = 20      // Slow SMA period
const RSI_PERIOD  = 14      // RSI period
const TICK_MS     = 2000    // Price update interval (ms)
```

---

## 💾 Session Persistence

The bot auto-saves your full session every 800ms to `localStorage` under the key `nse-paper-trader-state`. This includes:

- Current capital
- Open portfolio positions
- Full price history per stock (last 100 ticks)
- Complete trade log (last 200 trades)
- Tick count

On page reload, the session is restored exactly where you left off. Click **Reset** to wipe storage and start fresh with ₹10,000.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI and state management |
| Vite 5 | Build tool and dev server |
| IBM Plex Mono | Terminal-style font (Google Fonts) |
| localStorage | Session persistence |
| GitHub Actions | CI/CD auto-deployment |
| gh-pages | GitHub Pages publishing |

No external UI libraries. All components are hand-built with inline React styles.

---

## 📜 License

MIT — free to use, modify, and distribute.

---

## 🙏 Acknowledgements

Built as an educational demonstration of:
- Geometric Brownian Motion for financial price simulation
- Moving Average Crossover trading strategies
- RSI (Relative Strength Index) as a momentum filter
- React state management patterns for real-time data
- GitHub Actions CI/CD for automated deployment

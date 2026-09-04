# MarketPulse – Smart Market Watchlist

### Don't just watch the market. Know what changed.

MarketPulse is a smart market watchlist that helps users understand what has meaningfully changed since their last visit. It tracks stocks, compares snapshots, calculates an explainable Attention Score, highlights important changes, and indicates stale or delayed data.

## Core Features
- Add and remove stocks from a watchlist
- Latest market information
- Since-last-visit comparison
- Meaningful Change Detection
- Explainable Attention Score
- Normal / Watch / Attention classification
- Data freshness indicator
- REST backend

## Project Structure
- `frontend/` – responsive HTML/CSS/JavaScript interface
- `backend/` – Java Spring Boot REST API

## Run Backend
1. Install Java 17+ and Maven.
2. Open a terminal in `backend/`.
3. Run:
   `mvn spring-boot:run`
4. Open `http://localhost:8080`

The included backend uses sample market data so the application can be demonstrated without an API key. A live market-data provider can be connected later.

## Hackathon
Built for CODE 2026.

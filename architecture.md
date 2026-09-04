# MarketPulse Architecture

```text
User
  |
  v
Responsive Frontend (HTML/CSS/JavaScript)
  |
  | REST API
  v
Spring Boot Backend
  |
  +--> Meaningful Change / Attention Score
  |
  +--> Market Data Layer (demo data; replace with live provider)
  |
  v
Persistent browser watchlist + snapshots
```

## Meaningful Change Logic

The demonstration score combines:
- price movement
- unusual volume
- sector movement

Classification:
- 0–29: NORMAL
- 30–59: WATCH
- 60–100: ATTENTION

The design intentionally keeps the scoring explainable and simple rather than over-engineering it.

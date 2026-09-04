package com.marketpulse;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class StockController {

    private final Map<String, Stock> market = new HashMap<>();

    public StockController() {
        market.put("RELIANCE", new Stock("RELIANCE", 1420.00, -4.20, 2.8, 82, -1.1, "Price movement is unusually large and trading volume is significantly above normal."));
        market.put("TCS", new Stock("TCS", 3210.00, 0.80, 1.0, 18, 0.4, "Movement is within the normal range and volume is close to its baseline."));
        market.put("INFY", new Stock("INFY", 1540.00, -2.70, 1.2, 48, -0.6, "Price has moved moderately since the previous check, but volume is near normal."));
        market.put("HDFCBANK", new Stock("HDFCBANK", 1890.00, 4.60, 2.1, 76, 1.3, "Strong upward movement is supported by unusually high trading volume."));
    }

    @GetMapping("/stocks")
    public List<Stock> stocks(@RequestParam(defaultValue="RELIANCE,TCS,INFY,HDFCBANK") String symbols) {
        List<Stock> result = new ArrayList<>();
        for (String raw : symbols.split(",")) {
            String symbol = raw.trim().toUpperCase();
            Stock s = market.getOrDefault(symbol,
                    new Stock(symbol, 1000.00, 0.0, 1.0, 10, 0.0, "No significant change detected in the demonstration data."));
            result.add(s);
        }
        return result;
    }

    record Stock(String symbol, double price, double change, double volumeMultiple,
                 int score, double sectorChange, String reason) {
        public String getLevel() {
            return score >= 60 ? "ATTENTION" : score >= 30 ? "WATCH" : "NORMAL";
        }
        public String getFreshness() { return "✓ Demonstration data • latest available snapshot"; }
        public double getPreviousPrice() { return price / (1 + change / 100.0); }
        public double getPreviousVolume() { return volumeMultiple == 0 ? 0 : 100.0 / volumeMultiple; }
    }
}

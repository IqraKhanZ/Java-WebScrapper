package com.WebScrapping.Controller;

import com.WebScrapping.Service.ScraperService;
import com.WebScrapping.model.ScrapeResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * REST Controller providing endpoints for web scraping operations.
 * Annotated with @CrossOrigin to allow React frontend integration.
 * 
 * @author Iqra Khan (https://github.com/IqraKhanZ)
 */
@RestController
@CrossOrigin(origins = "*")
public class ScrapeController {

    @Autowired
    private ScraperService scraperService;

    /**
     * Scrapes a webpage and extracts images, videos, and links.
     * 
     * @param url The target website URL
     * @return ScrapeResponse containing extracted assets and page metrics
     */
    @GetMapping("/api/scrape")
    public ResponseEntity<ScrapeResponse> scrape(@RequestParam(name = "url") String url) {
        ScrapeResponse response = scraperService.webScrape(url);
        return ResponseEntity.ok(response);
    }

    /**
     * Health check endpoint to verify backend service status.
     * 
     * @return Status map
     */
    @GetMapping("/api/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> status = new HashMap<>();
        status.put("status", "UP");
        status.put("service", "Java-WebScrapper API");
        status.put("developer", "Iqra Khan");
        status.put("github", "https://github.com/IqraKhanZ/Java-WebScrapper");
        return ResponseEntity.ok(status);
    }
}

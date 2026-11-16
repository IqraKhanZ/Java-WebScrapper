package com.WebScrapping.Service;

import com.WebScrapping.model.ScrapeResponse;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.Set;

/**
 * Service class responsible for fetching web content using Jsoup
 * and extracting images, videos, and hyperlinks.
 * 
 * @author Iqra Khan (https://github.com/IqraKhanZ)
 */
@Service
public class ScraperService {

    private static final String USER_AGENT = 
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
            "(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";
    private static final int TIMEOUT_MILLIS = 10000;

    /**
     * Scrapes the target URL and extracts media and anchor links.
     * 
     * @param targetUrl Website URL to scrape
     * @return ScrapeResponse object with extracted resources and metadata
     */
    public ScrapeResponse webScrape(String targetUrl) {
        ScrapeResponse response = new ScrapeResponse();

        if (targetUrl == null || targetUrl.trim().isEmpty()) {
            response.setSuccess(false);
            response.setMessage("Please provide a valid URL.");
            return response;
        }

        // Normalize URL if scheme is missing
        String normalizedUrl = targetUrl.trim();
        if (!normalizedUrl.startsWith("http://") && !normalizedUrl.startsWith("https://")) {
            normalizedUrl = "https://" + normalizedUrl;
        }
        response.setUrl(normalizedUrl);

        try {
            // Connect to URL and parse HTML Document with Jsoup
            Document doc = Jsoup.connect(normalizedUrl)
                    .userAgent(USER_AGENT)
                    .referrer("https://www.google.com")
                    .timeout(TIMEOUT_MILLIS)
                    .followRedirects(true)
                    .ignoreHttpErrors(false)
                    .get();

            // Extract page title
            response.setTitle(doc.title() != null && !doc.title().isEmpty() ? doc.title() : "No Title Found");

            // Extract Images (deduplicated preserving order)
            Set<String> imageSet = new LinkedHashSet<>();
            for (Element img : doc.select("img")) {
                String src = img.absUrl("src");
                if (src.isEmpty()) {
                    src = img.absUrl("data-src"); // Fallback for lazy-loaded images
                }
                if (!src.isEmpty() && !src.startsWith("data:image")) {
                    imageSet.add(src);
                }
            }

            // Extract Videos (direct <video src> or child <source src>)
            Set<String> videoSet = new LinkedHashSet<>();
            for (Element video : doc.select("video")) {
                String src = video.absUrl("src");
                if (!src.isEmpty()) {
                    videoSet.add(src);
                }
            }
            for (Element source : doc.select("video source")) {
                String src = source.absUrl("src");
                if (!src.isEmpty()) {
                    videoSet.add(src);
                }
            }

            // Extract Links (<a href>)
            Set<String> linkSet = new LinkedHashSet<>();
            for (Element link : doc.select("a[href]")) {
                String href = link.absUrl("href");
                if (!href.isEmpty() && !href.startsWith("javascript:") && !href.startsWith("mailto:") && !href.startsWith("tel:")) {
                    linkSet.add(href);
                }
            }

            // Populate response
            response.setImages(new ArrayList<>(imageSet));
            response.setVideos(new ArrayList<>(videoSet));
            response.setLinks(new ArrayList<>(linkSet));
            response.setSuccess(true);
            response.setMessage("Successfully extracted content from " + normalizedUrl);

        } catch (IOException e) {
            response.setSuccess(false);
            response.setMessage("Failed to scrape website: " + e.getMessage());
        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage("Unexpected error occurred: " + e.getMessage());
        }

        return response;
    }
}

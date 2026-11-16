package com.WebScrapping.model;

import java.util.ArrayList;
import java.util.List;

/**
 * Data Transfer Object (DTO) representing the scraped webpage results.
 * Contains page metadata, media assets (images, videos), hyperlinks, and metrics.
 * 
 * @author Iqra Khan (https://github.com/IqraKhanZ)
 */
public class ScrapeResponse {

    private String url;
    private String title;
    private boolean success;
    private String message;
    private int totalImages;
    private int totalVideos;
    private int totalLinks;
    private List<String> images = new ArrayList<>();
    private List<String> videos = new ArrayList<>();
    private List<String> links = new ArrayList<>();

    public ScrapeResponse() {
        this.success = true;
        this.message = "Scraped successfully";
    }

    public ScrapeResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    // --- Getters and Setters ---

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getTotalImages() {
        return totalImages;
    }

    public void setTotalImages(int totalImages) {
        this.totalImages = totalImages;
    }

    public int getTotalVideos() {
        return totalVideos;
    }

    public void setTotalVideos(int totalVideos) {
        this.totalVideos = totalVideos;
    }

    public int getTotalLinks() {
        return totalLinks;
    }

    public void setTotalLinks(int totalLinks) {
        this.totalLinks = totalLinks;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
        this.totalImages = (images != null) ? images.size() : 0;
    }

    public List<String> getVideos() {
        return videos;
    }

    public void setVideos(List<String> videos) {
        this.videos = videos;
        this.totalVideos = (videos != null) ? videos.size() : 0;
    }

    public List<String> getLinks() {
        return links;
    }

    public void setLinks(List<String> links) {
        this.links = links;
        this.totalLinks = (links != null) ? links.size() : 0;
    }
}

# Java-WebScrapper

A modern, lightweight, full-stack **Web Content Extractor & Scraper** built with **Spring Boot 3**, **Jsoup**, and **React 18**.

[![Java](https://img.shields.io/badge/Java-17%2B-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.2-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Jsoup](https://img.shields.io/badge/Jsoup-1.18.3-blue.svg)](https://jsoup.org/)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38bdf8.svg)](https://tailwindcss.com/)
[![Author](https://img.shields.io/badge/Author-Iqra_Khan-purple.svg)](https://github.com/IqraKhanZ)

---

## 🌟 Overview

**Java-WebScrapper** enables users to enter any target website URL and extract:
- 🖼️ **Images**: Parses `<img>` tags (including `data-src` lazy-loaded images) and resolves relative paths to absolute URLs.
- 🎬 **Videos**: Extracts direct `<video>` tags and `<source>` media streams.
- 🔗 **Hyperlinks**: Extracts all `<a href>` links while filtering out script and mail protocols.
- 📊 **Page Metrics**: Captures page title, target domain, and asset counts in real time.

The project features a **Spring Boot REST API backend** and an interactive, clean **React UI** with tabs, copy-to-clipboard actions, live preview cards, and fallback image handling.

---

## 🚀 Key Features

- **Zero-Setup Full Stack**: The React Single-Page Application (SPA) is served directly by Spring Boot at `http://localhost:8181/`. No separate node server is required to run the project!
- **Dual Frontend Architecture**:
  - `src/main/resources/static/index.html`: Bundled zero-build React app ready for instant deployment and demos.
  - `frontend/`: Clean, modular React component architecture (Vite + React) for portfolio showcase.
- **Smart URL Normalization**: Automatically prepends `https://` if omitted by the user.
- **Deduplication**: Uses `LinkedHashSet` in Java to remove duplicate image and link entries while preserving webpage order.
- **CORS Enabled**: Configured with `@CrossOrigin` so any external frontend or client can query the scraping endpoints.
- **Interview & Viva Ready**: Clean, readable code structure with beginner-friendly explanations.

---

## 🏗️ Architecture

```
                       ┌────────────────────────────────────────┐
                       │          React Frontend (UI)           │
                       │   (Components: Search, Tabs, Media)    │
                       └───────────────────┬────────────────────┘
                                           │
                           GET /api/scrape?url=https://...
                                           │
                                           ▼
                       ┌────────────────────────────────────────┐
                       │     Spring Boot REST Controller        │
                       │          (ScrapeController)            │
                       └───────────────────┬────────────────────┘
                                           │
                                           ▼
                       ┌────────────────────────────────────────┐
                       │        Java Scraper Service            │
                       │          (ScraperService)              │
                       └───────────────────┬────────────────────┘
                                           │
                              HTTP Request │ DOM Parsing
                                           ▼
                       ┌────────────────────────────────────────┐
                       │             Jsoup Parser               │
                       │     (Fetches HTML & extracts tags)     │
                       └───────────────────┬────────────────────┘
                                           │
                                           ▼
                                    Target Website
```

---

## 📁 Project Structure

```
Java-WebScrapper/
├── src/
│   ├── main/
│   │   ├── java/com/WebScrapping/
│   │   │   ├── Controller/
│   │   │   │   └── ScrapeController.java    # REST API endpoints & CORS
│   │   │   ├── Service/
│   │   │   │   └── ScraperService.java       # Jsoup HTML parsing & extraction
│   │   │   ├── model/
│   │   │   │   └── ScrapeResponse.java       # DTO for response data & counts
│   │   │   └── WebScrappingApplication.java  # Spring Boot Main Class
│   │   └── resources/
│   │       ├── application.properties        # Server port (8181) & config
│   │       └── static/
│   │           └── index.html                # Modern React SPA (zero-build)
├── frontend/                                 # Modular React project (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx                    # Header & branding
│   │   │   ├── SearchBar.jsx                 # Search form & sample buttons
│   │   │   ├── StatsCards.jsx                # Metrics summary cards
│   │   │   ├── ImageGallery.jsx              # Responsive image grid
│   │   │   ├── VideoGallery.jsx              # HTML5 video players
│   │   │   └── LinksList.jsx                 # Filterable & copyable links
│   │   ├── App.jsx                           # Root state & API fetch logic
│   │   └── main.jsx                          # React entry point
│   ├── package.json
│   └── vite.config.js
├── pom.xml                                   # Maven dependencies & build
└── README.md
```

---

## ⚡ Quick Start Guide

### Prerequisites
- **Java 17** or higher
- **Maven 3.8+** (or use included `mvnw`)
- *(Optional)* **Node.js 18+** if you want to run the separate Vite React dev server.

---

### Step 1: Run the Backend (with integrated React UI)

Open a terminal in the project root:

```bash
# Using Maven Wrapper (Windows)
mvnw.cmd spring-boot:run

# Using Maven Wrapper (Linux/Mac)
./mvnw spring-boot:run

# Or standard Maven
mvn spring-boot:run
```

Once started, open your web browser and navigate to:
👉 **`http://localhost:8181`**

The full React application is live and ready!

---

### Step 2 (Optional): Run Standalone React Frontend

If you want to run or edit the modular React frontend separately:

```bash
cd frontend
npm install
npm run dev
```

Navigate to:
👉 **`http://localhost:3000`**

*(Requests to `/api` are automatically proxied to Spring Boot on port 8181).*

---

## 📡 REST API Documentation

### 1. Scrape Content
- **Endpoint**: `GET /api/scrape`
- **Parameter**: `url` *(string, required)* - The target URL to scrape.
- **Example**: `http://localhost:8181/api/scrape?url=https://news.ycombinator.com`

**Sample Response (`200 OK`)**:
```json
{
  "url": "https://news.ycombinator.com",
  "title": "Hacker News",
  "success": true,
  "message": "Successfully extracted content from https://news.ycombinator.com",
  "totalImages": 4,
  "totalVideos": 0,
  "totalLinks": 30,
  "images": [
    "https://news.ycombinator.com/y18.svg"
  ],
  "videos": [],
  "links": [
    "https://news.ycombinator.com/newest",
    "https://news.ycombinator.com/front"
  ]
}
```

### 2. Health Check
- **Endpoint**: `GET /api/health`
- **Response**:
```json
{
  "service": "Java-WebScrapper API",
  "status": "UP",
  "developer": "Iqra Khan",
  "github": "https://github.com/IqraKhanZ/Java-WebScrapper"
}
```

---

## 💡 How to Explain This Project in an Interview or Viva

Here is a super simple, 3-minute explanation you can use:

> *"This is a full-stack web scraper application where I built the backend in **Java Spring Boot** and the frontend in **React**.*
> 
> *1. **The Backend**: I created a REST controller exposing a `/api/scrape` endpoint. When a URL is submitted, the backend uses **Jsoup** to connect via HTTP, mimic a real browser with a standard User-Agent header, and parse the HTML DOM. It extracts image tags, video streams, and hyperlinks, converting all relative URLs into absolute URLs using `absUrl()`, and uses a `LinkedHashSet` to eliminate duplicate links.*
> 
> *2. **The Frontend**: Built with **React** using functional components and hooks (`useState`). It sends asynchronous `fetch()` requests to the Spring Boot REST API, renders live statistics, and categorizes the results into interactive tabs for Images, Videos, and Links. Users can filter links instantly with a search input or copy URLs with one click.*
> 
> *3. **Deployment**: To keep deployment and execution clean and simple, Spring Boot serves the React Single Page Application directly from static resources on port 8181, while also enabling CORS so any independent client can access the API."*

### Common Viva / Interview Questions:
1. **Q: Why did you use Jsoup instead of Selenium?**
   - *A: Jsoup is a fast, lightweight HTML parser that directly downloads and parses HTML over HTTP without launching a heavy browser process. Selenium is meant for full browser automation and JavaScript rendering, which requires much more memory and CPU.*
2. **Q: How does `absUrl()` in Jsoup work?**
   - *A: Websites frequently use relative paths like `<img src="/images/logo.png">`. `absUrl("src")` uses the document's base URL to automatically convert relative paths into full absolute URLs like `https://example.com/images/logo.png`.*
3. **Q: How does React communicate with Spring Boot?**
   - *A: React uses JavaScript's native `fetch()` API to send a GET request to `/api/scrape?url=...`. The Spring Boot `@RestController` returns JSON, which React parses and saves in component state with `setData()`, triggering an automatic re-render.*
4. **Q: Why is `@CrossOrigin` needed?**
   - *A: Web browsers enforce the Same-Origin Policy for security. If the React frontend runs on port 3000 and the backend runs on port 8181, `@CrossOrigin` tells the browser that requests from other origins are authorized.*

---

## 👤 Author

**Iqra Khan**
- GitHub: [@IqraKhanZ](https://github.com/IqraKhanZ)
- Repository: [Java-WebScrapper](https://github.com/IqraKhanZ/Java-WebScrapper)

---

## 📄 License

This project is licensed under the MIT License - feel free to use and customize it!

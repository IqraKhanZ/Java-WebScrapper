# Java-WebScrapper

A lightweight full-stack **Web Content Extractor & Scraper** built with **Spring Boot 3**, **Jsoup**, and **React 18**.

[![Java](https://img.shields.io/badge/Java-17%2B-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.2-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Jsoup](https://img.shields.io/badge/Jsoup-1.18.3-blue.svg)](https://jsoup.org/)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38bdf8.svg)](https://tailwindcss.com/)
[![Author](https://img.shields.io/badge/Author-Iqra_Khan-purple.svg)](https://github.com/IqraKhanZ)

---

## 🌟 Overview

**Java-WebScrapper** extracts images, videos, and hyperlinks from any website URL.

- 🖼️ **Images**: Parses `<img>` tags (including lazy-loaded `data-src`) and converts relative URLs to absolute links.
- 🎬 **Videos**: Extracts direct `<video>` tags and `<source>` media streams.
- 🔗 **Links**: Extracts and filters page hyperlinks (`<a href>`).
- 📊 **Metrics**: Captures target page title, domain, and total counts.

---

## 🚀 Features

- **Integrated Full-Stack**: Spring Boot serves the React Single-Page Application (SPA) directly at `http://localhost:8181/` with zero separate build setup required.
- **Modular Frontend**: Includes a clean `frontend/` directory built with React and Vite for standalone development.
- **Clean UI**: Modern responsive design with preview cards, tabs, and 1-click URL copying.
- **Smart URL Normalization**: Automatically adds `https://` if missing.
- **CORS Enabled**: Configured with `@CrossOrigin` for external API clients.

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
│   │   │   │   └── ScrapeResponse.java       # Response DTO
│   │   │   └── WebScrappingApplication.java  # Main application class
│   │   └── resources/
│   │       ├── application.properties        # App configuration (port 8181)
│   │       └── static/
│   │           └── index.html                # Integrated React UI
├── frontend/                                 # Standalone React frontend (Vite)
│   ├── src/
│   │   ├── components/                       # React components
│   │   ├── App.jsx                           # Main React app
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── pom.xml                                   # Maven dependencies
└── README.md
```

---

## ⚡ Getting Started

### Prerequisites
- **Java 17** or higher
- **Maven** (or use included `mvnw`)

### Run the Application

```bash
# Windows
mvnw.cmd spring-boot:run

# Mac / Linux
./mvnw spring-boot:run
```

Once running, open your browser and visit:
👉 **`http://localhost:8181`**

---

### (Optional) Run Frontend in Development Mode

```bash
cd frontend
npm install
npm run dev
```

Visit: `http://localhost:3000`

---

## 📡 API Endpoints

### 1. Scrape Webpage
- **URL**: `GET /api/scrape?url=<target-url>`
- **Example**: `http://localhost:8181/api/scrape?url=https://news.ycombinator.com`

**Response (`200 OK`)**:
```json
{
  "url": "https://news.ycombinator.com",
  "title": "Hacker News",
  "success": true,
  "message": "Successfully extracted content from https://news.ycombinator.com",
  "totalImages": 4,
  "totalVideos": 0,
  "totalLinks": 30,
  "images": ["https://news.ycombinator.com/y18.svg"],
  "videos": [],
  "links": ["https://news.ycombinator.com/newest"]
}
```

### 2. Health Check
- **URL**: `GET /api/health`
- **Response**:
```json
{
  "status": "UP",
  "service": "Java-WebScrapper API",
  "developer": "Iqra Khan",
  "github": "https://github.com/IqraKhanZ/Java-WebScrapper"
}
```

---

## 👤 Author

**Iqra Khan**
- GitHub: [@IqraKhanZ](https://github.com/IqraKhanZ)
- Repository: [Java-WebScrapper](https://github.com/IqraKhanZ/Java-WebScrapper)

---

## 📄 License

This project is licensed under the MIT License.

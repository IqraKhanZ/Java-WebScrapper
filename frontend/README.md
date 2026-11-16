# ⚛️ Java Web Scraper - React Frontend

A clean, modern, and simple React UI for the Java Web Scraper application.

## 🚀 Features

- **Component-Driven**: Built using modular functional components (`Navbar`, `SearchBar`, `StatsCards`, `ImageGallery`, `VideoGallery`, `LinksList`).
- **State Hooks**: Uses React's standard `useState` for query state, async loading spinner, error alerts, and tab transitions.
- **Instant Search & Copy**: Filter scraped links in real-time and copy URLs with one click.
- **Graceful Fallbacks**: Image error fallbacks if remote assets are blocked or broken.

## 🛠️ How to Run Standalone

```bash
# 1. Install dependencies
npm install

# 2. Run Vite development server
npm run dev
```

The React frontend runs on `http://localhost:3000` and automatically proxies `/api` requests to the Spring Boot backend on `http://localhost:8181`.

> **Note:** The Spring Boot backend also serves this exact React interface directly from `src/main/resources/static/index.html` at `http://localhost:8181/` with zero npm build setup required!

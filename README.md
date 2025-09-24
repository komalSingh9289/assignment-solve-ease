## Workers Listing App

A modern dark-themed Workers Listing web application built with Next.js, TypeScript, and Tailwind CSS, featuring lazy-loaded cards, service filtering, pagination, and API integration. This project demonstrates a clean UI/UX design and responsive layout for desktop, tablet, and mobile devices.

## Table of Contents

Features
Tech Stack
Installation
API
Components
Styling


# Features

1. Dark / Black Theme: Modern dark-themed UI with smooth hover effects.

2. Lazy Loading: Workers’ images and cards are lazy-loaded for performance.

3. Skeleton Loading: Shows skeleton placeholders while fetching data.

4. Filtering: Filter workers by service (Plumbing, Cleaning, Electrician) and price range.

5. Pagination: Clean pagination with Next/Prev buttons and only 3 page numbers visible at a time.

6. Responsive Design: Fully responsive for mobile, tablet, and desktop.

7. API Integration: Fetches workers data from /api/workers endpoint.

8. Performance Optimizations:
  useMemo for filtered and paginated data
  Suspense for lazy-loaded cards
  Controlled components for filters

# Tech Stack

Frontend: Next.js (App Router), React, TypeScript
Styling: Tailwind CSS
Data: Static JSON (workers.json) served via API route
Image Handling: Next.js Image component with lazy loading
Skeleton Loader: react-loading-skeleton

#Installation

1. Clone the repository:

2. git clone https://github.com/yourusername/workers-listing.git
3. cd workers-listing

4. Install dependencies:
  npm install
  # or
  yarn

5. Run the development server:
  npm run dev
  # or
  yarn dev


Open http://localhost:3000
 in your browser.


API

Route: /api/workers
Method: GET


Handles errors gracefully with proper response messages.

Components
WorkersCard

1. Dark-themed card component
2. Lazy-loaded image
3. Hover overlay showing price/day
4. Responsive height and hover scale effect
5. Filters & Pagination





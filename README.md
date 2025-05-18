# Conference Explorer

A responsive web application written in Next.js and Typescrypt that allows users to explore conferences using the React Finland GraphQL API.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Implementation Overview](#implementation-overview)
- [Testing](#testing)
- [Accessibility & Performance](#accessibility--performance)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Demo

[Click this demo link 🡥](https://conference-explorer.vercel.app/)

## Features

- **Browse Conferences**: Responsive multi-column grid listing conferences with image, title, dates, location, and slogan.
- **Sorting**: Switch between sorting by date (newest first) or alphabetically by location.
- **Conference Details**: Detailed page showing title, slogan, featured image, dates, venue, city, country, organizer, series information, and a link to the official website. Includes a back button for navigation.
- **Responsive Design**: Optimized for desktop and mobile layouts.
- **Accessibility**: WCAG 2.1 AA compliant with proper semantic HTML, keyboard navigation, and ARIA attributes.
- **Performance**: Optimized data fetching with Apollo Client, image fallbacks for missing images, and Next.js built‑in performance features.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **GraphQL Client**: Apollo Client
- **Styling**: SCSS (with variables)
- **Testing**: Jest (unit tests)
- **Accessibility**: WCAG 2.1 AA standards

## Getting Started

### Prerequisites

- Node.js v14 or higher
- npm or Yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/MarJaysonSanAgustin/conference-explorer.git
   cd conference-explorer
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
API_URL=<YOUR API URL>
```

### Available Scripts

- `npm run dev` or `yarn dev`

  - Runs the app in development mode at `http://localhost:3000`

- `npm run build` or `yarn build`

  - Builds the app for production

- `npm start` or `yarn start`

  - Runs the production build

- `npm test` or `yarn test`

  - Executes unit tests with Jest

## Project Structure

```
├── app/                  # Next.js App Router routes and layouts
│   ├── page.tsx          # Index (conference list) page
│   └── [id]/page.tsx     # Conference details page
├── components/           # Reusable React components (cards, buttons, etc.)
├── styles/               # SCSS global styles and variables
├── constants/            # Reusable constants
├── lib/                  # Reusable libraries
├── types/                # Application wide types
├── tests/                # Jest unit tests
├── public/               # Static assets and images
├── next.config.js        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies and scripts
```

## Implementation Overview

- **Data Fetching**: Used Apollo Client with React hooks to fetch conferences list and individual conference details via GraphQL queries.
- **Routing**: Leveraged Next.js App Router for file-based routing and dynamic route segments (`[id]`).
- **Styling**: Implemented SCSS modules with variables for theming and responsive breakpoints. No external UI/component libraries used.
- **Accessibility**: Ensured semantic markup (e.g., `<main>`, `<section>`, `<button>`), keyboard-focus states, and alt text for images. Implemented skip links for better navigation.
- **Performance**: Utilized Next.js image optimizations, code splitting, and lazy loading for images and components. Provided fallback images to avoid layout shifts.

## Testing

- **Unit Tests**: Built with Jest to cover components, utility functions, and GraphQL queries. Aim for at least 80% coverage.
- **Running Tests**:

  ```bash
  npm test
  # or
  yarn test
  ```

## Accessibility & Performance

- Follows WCAG 2.1 AA standards
- Keyboard navigable and screen reader friendly
- Lighthouse performance score ≥ 90

## Future Enhancements

- Smooth loading transitions and skeleton screens
- Extended test coverage (integration and E2E)
- Dark/light mode support
- Multi-language (i18n)
- SEO optimizations (meta tags, sitemap, etc.)
- Robust error handling and retry logic

## License

[MIT](LICENSE)

---

**Time Spent:** 3 hours and 20 minutes

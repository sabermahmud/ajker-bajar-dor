# 🛒 বাজার দর (Bazar Dor)

**প্রয়োজনীয় পণ্যের দাম এক নজরে।**

বাজার দর is a responsive web application that helps users explore everyday product prices in Bangladesh through a Bengali-friendly interface. Users can browse products, compare price changes, explore categories, and view market-wise pricing information.

🔗 **Live Demo:** https://ajker-bajar-dor-webapp.vercel.app/
📦 **GitHub Repository:** https://github.com/sabermahmud/ajker-bajar-dor

## ✨ Key Features

* **Product Price Overview:** Browse everyday products with current prices and price-change indicators.
* **Price Trends:** Explore products with increasing or decreasing prices.
* **Categories & Sorting:** Browse products by category and sort prices from low to high or high to low.
* **Product Details:** View product summaries, price ranges, and market-wise pricing information.
* **Authentication:** Sign up and sign in using Better Auth with email/password and configured Google/GitHub authentication.
* **Protected Routes:** Restrict product detail pages to authenticated users.
* **Profile Management:** View profile information and update the user's name.
* **Responsive Design:** Optimized layouts for mobile, tablet, and desktop.
* **Loading & Notifications:** Loading placeholders and success/error notifications.

## 🧰 Technologies Used

* Next.js App Router
* React
* TypeScript
* Tailwind CSS
* daisyUI
* Better Auth
* MongoDB
* REST API
* React Toastify
* React Icons
* Vercel

## 🚀 Getting Started

### Prerequisites

* Node.js
* npm
* MongoDB database for authentication

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sabermahmud/ajker-bajar-dor.git
   ```

2. Enter the project directory:

   ```bash
   cd ajker-bajar-dor
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file and configure the environment variables required by your authentication setup:

   ```env
   BETTER_AUTH_DB_URL=
   BETTER_AUTH_URL=http://localhost:3000
   BETTER_AUTH_SECRET=
   ```

   Configure the Google and GitHub OAuth credentials using the exact variable names in your auth configuration. Never commit secrets to GitHub.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open http://localhost:3000 in your browser.

## 📜 Available Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Create a production build    |
| `npm run start` | Start the production server  |
| `npm run lint`  | Run ESLint                   |

## 🌐 API Endpoints

**Base URL:** `https://openapi.programming-hero.com/api/bazardor/products`

| Endpoint                  | Description                 |
| ------------------------- | --------------------------- |
| `/products`               | Get all products            |
| `/products?category=chal` | Filter products by category |
| `/products/1`             | Get a single product        |
| `/categories`             | Get all categories          |
| `/categories/chal`        | Get a single category       |

Alternative API: `https://api.abcz.workers.dev/api/bazardor`

## 🚢 Deployment

The application is deployed on Vercel.

For deployment, configure the required database, Better Auth, and OAuth environment variables in Vercel. Set the production `BETTER_AUTH_URL` to your deployed domain and configure the appropriate Google/GitHub OAuth redirect URLs.

After deployment, test authentication, product details, category pages, and direct URL refreshes.

## ⚠️ Price Disclaimer

Displayed prices are indicative and may change depending on market conditions. Please verify prices with the relevant market before making purchasing decisions.

---

Built with ❤️ by **MD Saber Mahmud**.

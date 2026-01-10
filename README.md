# Rentopia — Frontend

**Rentopia** is a modern, peer-to-peer rental marketplace frontend built with **Next.js**.  
It allows users to rent items or list their own items for earning, with a clean UI, real-time availability handling, and analytics dashboards.

📍 **Currently focused on Chittagong, Bangladesh**

---

## ✨ Key Features

### 🧑 User Experience
- Browse rental items by category
- View item availability and pricing per day
- Secure payment flow with instant invoice access
- Download or preview invoices directly after payment
- Responsive and accessible UI

### 📊 Dashboards
- **User Overview**
  - Active & completed rentals
  - Earnings and spending analytics
  - Visual charts for better insights

- **Admin Overview**
  - Platform statistics (users, items, orders, revenue)
  - Analytics charts for monitoring activity

### 🧠 Smart UI Logic
- Prevents double bookings using real-time availability
- Dynamic status updates for rented items
- Server-side rendering for secure and fast data fetching

---

## 🛠 Tech Stack

**Frontend**  
- **Next.js**  
- **TypeScript**  
- **Tailwind CSS**  
- **Shadcn/UI**  
- **Chart.js / Recharts** (for analytics)  

**Backend (consumed via API)**  
- **Node.js / Express**  
- **MongoDB / Mongoose**  
- **JWT + bcrypt** for secure authentication
- **SSLCommerz** for secure payment
- **Node-cron** for cron-jobs

---

## 📁 Structure (Simplified)

```txt
app/
├── (public)/
├── dashboard/
│   ├── admin/
│   └── user/
├── components/
├── server-actions/
└── styles/

---

## 🔐 Authentication

- Cookie-based authentication

- Role-based dashboard rendering (Admin / User)

- Protected routes with server-side validation

---

## 🛠️ Installation & Setup

If you’d like to run the portfolio locally:

```bash
# Clone the repository
git clone https://github.com/Abrar9410/My-Portfolio.git

# Navigate into the project directory
cd My-Portfolio

# Install dependencies
npm install

# Create a .env.local file for environment variables
NEXT_PUBLIC_BASE_API=your_backend_api
NEXT_PUBLIC_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_USER_ID=your_emailjs_public_key

# Run the development server
npm run dev
```
Your app will be live at http://localhost:3000

## 📁 Folder Structure
```bash
src/
 ├── app/                   # Next.js app router pages
 │    ├── (routes)/
 │    ├── layout.tsx
 │    ├── loading.tsx
 │    ├── error.tsx
 │    ├── not-found.tsx
 ├── components/            # Reusable UI components (shadcn/ui based)
 ├── actions/               # Server actions (for revalidation, blogs, etc.)
 ├── hooks/                 # Custom React hooks
 ├── lib/                   # Utility functions and configurations
 ├── providers/             # Providers
 └── types/                 # TypeScript type definitions
 └── proxy.ts          # Middleware
```

## 🚀 Live Demo

👉 **[Live Link](https://rentopi-crg.vercel.app)**

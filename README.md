# 🍽️ Restaurant Analytics & Order Management Dashboard

A modern **restaurant analytics and order management dashboard** built with **Next.js (App Router)** on the frontend and designed to integrate seamlessly with a **Laravel / PHP backend API**.

---

## 🚀 Features

### Frontend
- Next.js App Router + TypeScript
- Tailwind CSS UI
- Analytics dashboard (orders, revenue, peak hours)
- Orders table with filters:
  - Date range (`createdAt`)
  - Hour range
  - Min / Max order amount
- Pagination
- SSR-safe (no hydration issues)
- Clean, reusable components

### Backend (Planned)
- Laravel / PHP REST API
- MySQL / PostgreSQL
- JWT / Sanctum authentication
- Server-side filtering & pagination

---

## 🧱 Tech Stack

- Next.js 14+
- React
- TypeScript
- Tailwind CSS
- Laravel (planned backend)

---

## 📁 Folder Structure

app/
├── dashboard/
│   └── page.tsx
├── orders/
│   └── page.tsx
├── data/
│   ├── Orders.ts
│   └── analytics.ts
├── components/
│   ├── filters/
│   │   └── DateRangeFilter.tsx
│   ├── Chart.tsx
│   └── StatCard.tsx
├── libs/
│   └── date.ts

---

## 📊 Order Data Model

```ts
{
  id: number,
  restaurantId: number,
  amount: number,
  createdAt: string
}
```

Example:
```ts
{
  id: 1,
  restaurantId: 102,
  amount: 996,
  createdAt: "2025-06-24T15:00:00"
}
```

---

## 🔌 Laravel API Integration

Recommended endpoints:

GET /api/orders  
GET /api/orders?startDate=&endDate=&minAmount=&maxAmount=&hour=  
GET /api/analytics/overview  

---

## 🛠️ Setup

```bash
npm install
npm run dev
```

---

## 📌 Future Enhancements

- Authentication
- Role-based dashboards
- CSV export
- Real-time updates
- Server-side analytics

---

MIT License

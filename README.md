🍽️ Restaurant Analytics & Order Management Dashboard

A modern restaurant analytics and order management dashboard built with Next.js (App Router) on the frontend and designed to integrate seamlessly with a Laravel / PHP backend API.

This project demonstrates real-world dashboard features such as filtering, pagination, analytics visualization, and scalable architecture suitable for production systems.

🚀 Features Overview
✅ Frontend (Next.js + TypeScript)

Restaurant Analytics Dashboard

Daily orders

Daily revenue

Average order value

Peak order hours

Top restaurants by revenue

Orders Management Page

Filter orders by:

Date range (createdAt)

Hour range (0–23)

Minimum / Maximum order amount

Client-side pagination

Responsive, clean UI

No hydration errors (SSR-safe)

Reusable UI Components

Filter components

Charts

Stat cards

Tables

Production-grade Code Practices

useMemo for performance

Safe state resets

Typed data models

Clean folder structure

Interview-ready comments

🧱 Tech Stack
Frontend

Next.js 14+ (App Router)

React

TypeScript

Tailwind CSS

Client-side state with React Hooks

Backend (Planned / Integratable)

Laravel (PHP)

RESTful API

MySQL / PostgreSQL

JWT / Sanctum authentication

📁 Project Structure
app/
├── dashboard/
│   └── page.tsx        # Analytics dashboard
├── orders/
│   └── page.tsx        # Orders table with filters
├── data/
│   ├── Orders.ts       # Mock orders data
│   └── analytics.ts   # Analytics helpers
├── components/
│   ├── filters/
│   │   └── DateRangeFilter.tsx
│   ├── Chart.tsx
│   └── StatCard.tsx
├── libs/
│   └── date.ts         # Date utilities
📊 Order Data Model

The application currently uses a mock dataset with the following structure:

{
  id: number,
  restaurantId: number,
  amount: number,
  createdAt: string // ISO format
}

Example:

{
  id: 1,
  restaurantId: 102,
  amount: 996,
  createdAt: "2025-06-24T15:00:00"
}

This structure directly maps to a typical Laravel Eloquent model.

🔍 Orders Page – Filters Implemented
Filter Type	Description
Date Range	Uses createdAt ISO string
Hour Range	Extracted from createdAt
Min Amount	Numeric filter
Max Amount	Numeric filter
Pagination	Configurable page size

All filters are:

Stateless-safe

SSR compatible

Easily transferable to backend queries

📈 Analytics Dashboard

Top restaurants by revenue

Revenue-based ranking

Extendable to:

Monthly analytics

Category-based insights

Growth comparisons

🔌 Backend Integration (Laravel / PHP)

The frontend is backend-ready and can be connected to a Laravel API with minimal changes.

Recommended Laravel API Endpoints
GET /api/orders
GET /api/orders?startDate=&endDate=&minAmount=&maxAmount=&hour=
GET /api/analytics/overview
GET /api/restaurants/top
Laravel Controller Example
public function orders(Request $request)
{
    return Order::query()
        ->when($request->startDate, fn ($q) =>
            $q->whereDate('created_at', '>=', $request->startDate)
        )
        ->when($request->endDate, fn ($q) =>
            $q->whereDate('created_at', '<=', $request->endDate)
        )
        ->when($request->minAmount, fn ($q) =>
            $q->where('amount', '>=', $request->minAmount)
        )
        ->when($request->maxAmount, fn ($q) =>
            $q->where('amount', '<=', $request->maxAmount)
        )
        ->paginate(10);
}
🔁 Frontend ↔ Backend Migration Plan
Current	Future
Static mock data	API fetch
Client filtering	Server-side filtering
Client pagination	Laravel pagination
Local analytics	Aggregated SQL queries

The UI does not need to change — only the data source.

🧠 Interview Highlights

This project demonstrates:

Real-world dashboard architecture

SSR-safe React development

Clean separation of concerns

Scalable filter logic

Backend-ready frontend design

Practical analytics implementation

🛠️ Setup Instructions
git clone <repo-url>
cd project
npm install
npm run dev

Open:

http://localhost:3000
📌 Future Enhancements

Authentication (Laravel Sanctum)

Role-based dashboards

CSV export

Real-time updates (WebSockets)

Charts with Recharts / Chart.js

Admin panel

📄 License

MIT License

👨‍💻 Author

Built for learning, interviews, and production-grade demonstrations.
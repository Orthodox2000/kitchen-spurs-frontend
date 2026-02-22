"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const path = usePathname()

  return (
    <aside className="w-64 bg-emerald-600 text-white p-6 space-y-6">
      <h1 className="text-xl font-semibold">Restaurant Analytics</h1>

      <nav className="space-y-3">
        <Link href="/" className={`block ${path === "/" ? "font-bold" : ""}`}>
          Dashboard
        </Link>
        <Link href="/restaurants" className={`block ${path.startsWith("/restaurants") ? "font-bold" : ""}`}>
          Restaurants
        </Link>
        <Link href="/orders" className={`block ${path.startsWith("/orders") ? "font-bold" : ""}`}>
          Orders
        </Link>
      </nav>
    </aside>
  )
}
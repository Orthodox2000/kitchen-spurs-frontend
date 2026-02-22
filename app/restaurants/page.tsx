"use client"

import Link from "next/link"
import { restaurants } from "@/app/data/restaurants"

export default function RestaurantsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-black">Restaurants</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {restaurants.map(r => (
          <Link
            key={r.id}
            href={`/restaurants/${r.id}`}
            className="bg-white p-5 rounded-lg border hover:shadow transition "
          >
            <h3 className="font-semibold text-black">{r.name}</h3>
            <p className="text-sm text-gray-500 text-black">
              {r.cuisine} • {r.location}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
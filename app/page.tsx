"use client"

import { useEffect, useMemo, useState } from "react"
import { analytics } from "@/app/data/analytics"

/* ------------------ TYPES ------------------ */
type TopRestaurant = {
  id: number
  name: string
  revenue: number
  peakHour: number
}

const PAGE_SIZE = 6

/* ------------------ DASHBOARD ------------------ */
export default function Dashboard() {
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState<"revenue" | "name">("revenue")
  const [hourRange, setHourRange] = useState<[number, number]>([0, 23])
  const [amountRange, setAmountRange] = useState<[number, number]>([0, 100000])
  const [page, setPage] = useState(1)

  /* ------------------ FILTER + SORT ------------------ */
  const filteredRestaurants = useMemo(() => {
    let data: TopRestaurant[] = [...analytics.topRestaurants]

    if (search) {
      data = data.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    data = data.filter(r => {
      return (
        r.peakHour >= hourRange[0] &&
        r.peakHour <= hourRange[1] &&
        r.revenue >= amountRange[0] &&
        r.revenue <= amountRange[1]
      )
    })

    data.sort((a, b) =>
      sortBy === "revenue"
        ? b.revenue - a.revenue
        : a.name.localeCompare(b.name)
    )

    return data
  }, [search, sortBy, hourRange, amountRange])

  /* ------------------ PAGINATION ------------------ */
  const totalPages = Math.max(
    1,
    Math.ceil(filteredRestaurants.length / PAGE_SIZE)
  )

  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filteredRestaurants.slice(start, start + PAGE_SIZE)
  }, [filteredRestaurants, page])

  useEffect(() => {
    if (page > totalPages) setPage(1)
  }, [page, totalPages])

  /* ------------------ UI ------------------ */
  return (
    <div className="space-y-8 p-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-black">
          Analytics Dashboard
        </h1>
        <p className="text-sm text-black">
          Top restaurants ranked by revenue with advanced filters
        </p>
      </div>

      {/* FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 bg-white border rounded-lg p-5">
        <Filter label="Search">
          <input
            className="border rounded px-2 py-1 border border-gray-700 text-black"
            placeholder="Restaurant name"
            value={search}
            onChange={e => {
              setSearch(e.target.value)
              setPage(1)
            }}
          />
        </Filter>

        <Filter label="Sort By">
          <select
            className="border rounded px-2 py-1  border-gray-700 text-black"
            value={sortBy}
            onChange={e => {
              setSortBy(e.target.value as any)
              setPage(1)
            }}
          >
            <option value="revenue">Revenue</option>
            <option value="name">Name</option>
          </select>
        </Filter>

        <Filter label="Peak Hour">
          <input
            type="range"
            min={0}
            max={23}
            value={hourRange[1]}
            onChange={e => {
              setHourRange([0, Number(e.target.value)])
              setPage(1)
            }}
          />
          <span className="text-xs text-gray-500">
            0:00 – {hourRange[1]}:00
          </span>
        </Filter>

        <Filter label="Min Revenue ₹">
          <input
            type="number"
            className="border rounded px-2 py-1  border-gray-700 text-black"
            value={amountRange[0]}
            onChange={e => {
              setAmountRange([Number(e.target.value), amountRange[1]])
              setPage(1)
            }}
          />
        </Filter>

        <Filter label="Max Revenue ₹">
          <input
            type="number"
            className="border rounded px-2 py-1  border-gray-700 text-black"
            value={amountRange[1]}
            onChange={e => {
              setAmountRange([amountRange[0], Number(e.target.value)])
              setPage(1)
            }}
          />
        </Filter>
      </div>

      {/* RESULTS */}
      {paginatedData.length === 0 ? (
        <p className="text-sm text-gray-500">No restaurants match filters.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paginatedData.map(r => (
            <div
              key={r.id}
              className="bg-white border rounded-lg p-6 shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-md"
            >
              <h4 className="font-medium text-black">{r.name}</h4>

              <p className="text-emerald-600 font-semibold text-xl mt-2">
                ₹ {r.revenue.toLocaleString()}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Peak Hour: {r.peakHour}:00
              </p>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  )
}

/* ------------------ FILTER WRAPPER ------------------ */
function Filter({
  label,
  children
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-black">{label}</label>
      {children}
    </div>
  )
}
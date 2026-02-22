// app/orders/page.tsx
"use client"

import { useMemo, useState } from "react"
import { orders, Order } from "@/app/data/Orders"
import DateRangeFilter from "@/app/components/filters/DateRangeFilter"
import { extractDate } from "@/app/libs/date"

/* ------------------ CONSTANTS ------------------ */
const PAGE_SIZE = 8

export default function OrdersPage() {
  /* ------------------ FILTER STATES ------------------ */
  const [startDate, setStartDate] = useState<string | undefined>()
  const [endDate, setEndDate] = useState<string | undefined>()
  const [hourRange, setHourRange] = useState<[number, number]>([0, 23])
  const [minAmount, setMinAmount] = useState<number | undefined>()
  const [maxAmount, setMaxAmount] = useState<number | undefined>()
  const [page, setPage] = useState(1)

  /* ------------------ FILTER LOGIC ------------------ */
  const filteredOrders = useMemo(() => {
    return orders.filter((order: Order) => {
      const date = extractDate(order.createdAt)
      const hour = new Date(order.createdAt).getHours()

      // Date range filter
      if (startDate && date < startDate) return false
      if (endDate && date > endDate) return false

      // Hour range filter
      if (hour < hourRange[0] || hour > hourRange[1]) return false

      // Amount filter
      if (minAmount !== undefined && order.amount < minAmount) return false
      if (maxAmount !== undefined && order.amount > maxAmount) return false

      return true
    })
  }, [startDate, endDate, hourRange, minAmount, maxAmount])

  /* ------------------ PAGINATION ------------------ */
  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / PAGE_SIZE))

  const paginatedOrders = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filteredOrders.slice(start, start + PAGE_SIZE)
  }, [filteredOrders, page])

  /* Reset page safely when filters change */
  if (page > totalPages) {
    setPage(1)
  }

  /* ------------------ UI ------------------ */
  return (
    <div className="p-6 space-y-6 text-gray-600">
      <h1 className="text-2xl font-semibold text-black">Orders</h1>

      {/* ------------------ FILTERS ------------------ */}
      <div className="bg-white border rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date Range */}
        <DateRangeFilter
          startDate={startDate}
          endDate={endDate}
          onChange={(range) => {
            setStartDate(range.startDate)
            setEndDate(range.endDate)
            setPage(1)
          }}
        />

        {/* Hour Range */}
        <div>
          <label className="text-sm font-medium">Peak Hour</label>
          <input
            type="range"
            min={0}
            max={23}
            value={hourRange[1]}
            onChange={(e) => {
              setHourRange([0, Number(e.target.value)])
              setPage(1)
            }}
            className="w-full"
          />
          <p className="text-xs text-gray-500">
            00:00 – {hourRange[1]}:00
          </p>
        </div>

        {/* Min Amount */}
        <div>
          <label className="text-sm font-medium">Min Amount</label>
          <input
            type="number"
            placeholder="₹ 0"
            className="border rounded px-3 py-2 w-full"
            value={minAmount ?? ""}
            onChange={(e) => {
              setMinAmount(
                e.target.value ? Number(e.target.value) : undefined
              )
              setPage(1)
            }}
          />
        </div>

        {/* Max Amount */}
        <div>
          <label className="text-sm font-medium">Max Amount</label>
          <input
            type="number"
            placeholder="₹ 10000"
            className="border rounded px-3 py-2 w-full"
            value={maxAmount ?? ""}
            onChange={(e) => {
              setMaxAmount(
                e.target.value ? Number(e.target.value) : undefined
              )
              setPage(1)
            }}
          />
        </div>
      </div>

      {/* ------------------ TABLE ------------------ */}
      <div className="overflow-x-auto border rounded text-black">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Restaurant</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Amount</th>
            </tr>
          </thead>

          <tbody>
            {paginatedOrders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">#{order.restaurantId}</td>
                <td className="px-4 py-2">
                  {extractDate(order.createdAt)}
                </td>
                <td className="px-4 py-2">₹{order.amount}</td>
              </tr>
            ))}

            {paginatedOrders.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-6 text-gray-500"
                >
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ------------------ PAGINATION ------------------ */}
      <div className="flex justify-center items-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  )
}
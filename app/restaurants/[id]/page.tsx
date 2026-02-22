"use client"

import { useParams } from "next/navigation"
import { orders } from "@/app/data/Orders"
import { getRestaurantAnalytics } from "@/app/data/analytics" 

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white p-5 rounded-lg border shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-lg font-semibold text-emerald-600 mt-1">
        {value}
      </p>
    </div>
  )
}

export default function RestaurantDashboard() {
  const params = useParams()
  const restaurantId = Number(params.id)

  if (!restaurantId) {
    return <div className="p-6">Invalid restaurant</div>
  }

  const analytics = getRestaurantAnalytics(orders, restaurantId)

  const totalOrders = analytics.dailyOrders.reduce((a, b) => a + b, 0)
  const totalRevenue = analytics.dailyRevenue.reduce((a, b) => a + b, 0)

  const avgOrder =
    totalOrders > 0
      ? Math.round(totalRevenue / totalOrders)
      : 0

  const peakHour =
    analytics.peakHours.length > 0
      ? Math.max(...analytics.peakHours)
      : 0

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-semibold text-black">
        Restaurant {restaurantId} Analytics
      </h2>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Orders" value={String(totalOrders)} />
        <StatCard title="Total Revenue" value={`₹${totalRevenue}`} />
        <StatCard title="Avg Order" value={`₹${avgOrder}`} />
        <StatCard title="Peak Hour" value={`${peakHour}:00`} />
      </div>

      {/* CHARTS */}
      <Chart
        title="Daily Orders"
        data={analytics.dailyOrders}
        labels={analytics.labels}
      />

      <Chart
        title="Daily Revenue"
        data={analytics.dailyRevenue}
        labels={analytics.labels}
        unit="₹"
      />

      <Chart
        title="Average Order Value"
        data={analytics.avgOrderValue}
        labels={analytics.labels}
        unit="₹"
      />

      <Chart
        title="Peak Order Hour"
        data={analytics.peakHours}
        labels={analytics.labels}
      />
    </div>
  )
}
function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white p-5 rounded-lg border shadow-sm hover:scale-[1.02] transition">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-lg font-semibold text-emerald-600 mt-1">{value}</p>
    </div>
  )
} 
 
type ChartProps = {
  title: string
  data: number[]
  labels?: string[]
  unit?: string
}

export  function Chart({
  title,
  data,
  labels = [],
  unit = ""
}: ChartProps) {
  const max = Math.max(...data, 1)

  const xLabels =
    labels.length === data.length
      ? labels
      : data.map((_, i) => `Day ${i + 1}`)

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <h4 className="font-semibold mb-4">{title}</h4>

      {/* MAIN CHART WRAPPER — FIX */}
      <div className="flex h-64 relative">
        {/* Y AXIS */}
        <div className="flex flex-col justify-between text-xs text-gray-500 pr-3">
          {[...Array(5)].map((_, i) => {
            const value = Math.round((max / 4) * (4 - i))
            return (
              <span key={i}>
                {unit}
                {value}
              </span>
            )
          })}
        </div>

        {/* CHART AREA */}
        <div className="flex-1 flex flex-col h-full">
          {/* BAR AREA — MUST HAVE h-full */}
          <div className="flex-1 flex items-end gap-4 h-full">
            {data.map((value, index) => (
              <div key={index} className="flex-1 h-full flex items-end">
                <div
                  className="w-full bg-emerald-500 rounded-md transition-all duration-300 hover:bg-emerald-600"
                  style={{
                    height: `${(value / max) * 100}%`
                  }}
                />
              </div>
            ))}
          </div>

          {/* X AXIS */}
          <div className="flex gap-4 mt-3 text-xs text-gray-600">
            {xLabels.map((label, index) => (
              <div key={index} className="flex-1 text-center">
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
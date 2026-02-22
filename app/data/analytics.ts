
import { Order } from "./Orders"
export type TopRestaurant = {
  id: number
  name: string
  revenue: number
  peakHour: number
}
export const analyticsData = {
  dailyOrders: [
    { date: "Mon", value: 24 },
    { date: "Tue", value: 31 },
    { date: "Wed", value: 28 },
    { date: "Thu", value: 35 },
    { date: "Fri", value: 42 },
    { date: "Sat", value: 55 },
    { date: "Sun", value: 47 }
  ],
  dailyRevenue: [
    { date: "Mon", value: 8400 },
    { date: "Tue", value: 11200 },
    { date: "Wed", value: 9800 },
    { date: "Thu", value: 12500 },
    { date: "Fri", value: 16400 },
    { date: "Sat", value: 21200 },
    { date: "Sun", value: 18600 }
  ],
  avgOrderValue: [
    { date: "Mon", value: 350 },
    { date: "Tue", value: 360 },
    { date: "Wed", value: 340 },
    { date: "Thu", value: 355 },
    { date: "Fri", value: 390 },
    { date: "Sat", value: 385 },
    { date: "Sun", value: 375 }
  ],
  peakHours: [
    { date: "Mon", hour: 20 },
    { date: "Tue", hour: 21 },
    { date: "Wed", hour: 20 },
    { date: "Thu", hour: 22 },
    { date: "Fri", hour: 22 },
    { date: "Sat", hour: 21 },
    { date: "Sun", hour: 20 }
  ],
  topRestaurants: [
    { id: 104, name: "Burger Hub", revenue: 92000 },
    { id: 101, name: "Tandoori Treats", revenue: 87000 },
    { id: 103, name: "Pasta Palace", revenue: 74000 }
  ]
}

export const analytics = {
  dailyOrders: [24, 31, 28, 35, 42, 55, 47],
  dailyRevenue: [8400, 11200, 9800, 12500, 16400, 21200, 18600],
  avgOrderValue: [350, 360, 340, 355, 390, 385, 375],
  peakHours: [20, 21, 20, 22, 22, 21, 20],
  topRestaurants: [
  {
    id: 104,
    name: "Burger Hub",
    revenue: 92000,
    peakHour: 21
  },
  {
    id: 101,
    name: "Tandoori Treats",
    revenue: 87000,
    peakHour: 20
  },
  {
    id: 103,
    name: "Pasta Palace",
    revenue: 74000,
    peakHour: 22
  }
]
}


export function getRestaurantAnalytics(
  orders: Order[],
  restaurantId: number,
  startDate?: string,
  endDate?: string
) {
  const filtered = orders.filter(o => {
    if (o.restaurantId !== restaurantId) return false
    if (startDate && o.createdAt < startDate) return false
    if (endDate && o.createdAt > endDate) return false
    return true
  })

  const byDay: Record<string, Order[]> = {}

  filtered.forEach(order => {
    const day = order.createdAt.split("T")[0]
    byDay[day] ??= []
    byDay[day].push(order)
  })

  const labels = Object.keys(byDay)

  const dailyOrders = labels.map(d => byDay[d].length)
  const dailyRevenue = labels.map(d =>
    byDay[d].reduce((s, o) => s + o.amount, 0)
  )
  const avgOrderValue = dailyRevenue.map(
    (rev, i) => Math.round(rev / dailyOrders[i])
  )

  const peakHours = labels.map(d => {
    const hours: Record<number, number> = {}
    byDay[d].forEach(o => {
      const h = new Date(o.createdAt).getHours()
      hours[h] = (hours[h] ?? 0) + 1
    })
    return Number(
      Object.entries(hours).sort((a, b) => b[1] - a[1])[0][0]
    )
  })

  return {
    labels,
    dailyOrders,
    dailyRevenue,
    avgOrderValue,
    peakHours
  }
}
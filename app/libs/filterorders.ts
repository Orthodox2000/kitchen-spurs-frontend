// lib/filterOrders.ts
import { Order } from "@/app/data/Orders"
import { isWithinRange } from "./date"

interface Filters {
  minAmount?: number
  maxAmount?: number
  startDate?: string
  endDate?: string
  hourRange?: [number, number]
}

export function filterOrders(
  orders: Order[],
  filters: Filters
): Order[] {
  return orders.filter((order) => {
    // Amount filter
    if (
      filters.minAmount !== undefined &&
      order.amount < filters.minAmount
    )
      return false

    if (
      filters.maxAmount !== undefined &&
      order.amount > filters.maxAmount
    )
      return false

    // Date range filter (createdAt)
    if (
      !isWithinRange(
        order.createdAt,
        filters.startDate,
        filters.endDate
      )
    )
      return false

    // Hour range filter
    if (filters.hourRange) {
      const hour = new Date(order.createdAt).getHours()
      const [start, end] = filters.hourRange
      if (hour < start || hour > end) return false
    }

    return true
  })
}
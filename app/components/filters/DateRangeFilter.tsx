// components/DateRangeFilter.tsx
"use client"

interface Props {
  startDate?: string
  endDate?: string
  onChange: (range: {
    startDate?: string
    endDate?: string
  }) => void
}

export default function DateRangeFilter({
  startDate,
  endDate,
  onChange,
}: Props) {
  return (
    <div className="flex gap-4 flex-wrap">
      <div>
        <label className="text-sm text-black mr-2">
          Start Date
        </label>
        <input
          type="date"
          value={startDate ?? ""}
          onChange={(e) =>
            onChange({ startDate: e.target.value, endDate })
          }
          className="border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="text-sm text-black mr-2">
          End Date
        </label>
        <input
          type="date"
          value={endDate ?? ""}
          onChange={(e) =>
            onChange({ startDate, endDate: e.target.value })
          }
          className="border rounded px-3 py-2"
        />
      </div>
    </div>
  )
}
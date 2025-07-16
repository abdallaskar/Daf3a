import React from "react";

const DAYS = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

export default function AvailabilitySelection({
  availability = [],
  onAddDay,
  onRemoveDay,
  onAddSlot,
  onRemoveSlot,
  tempSlots = [],
  onTempSlotChange,
  selectedDay = "",
  onSelectedDayChange,
  slotStart = "",
  slotEnd = "",
  onSlotStartChange,
  onSlotEndChange,
  error = "",
  success = "",
  disabled = false,
}) {
  return (
    <section className="bg-surface card shadow-xl p-8 rounded-2xl">
      <h2 className="text-xl font-bold font-poppins text-primary mb-6">Availability</h2>
      <div className="flex gap-2 mb-4">
        <select
          className="input-field px-2 py-1"
          value={selectedDay}
          onChange={e => onSelectedDayChange(e.target.value)}
          disabled={disabled}
        >
          <option value="">Select day</option>
          {DAYS.filter(day => !availability.some(a => a.day === day)).map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </div>
      {selectedDay && (
        <div className="mb-4 border border-default rounded-lg p-4 bg-background">
          <div className="font-semibold text-primary mb-2">{selectedDay}</div>
          <div className="flex gap-2 items-end mb-2">
            <div>
              <label className="block text-xs text-secondary mb-1">Start</label>
              <input
                className="input-field px-2 py-1 text-sm"
                type="time"
                value={slotStart}
                onChange={e => onSlotStartChange(e.target.value)}
                disabled={disabled}
              />
            </div>
            <div>
              <label className="block text-xs text-secondary mb-1">End</label>
              <input
                className="input-field px-2 py-1 text-sm"
                type="time"
                value={slotEnd}
                onChange={e => onSlotEndChange(e.target.value)}
                disabled={disabled}
              />
            </div>
            <button
              className="btn-secondary px-2 py-1 text-xs"
              type="button"
              onClick={onAddSlot}
              disabled={disabled}
            >
              + Add Slot
            </button>
          </div>
          {error && <div className="text-xs text-red-500 mb-2">{error}</div>}
          {success && <div className="text-xs text-green-600 mb-2">{success}</div>}
          <div className="flex flex-wrap gap-2 mb-2">
            {tempSlots.length === 0 && <span className="text-xs text-secondary">No slots added yet.</span>}
            {tempSlots.map(([start, end], idx) => (
              <span key={idx} className="flex items-center bg-primary-light text-primary text-xs font-medium px-2 py-1 rounded-full">
                {start} - {end}
                <button
                  className="ml-2 text-red-500 hover:underline"
                  type="button"
                  onClick={() => onTempSlotChange(idx)}
                  disabled={disabled}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <button
            className="btn-primary px-3 py-1 text-sm mt-2"
            type="button"
            onClick={onAddDay}
            disabled={tempSlots.length === 0 || disabled}
          >
            Save Day & Slots
          </button>
        </div>
      )}
      <div className="space-y-4">
        {(availability.length === 0) && (
          <p className="text-secondary text-sm mb-2">No availability set. Add a day to begin.</p>
        )}
        {availability.map(({ day, slots }) => (
          <div key={day} className="border border-default rounded-lg p-4 bg-background">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-primary">{day}</span>
              <button
                className="text-xs text-red-500 hover:underline"
                type="button"
                onClick={() => onRemoveDay(day)}
                disabled={disabled}
              >
                Remove Day
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {slots.length === 0 && <span className="text-xs text-secondary">No slots added.</span>}
              {slots.map((slot, idx) => (
                <span key={idx} className="flex items-center bg-primary-light text-primary text-xs font-medium px-2 py-1 rounded-full">
                  {slot}
                  <button
                    className="ml-2 text-red-500 hover:underline"
                    type="button"
                    onClick={() => onRemoveSlot(day, idx)}
                    disabled={disabled}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

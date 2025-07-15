import React, { useState } from "react";
<section className="bg-surface card shadow-xl p-8 rounded-2xl">
  <h2 className="text-xl font-bold font-poppins text-primary mb-6">
    Availability
  </h2>
  <AvailabilitySection
    availability={availability}
    setAvailability={setAvailability}
  />
</section>;
const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function AvailabilitySection() {
  const [availability, setAvailability] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [slotStart, setSlotStart] = useState("");
  const [slotEnd, setSlotEnd] = useState("");
  const [tempSlots, setTempSlots] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Helper to check for slot overlap
  function isOverlap(newStart, newEnd, slots) {
    const newStartMins = parseInt(newStart.split(":").join(""), 10);
    const newEndMins = parseInt(newEnd.split(":").join(""), 10);
    return slots.some(([start, end]) => {
      const startMins = parseInt(start.split(":").join(""), 10);
      const endMins = parseInt(end.split(":").join(""), 10);
      return newStartMins < endMins && newEndMins > startMins;
    });
  }

  // Add a slot to tempSlots
  const handleAddSlot = () => {
    setError("");
    setSuccess("");
    if (!slotStart || !slotEnd) {
      setError("Both start and end times are required.");
      return;
    }
    if (slotStart >= slotEnd) {
      setError("Start time must be before end time.");
      return;
    }
    if (isOverlap(slotStart, slotEnd, tempSlots)) {
      setError("This slot overlaps with an existing slot.");
      return;
    }
    setTempSlots([...tempSlots, [slotStart, slotEnd]]);
    setSlotStart("");
    setSlotEnd("");
    setSuccess("Slot added.");
  };

  // Remove a slot from tempSlots
  const handleRemoveTempSlot = (idx) => {
    setTempSlots(tempSlots.filter((_, i) => i !== idx));
  };

  // Add a new day with its slots
  const handleAddDay = () => {
    setError("");
    setSuccess("");
    if (!selectedDay) {
      setError("Select a day.");
      return;
    }
    if (tempSlots.length === 0) {
      setError("Add at least one slot for this day.");
      return;
    }
    if (availability.some((a) => a.day === selectedDay)) {
      setError("Day already added.");
      return;
    }
    setAvailability([
      ...availability,
      {
        day: selectedDay,
        slots: tempSlots.map(([start, end]) => `${start}-${end}`),
      },
    ]);
    setSelectedDay("");
    setTempSlots([]);
    setSuccess("Day and slots added.");
  };

  // Remove a day
  const handleRemoveDay = (day) => {
    setAvailability(availability.filter((a) => a.day !== day));
  };

  // Remove a slot from a day
  const handleRemoveSlot = (day, slotIdx) => {
    setAvailability(
      availability.map((a) =>
        a.day === day
          ? { ...a, slots: a.slots.filter((_, i) => i !== slotIdx) }
          : a
      )
    );
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <select
          className="input-field px-2 py-1"
          value={selectedDay}
          onChange={(e) => {
            setSelectedDay(e.target.value);
            setTempSlots([]);
            setError("");
            setSuccess("");
          }}
        >
          <option value="">Select day</option>
          {DAYS.filter((day) => !availability.some((a) => a.day === day)).map(
            (day) => (
              <option key={day} value={day}>
                {day}
              </option>
            )
          )}
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
                onChange={(e) => setSlotStart(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-secondary mb-1">End</label>
              <input
                className="input-field px-2 py-1 text-sm"
                type="time"
                value={slotEnd}
                onChange={(e) => setSlotEnd(e.target.value)}
              />
            </div>
            <button
              className="btn-secondary px-2 py-1 text-xs"
              type="button"
              onClick={handleAddSlot}
            >
              + Add Slot
            </button>
          </div>
          {error && <div className="text-xs text-red-500 mb-2">{error}</div>}
          {success && (
            <div className="text-xs text-green-600 mb-2">{success}</div>
          )}
          <div className="flex flex-wrap gap-2 mb-2">
            {tempSlots.length === 0 && (
              <span className="text-xs text-secondary">
                No slots added yet.
              </span>
            )}
            {tempSlots.map(([start, end], idx) => (
              <span
                key={idx}
                className="flex items-center bg-primary-light text-primary text-xs font-medium px-2 py-1 rounded-full"
              >
                {start} - {end}
                <button
                  className="ml-2 text-red-500 hover:underline"
                  type="button"
                  onClick={() => handleRemoveTempSlot(idx)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <button
            className="btn-primary px-3 py-1 text-sm mt-2"
            type="button"
            onClick={handleAddDay}
            disabled={tempSlots.length === 0}
          >
            Save Day & Slots
          </button>
        </div>
      )}
      <div className="space-y-4">
        {availability.length === 0 && (
          <p className="text-secondary text-sm mb-2">
            No availability set. Add a day to begin.
          </p>
        )}
        {availability.map(({ day, slots }) => (
          <div
            key={day}
            className="border border-default rounded-lg p-4 bg-background"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-primary">{day}</span>
              <button
                className="text-xs text-red-500 hover:underline"
                type="button"
                onClick={() => handleRemoveDay(day)}
              >
                Remove Day
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {slots.length === 0 && (
                <span className="text-xs text-secondary">No slots added.</span>
              )}
              {slots.map((slot, idx) => (
                <span
                  key={idx}
                  className="flex items-center bg-primary-light text-primary text-xs font-medium px-2 py-1 rounded-full"
                >
                  {slot}
                  <button
                    className="ml-2 text-red-500 hover:underline"
                    type="button"
                    onClick={() => handleRemoveSlot(day, idx)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

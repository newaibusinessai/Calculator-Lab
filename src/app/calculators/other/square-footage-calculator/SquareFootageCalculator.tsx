"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("square-footage-calculator")!;

interface Room {
  id: number;
  name: string;
  length: string;
  width: string;
}

export default function SquareFootageCalculator() {
  const [rooms, setRooms] = useState<Room[]>([
    { id: 1, name: "Room 1", length: "", width: "" }
  ]);
  const [result, setResult] = useState<{
    totalSqFt: number;
    roomAreas: { name: string; area: number }[];
  } | null>(null);

  const addRoom = () => {
    setRooms([
      ...rooms,
      { id: Date.now(), name: `Room ${rooms.length + 1}`, length: "", width: "" }
    ]);
  };

  const removeRoom = (id: number) => {
    setRooms(rooms.filter(r => r.id !== id));
  };

  const updateRoom = (id: number, field: keyof Room, value: string) => {
    setRooms(rooms.map(r =>
      r.id === id ? { ...r, [field]: value } : r
    ));
  };

  const calculate = () => {
    const validRooms = rooms.filter(r =>
      r.length.trim() && r.width.trim()
    );

    if (validRooms.length === 0) {
      alert("Please enter at least one room with length and width");
      return;
    }

    const roomAreas = validRooms.map(room => ({
      name: room.name || "Unnamed Room",
      area: parseFloat(room.length) * parseFloat(room.width)
    }));

    const totalSqFt = roomAreas.reduce((sum, room) => sum + room.area, 0);

    setResult({ totalSqFt, roomAreas });
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div className="space-y-3">
          {rooms.map((room, index) => (
            <div key={room.id} className="p-4 bg-gray-50 rounded-lg space-y-2">
              <div className="flex justify-between items-center mb-2">
                <input
                  type="text"
                  placeholder={`Room ${index + 1}`}
                  value={room.name}
                  onChange={(e) => updateRoom(room.id, 'name', e.target.value)}
                  className="font-medium text-gray-700 bg-transparent border-none focus:outline-none"
                />
                {rooms.length > 1 && (
                  <button
                    onClick={() => removeRoom(room.id)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Length (ft)</label>
                  <input
                    type="number"
                    placeholder="Length"
                    value={room.length}
                    onChange={(e) => updateRoom(room.id, 'length', e.target.value)}
                    className="calc-input"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Width (ft)</label>
                  <input
                    type="number"
                    placeholder="Width"
                    value={room.width}
                    onChange={(e) => updateRoom(room.id, 'width', e.target.value)}
                    className="calc-input"
                    step="0.1"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addRoom}
          className="calc-btn w-full border-2 border-dashed border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700"
        >
          + Add Room
        </button>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Total Area
        </button>

        {result && (
          <div className="result-box">
            <div className="text-center pb-3 border-b border-gray-200 mb-3">
              <div className="text-sm text-gray-600 mb-1">Total Area</div>
              <div className="text-4xl font-bold text-green-700">
                {result.totalSqFt.toFixed(2)}
              </div>
              <div className="text-lg text-gray-600 mt-1">square feet</div>
            </div>
            <div className="space-y-2">
              {result.roomAreas.map((room, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">{room.name}:</span>
                  <span className="font-semibold text-gray-800">
                    {room.area.toFixed(2)} sq ft
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Square Footage Calculator</h3>
          <p>Calculate the area of rooms in square feet. Add multiple rooms to get the total area for your space.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}

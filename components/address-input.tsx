"use client";

import { useState } from "react";
import { useEstimatorStore } from "@/lib/store";
import { MapPin, Search } from "lucide-react";

export function AddressInput() {
  const [inputValue, setInputValue] = useState("");
  const { address, setAddress } = useEstimatorStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setAddress(inputValue.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPin className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter property address..."
          className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <Search className="h-5 w-5 text-gray-400 hover:text-green-500 transition-colors" />
        </button>
      </div>
      {address && (
        <p className="mt-2 text-sm text-gray-600">
          Current location: <span className="font-medium">{address}</span>
        </p>
      )}
    </form>
  );
}

"use client";

import { useEstimatorStore } from "@/lib/store";
import { Calculator, Square, DollarSign, FileText } from "lucide-react";

export function EstimateResults() {
  const {
    squareFootage,
    estimateLow,
    estimateHigh,
    showResults,
    address,
    conditions,
  } = useEstimatorStore();

  if (!showResults || squareFootage === 0) {
    return null;
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const averageEstimate = Math.round((estimateLow + estimateHigh) / 2);

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Calculator className="h-6 w-6 text-green-600" />
          <h3 className="text-xl font-bold text-gray-900">
            Landscaping Estimate
          </h3>
        </div>
        {address && <p className="text-sm text-gray-600">{address}</p>}
      </div>

      {/* Main Estimate Display */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 text-center">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            Estimated Cost Range
          </p>
          <div className="text-3xl font-bold text-gray-900">
            {formatCurrency(estimateLow)} - {formatCurrency(estimateHigh)}
          </div>
          <p className="text-lg text-gray-700">
            Average:{" "}
            <span className="font-semibold">
              {formatCurrency(averageEstimate)}
            </span>
          </p>
        </div>
      </div>

      {/* Area Information */}
      <div className="flex items-center justify-between p-4 rounded-lg">
        <div className="flex items-center gap-2">
          <Square className="h-5 w-5 text-gray-600" />
          <span className="font-medium text-gray-900">Area</span>
        </div>
        <span className="text-lg font-semibold text-gray-900">
          {formatNumber(squareFootage)} sq ft
        </span>
      </div>

      {/* Cost Breakdown */}
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          Cost Factors
        </h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Base Rate:</span>
            <span className="font-medium">$1.00/sq ft</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Grass Length:</span>
            <span className="font-medium capitalize">
              {conditions.grassLength}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Obstacles:</span>
            <span className="font-medium capitalize">
              {conditions.obstacles}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Slope:</span>
            <span className="font-medium capitalize">{conditions.slope}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Access:</span>
            <span className="font-medium capitalize">{conditions.access}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Per Sq Ft:</span>
            <span className="font-medium">
              {formatCurrency(estimateLow / squareFootage)} -{" "}
              {formatCurrency(estimateHigh / squareFootage)}
            </span>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <FileText className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-yellow-800">
            <p className="font-medium mb-1">Estimate Disclaimer</p>
            <p>
              This is a preliminary estimate based on area and selected
              conditions. Final pricing may vary based on specific site
              conditions, material choices, and additional services required.
              Contact us for a detailed quote.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
          Get Detailed Quote
        </button>
        <button className="flex-1  font-medium py-3 px-4 rounded-lg">
          Save Estimate
        </button>
      </div>
    </div>
  );
}

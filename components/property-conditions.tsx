"use client";

import { useEstimatorStore, PropertyConditions } from "@/lib/store";
import { Leaf, Mountain, Lock, AlertTriangle } from "lucide-react";

const conditionOptions = {
  grassLength: [
    {
      value: "short",
      label: "Short",
      description: "Well-maintained, under 3 inches",
    },
    {
      value: "medium",
      label: "Medium",
      description: "Regular grass, 3-6 inches",
    },
    { value: "tall", label: "Tall", description: "Overgrown, over 6 inches" },
  ],
  obstacles: [
    { value: "none", label: "None", description: "Clear area, no obstacles" },
    {
      value: "some",
      label: "Some",
      description: "Few trees, bushes, or structures",
    },
    {
      value: "heavy",
      label: "Heavy",
      description: "Many obstacles, complex navigation",
    },
  ],
  slope: [
    { value: "flat", label: "Flat", description: "Level ground, easy to work" },
    {
      value: "slight",
      label: "Slight",
      description: "Gentle slope, manageable",
    },
    {
      value: "steep",
      label: "Steep",
      description: "Significant slope, requires care",
    },
  ],
  access: [
    {
      value: "easy",
      label: "Easy",
      description: "Direct access, no restrictions",
    },
    {
      value: "gated",
      label: "Gated",
      description: "Gated community or restricted access",
    },
    {
      value: "obstructed",
      label: "Obstructed",
      description: "Difficult access, narrow paths",
    },
  ],
} as const;

const icons = {
  grassLength: Leaf,
  obstacles: AlertTriangle,
  slope: Mountain,
  access: Lock,
};

const titles = {
  grassLength: "Grass Length",
  obstacles: "Obstacles",
  slope: "Terrain Slope",
  access: "Property Access",
};

export function PropertyConditions() {
  const { conditions, setConditions, calculateEstimate } = useEstimatorStore();

  const handleConditionChange = (
    category: keyof PropertyConditions,
    value: string
  ) => {
    setConditions({ [category]: value });
    calculateEstimate();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Property Conditions
        </h3>
        <p className="text-sm text-gray-600">
          Select conditions that best describe the property to get an accurate
          estimate
        </p>
      </div>

      {(Object.keys(conditionOptions) as Array<keyof PropertyConditions>).map(
        (category) => {
          const Icon = icons[category];
          const options = conditionOptions[category];

          return (
            <div key={category} className="space-y-3">
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-green-600" />
                <h4 className="font-medium text-gray-900">
                  {titles[category]}
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {options.map((option) => (
                  <label
                    key={option.value}
                    className={`
                    relative flex items-start p-3 border rounded-lg cursor-pointer transition-all
                    ${
                      conditions[category] === option.value
                        ? "border-green-500 bg-green-50 ring-1 ring-green-500"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }
                  `}
                  >
                    <input
                      type="radio"
                      name={category}
                      value={option.value}
                      checked={conditions[category] === option.value}
                      onChange={(e) =>
                        handleConditionChange(category, e.target.value)
                      }
                      className="sr-only"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">
                          {option.label}
                        </span>
                        {conditions[category] === option.value && (
                          <div className="h-2 w-2 bg-green-500 rounded-full" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {option.description}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}

import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface PropertyConditions {
  grassLength: "short" | "medium" | "tall";
  obstacles: "none" | "some" | "heavy";
  slope: "flat" | "slight" | "steep";
  access: "easy" | "gated" | "obstructed";
}

export interface EstimateData {
  id?: string;
  address: string;
  polygon: number[][];
  squareFootage: number;
  conditions: PropertyConditions;
  estimateLow: number;
  estimateHigh: number;
  createdAt?: string;
}

interface EstimatorState {
  // Map state
  address: string;
  polygon: number[][];
  squareFootage: number;

  // Property conditions
  conditions: PropertyConditions;

  // Estimate results
  estimateLow: number;
  estimateHigh: number;

  // UI state
  isDrawing: boolean;
  showResults: boolean;

  // User state
  isAuthenticated: boolean;
  userId: string | null;

  // Saved estimates
  savedEstimates: EstimateData[];

  // Actions
  setAddress: (address: string) => void;
  setPolygon: (polygon: number[][]) => void;
  setSquareFootage: (footage: number) => void;
  setConditions: (conditions: Partial<PropertyConditions>) => void;
  calculateEstimate: () => void;
  setIsDrawing: (drawing: boolean) => void;
  setShowResults: (show: boolean) => void;
  setAuthentication: (isAuth: boolean, userId?: string) => void;
  addSavedEstimate: (estimate: EstimateData) => void;
  clearEstimate: () => void;
}

const initialConditions: PropertyConditions = {
  grassLength: "medium",
  obstacles: "some",
  slope: "flat",
  access: "easy",
};

export const useEstimatorStore = create<EstimatorState>()(
  devtools(
    (set, get) => ({
      // Initial state
      address: "",
      polygon: [],
      squareFootage: 0,
      conditions: initialConditions,
      estimateLow: 0,
      estimateHigh: 0,
      isDrawing: false,
      showResults: false,
      isAuthenticated: false,
      userId: null,
      savedEstimates: [],

      // Actions
      setAddress: (address) => set({ address }),

      setPolygon: (polygon) => set({ polygon }),

      setSquareFootage: (squareFootage) => set({ squareFootage }),

      setConditions: (newConditions) =>
        set((state) => ({
          conditions: { ...state.conditions, ...newConditions },
        })),

      calculateEstimate: () => {
        const { squareFootage, conditions } = get();

        if (squareFootage === 0) return;

        const baseRate = 1.0;

        const modifiers = {
          grassLength: { short: 1.0, medium: 1.1, tall: 1.25 },
          obstacles: { none: 1.0, some: 1.15, heavy: 1.3 },
          slope: { flat: 1.0, slight: 1.1, steep: 1.25 },
          access: { easy: 1.0, gated: 1.05, obstructed: 1.2 },
        };

        const totalModifier =
          modifiers.grassLength[conditions.grassLength] *
          modifiers.obstacles[conditions.obstacles] *
          modifiers.slope[conditions.slope] *
          modifiers.access[conditions.access];

        const estimateLow = Math.round(
          squareFootage * baseRate * 0.95 * totalModifier
        );
        const estimateHigh = Math.round(
          squareFootage * baseRate * 1.3 * totalModifier
        );

        set({ estimateLow, estimateHigh, showResults: true });
      },

      setIsDrawing: (isDrawing) => set({ isDrawing }),

      setShowResults: (showResults) => set({ showResults }),

      setAuthentication: (isAuthenticated, userId = null) =>
        set({ isAuthenticated, userId }),

      addSavedEstimate: (estimate) =>
        set((state) => ({
          savedEstimates: [...state.savedEstimates, estimate],
        })),

      clearEstimate: () =>
        set({
          address: "",
          polygon: [],
          squareFootage: 0,
          conditions: initialConditions,
          estimateLow: 0,
          estimateHigh: 0,
          showResults: false,
          isDrawing: false,
        }),
    }),
    { name: "landscaping-estimator" }
  )
);

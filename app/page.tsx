import { AddressInput } from "@/components/address-input";
import { MapComponent } from "@/components/map-component";
import { PropertyConditions } from "@/components/property-conditions";
import { EstimateResults } from "@/components/estimate-results";
import { Leaf } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Landscaping Estimator
                </h1>
                <p className="text-sm text-gray-600">
                  Get instant cost estimates for your landscaping projects
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-500">No login required</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Address Input & Map */}
          <div className="lg:col-span-2 space-y-6">
            {/* Address Input */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Property Location
              </h2>
              <AddressInput />
            </div>

            {/* Map */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Draw Landscaping Area
              </h2>
              <MapComponent className="h-96" />
            </div>
          </div>

          {/* Right Column - Conditions & Results */}
          <div className="space-y-6">
            {/* Property Conditions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <PropertyConditions />
            </div>

            {/* Estimate Results */}
            <EstimateResults />
          </div>
        </div>

        {/* Instructions Section */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-lg">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Enter Address
              </h3>
              <p className="text-gray-600 text-sm">
                Start by entering the property address to locate it on the map
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-lg">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Draw Area</h3>
              <p className="text-gray-600 text-sm">
                Use the drawing tool to outline the landscaping area on the
                satellite map
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-lg">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Get Estimate</h3>
              <p className="text-gray-600 text-sm">
                Adjust property conditions and receive an instant cost estimate
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Accurate Estimates
            </h3>
            <p className="text-gray-600 text-sm">
              Based on real property conditions and industry standards
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 font-bold">⚡</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Instant Results
            </h3>
            <p className="text-gray-600 text-sm">
              Get cost estimates in seconds, no waiting required
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-orange-600 font-bold">🗺️</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Satellite Mapping
            </h3>
            <p className="text-gray-600 text-sm">
              Draw precise areas using high-resolution satellite imagery
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 font-bold">🔓</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              No Login Required
            </h3>
            <p className="text-gray-600 text-sm">
              Start estimating immediately, create account only if needed
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              © 2024 Landscaping Estimator. Built with Next.js, Mapbox, and
              Supabase.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

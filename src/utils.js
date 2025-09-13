import { VEHICLES, DEFAULT_MODELS } from "./dummyData";

export function calculateTrip(distanceKm, vehicleType, model) {
  // Try to find exact model
  let vehicle = VEHICLES[vehicleType]?.find(v => v.model === model);

  // If not found, use default
  if (!vehicle) {
    vehicle = DEFAULT_MODELS[vehicleType];
  }

  let fuelUsed, carbon;

  if (vehicle.unit === "km") {
    fuelUsed = distanceKm;
    carbon = distanceKm * vehicle.emission;
  } else {
    fuelUsed = distanceKm / vehicle.efficiency;
    carbon = fuelUsed * vehicle.emission;
  }

  return {
    fuelUsed: fuelUsed.toFixed(2),
    carbon: carbon.toFixed(2),
    unit: vehicle.unit,
    model: vehicle.model, // return actual used model (default if fallback)
  };
}

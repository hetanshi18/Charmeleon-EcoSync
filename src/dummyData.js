export const START_LOCATION = "MPSTME, Vile Parle";

export const ENDPOINTS = [
    { label: "Juhu Beach", distanceKm: 5, coords: [19.0988, 72.8265] },
    { label: "Bandra-Worli Sea Link", distanceKm: 9, coords: [19.0169, 72.8161] },
    { label: "Siddhivinayak Temple", distanceKm: 13, coords: [19.0176, 72.8305] },
    { label: "IIT Bombay, Powai", distanceKm: 12, coords: [19.1334, 72.9133] },
    { label: "CSMT Station", distanceKm: 22, coords: [18.9402, 72.8355] },
    { label: "Marine Drive", distanceKm: 21, coords: [18.9432, 72.8238] },
  ];
  

// 🔹 Vehicle dataset with realistic models
export const VEHICLES = {
  car: [
    { model: "Maruti Swift Petrol", efficiency: 15, unit: "litre", emission: 2.31 },
    { model: "Hyundai Creta Diesel", efficiency: 17, unit: "litre", emission: 2.68 },
    { model: "Honda City Petrol", efficiency: 14, unit: "litre", emission: 2.31 },
    { model: "Toyota Innova Diesel", efficiency: 12, unit: "litre", emission: 2.68 },
    { model: "Tata Nexon EV", efficiency: 8, unit: "kwh", emission: 0.70 },
    { model: "MG ZS EV", efficiency: 7, unit: "kwh", emission: 0.70 },
    { model: "Kia Seltos Petrol", efficiency: 16, unit: "litre", emission: 2.31 },
  ],
  bike: [
    { model: "Honda Shine 125", efficiency: 45, unit: "litre", emission: 2.31 },
    { model: "Bajaj Pulsar 150", efficiency: 40, unit: "litre", emission: 2.31 },
    { model: "Royal Enfield Classic 350", efficiency: 35, unit: "litre", emission: 2.31 },
    { model: "TVS Apache RTR 160", efficiency: 42, unit: "litre", emission: 2.31 },
    { model: "Yamaha FZ-S V3", efficiency: 44, unit: "litre", emission: 2.31 },
  ],
  rickshaw: [
    { model: "Bajaj RE CNG Auto", efficiency: 30, unit: "litre", emission: 2.10 },  // CNG ~ 2.1kg CO₂/kg
    { model: "Mahindra Treo EV Auto", efficiency: 9, unit: "kwh", emission: 0.70 },
  ],
  bus: [
    { model: "BEST City Bus", efficiency: null, unit: "km", emission: 0.105 },
  ],
  metro: [
    { model: "Mumbai Metro Line 1", efficiency: null, unit: "km", emission: 0.041 },
  ],
};

// Default models (if nothing matches)
export const DEFAULT_MODELS = {
  car: VEHICLES.car[0], // Swift Petrol
  bike: VEHICLES.bike[0], // Shine 125
  rickshaw: VEHICLES.rickshaw[0], // Bajaj RE
  bus: VEHICLES.bus[0],
  metro: VEHICLES.metro[0],
};

export const USER = {
  id: "u1",
  username: "anushka",
  ecoCoins: 120,
  carbonBudget: 500,
};

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import L from "leaflet";
import { START_LOCATION, ENDPOINTS, VEHICLES, USER } from "../dummyData";
import { calculateTrip } from "../utils";

// Simple green pin icon
const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
});

function TripTracker() {
  const [destination, setDestination] = useState("");
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  const [vehicleType, setVehicleType] = useState("car");
  const [model, setModel] = useState(VEHICLES.car[0].model);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const handleEndTrip = () => {
    const endpoint = ENDPOINTS.find(
      e => e.label.toLowerCase() === destination.toLowerCase()
    );

    let tripData = endpoint
      ? endpoint
      : { label: destination || "Unknown Location", distanceKm: 10 };

    setSelectedEndpoint(tripData);

    const calc = calculateTrip(tripData.distanceKm, vehicleType, model);

    const newTrip = {
      id: history.length + 1,
      start: START_LOCATION,
      end: tripData.label,
      distanceKm: tripData.distanceKm,
      vehicle: vehicleType,
      model: calc.model,
      fuelUsed: `${calc.fuelUsed} ${calc.unit}`,
      carbon: `${calc.carbon} kg CO₂e`,
      date: new Date().toLocaleDateString(),
    };

    setResult(calc);
    setHistory([newTrip, ...history]);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>🌱 Trip Carbon Tracker</h1>
      <p><b>User:</b> {USER.username} | EcoCoins: {USER.ecoCoins}</p>

      <div>
        <p><b>Start:</b> {START_LOCATION}</p>
        <label>Destination: </label>
        <input
          type="text"
          value={destination}
          onChange={e => setDestination(e.target.value)}
          placeholder="Type your destination"
          style={{ marginLeft: "10px", padding: "5px" }}
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <label>Vehicle Type: </label>
        <select
          value={vehicleType}
          onChange={e => {
            setVehicleType(e.target.value);
            setModel(VEHICLES[e.target.value][0].model);
          }}
        >
          {Object.keys(VEHICLES).map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>

      {(vehicleType === "car" || vehicleType === "bike" || vehicleType === "rickshaw") && (
        <div style={{ marginTop: "10px" }}>
          <label>Model: </label>
          <select value={model} onChange={e => setModel(e.target.value)}>
            {VEHICLES[vehicleType].map(v => (
              <option key={v.model} value={v.model}>{v.model}</option>
            ))}
          </select>
        </div>
      )}

      <button
        onClick={handleEndTrip}
        style={{ marginTop: "15px", padding: "8px 12px", background: "green", color: "white" }}
      >
        End Trip
      </button>

      {result && selectedEndpoint && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
          <p><b>Start:</b> {START_LOCATION}</p>
          <p><b>End:</b> {selectedEndpoint.label} ({selectedEndpoint.distanceKm} km)</p>
          <p><b>Vehicle:</b> {vehicleType} ({result.model})</p>
          <p><b>Fuel Used:</b> {result.fuelUsed} {result.unit}</p>
          <p><b>Carbon Emitted:</b> {result.carbon} kg CO₂e</p>

          {/* Leaflet Map */}
          {/* Leaflet Map */}
          {selectedEndpoint?.coords && (
            <div style={{ height: "300px", marginTop: "15px" }}>
              <MapContainer
                center={selectedEndpoint.coords}
                zoom={12}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {/* Start Marker */}
                <Marker position={[19.1076, 72.8366]} icon={markerIcon}>
                  <Popup>Start: MPSTME, Vile Parle</Popup>
                </Marker>

                {/* Destination Marker */}
                <Marker position={selectedEndpoint.coords} icon={markerIcon}>
                  <Popup>End: {selectedEndpoint.label}</Popup>
                </Marker>

                {/* Polyline from start to destination */}
                <Polyline
                  positions={[[19.1076, 72.8366], selectedEndpoint.coords]}
                  color="blue"
                />
              </MapContainer>
            </div>
          )}

        </div>
      )}

      <h2 style={{ marginTop: "30px" }}>📜 Trip History</h2>
      {history.length === 0 && <p>No trips yet. Start your first trip!</p>}
      {history.map(t => (
        <div key={t.id} style={{ border: "1px solid #ddd", marginBottom: "10px", padding: "8px" }}>
          <p><b>{t.start}</b> → {t.end}</p>
          <p>{t.distanceKm} km | {t.vehicle} ({t.model})</p>
          <p>Fuel: {t.fuelUsed} | CO₂: {t.carbon}</p>
          <p><i>{t.date}</i></p>
        </div>
      ))}
    </div>
  );
}

export default TripTracker;

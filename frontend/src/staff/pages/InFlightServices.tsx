import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./InFlightServices.css";

interface Passenger {
  passengerId: number;
  name: string;
  seatNo: string;
  mealPreference: string;
  mealSelected: string;
  ancillaries: string[];
  shoppingItems: string[];
}

// Mock options
const availableMeals = ["Paneer Butter Masala", "Chicken Biryani", "Pasta"];
const availableAncillaries = ["Wi-Fi", "Extra Legroom", "Blanket"];
const availableShoppingItems = ["Perfume", "Chocolates", "Sunglasses"];

// Mock data
const mockPassengers: Passenger[] = [
  {
    passengerId: 1,
    name: "Alice Johnson",
    seatNo: "12A",
    mealPreference: "veg",
    mealSelected: "Paneer Butter Masala",
    ancillaries: ["Wi-Fi"],
    shoppingItems: ["Perfume"]
  },
  {
    passengerId: 2,
    name: "Bob Smith",
    seatNo: "14C",
    mealPreference: "non-veg",
    mealSelected: "Chicken Biryani",
    ancillaries: [],
    shoppingItems: []
  }
];

const InFlightServices: React.FC = () => {
  const [passengers, setPassengers] = useState<Passenger[]>([]);

  // Load mock data once
  useEffect(() => {
    setPassengers(mockPassengers);
  }, []);

  // Generic field change
  const handleChange = (id: number, field: keyof Passenger, value: any) => {
    setPassengers(prev =>
      prev.map(p =>
        p.passengerId === id ? { ...p, [field]: value } : p
      )
    );
  };

  // Toggle for arrays like ancillaries or shopping
  const handleArrayToggle = (id: number, field: keyof Passenger, value: string) => {
    setPassengers(prev =>
      prev.map(p => {
        if (p.passengerId === id) {
          const items = p[field] as string[];
          const updated = items.includes(value)
            ? items.filter(i => i !== value)
            : [...items, value];
          return { ...p, [field]: updated };
        }
        return p;
      })
    );
  };

  return (
    <div className="inflight-services-container">
      <Link to="/staff" className="back-button">← Back to Dashboard</Link>
      <h2>In-Flight Services</h2>
      {passengers.map(p => (
        <div key={p.passengerId} className="passenger-card">
          <h4>{p.name} - Seat {p.seatNo}</h4>

          <div className="service-group">
            <div className="service-section">
              <label>Meal Preference:</label>
              <select value={p.mealPreference} onChange={e => handleChange(p.passengerId, "mealPreference", e.target.value)}>
                <option value="veg">Vegetarian</option>
                <option value="non-veg">Non-Vegetarian</option>
              </select>
            </div>

            <div className="service-section">
              <label>Meal Selected:</label>
              <select value={p.mealSelected} onChange={e => handleChange(p.passengerId, "mealSelected", e.target.value)}>
                {availableMeals.map(meal => (
                  <option key={meal} value={meal}>{meal}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="service-group">
            <div className="service-section">
              <label>Ancillary Services:</label>
              <div className="checkbox-group">
                {availableAncillaries.map(service => (
                  <div key={service} className="checkbox-item">
                    <input
                      type="checkbox"
                      id={`ancillary-${p.passengerId}-${service}`}
                      checked={p.ancillaries.includes(service)}
                      onChange={() => handleArrayToggle(p.passengerId, "ancillaries", service)}
                    />
                    <label htmlFor={`ancillary-${p.passengerId}-${service}`}>{service}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="service-section">
              <label>Shopping Items:</label>
              <div className="checkbox-group">
                {availableShoppingItems.map(item => (
                  <div key={item} className="checkbox-item">
                    <input
                      type="checkbox"
                      id={`shopping-${p.passengerId}-${item}`}
                      checked={p.shoppingItems.includes(item)}
                      onChange={() => handleArrayToggle(p.passengerId, "shoppingItems", item)}
                    />
                    <label htmlFor={`shopping-${p.passengerId}-${item}`}>{item}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InFlightServices;


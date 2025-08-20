import { useState } from "react";
import { Link } from "react-router-dom";
import SeatMap from "../components/SeatMap";
import "./CheckIn.css";

type Passenger = {
  id: number;
  name: string;
};

const passengers: Passenger[] = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Mark Taylor" },
];

function CheckIn() {
  const [allocatedSeats, setAllocatedSeats] = useState<Record<string, string>>({});
  const [passengerSeatMap, setPassengerSeatMap] = useState<Record<number, string>>({});
  const [selectedPassenger, setSelectedPassenger] = useState<Passenger | null>(null);

  const handleSelectPassenger = (passenger: Passenger) => {
    setSelectedPassenger(passenger);
  };

  const handleSeatAllocation = (seatId: string) => {
    if (selectedPassenger && !allocatedSeats[seatId]) {
      setAllocatedSeats((prev) => ({
        ...prev,
        [seatId]: selectedPassenger.name,
      }));
      setPassengerSeatMap((prev) => ({
        ...prev,
        [selectedPassenger.id]: seatId,
      }));
      setSelectedPassenger(null);
    }
  };

  return (
    <div className="checkin-container">
      <Link to="/staff" className="back-button">← Back to Dashboard</Link>
      <h2>Check-In</h2>
      <h3>Passenger List</h3>
      <ul className="passenger-list">
        {passengers.map((passenger) => (
          <li key={passenger.id}>
            <span>{passenger.name}</span>
            <div>
              <button
                className="passenger-button"
                onClick={() => handleSelectPassenger(passenger)}
                disabled={!!passengerSeatMap[passenger.id]}
              >
                {passengerSeatMap[passenger.id] ? 'Checked In' : 'Select for Check-In'}
              </button>
              {passengerSeatMap[passenger.id] && (
                <span className="seat-assigned">
                  Seat: {passengerSeatMap[passenger.id]}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>

      {selectedPassenger && (
        <div className="selected-passenger">
          <p>
            Assigning seat to: <strong>{selectedPassenger.name}</strong>
          </p>
          <p>Click on an available seat to assign</p>
        </div>
      )}

      <SeatMap allocatedSeats={allocatedSeats} onSeatSelect={handleSeatAllocation} />
    </div>
  );
}

export default CheckIn;

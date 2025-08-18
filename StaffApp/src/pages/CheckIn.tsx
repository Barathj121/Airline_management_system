import { useState } from "react";
import SeatMap from "../components/SeatMap";

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
    <div>
      <h2>Check-In</h2>
      <h3>Passenger List</h3>
      <ul>
        {passengers.map((passenger) => (
          <li key={passenger.id}>
            <button
              onClick={() => handleSelectPassenger(passenger)}
              disabled={!!passengerSeatMap[passenger.id]}
            >
              {passenger.name}
            </button>
            {passengerSeatMap[passenger.id] && (
              <span style={{ marginLeft: "10px", color: "green" }}>
                Seat: {passengerSeatMap[passenger.id]}
              </span>
            )}
          </li>
        ))}
      </ul>

      {selectedPassenger && (
        <p>
          Assigning seat to: <strong>{selectedPassenger.name}</strong>
        </p>
      )}

      <SeatMap allocatedSeats={allocatedSeats} onSeatSelect={handleSeatAllocation} />
    </div>
  );
}

export default CheckIn;

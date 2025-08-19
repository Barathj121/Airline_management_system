import "./SeatMap.css";

type SeatMapProps = {
  allocatedSeats: Record<string, string>;
  onSeatSelect: (seatId: string) => void;
};

const seats: string[] = [
  "A1", "A2", "A3", "A4", "A5",
  "B1", "B2", "B3", "B4", "B5",
  "C1", "C2", "C3", "C4", "C5"
];

const SeatMap: React.FC<SeatMapProps> = ({ allocatedSeats, onSeatSelect }) => {
  return (
    <div className="seat-map">
      {seats.map((seatId) => {
        const isAllocated = seatId in allocatedSeats;
        return (
          <div
            key={seatId}
            className={`seat ${isAllocated ? "allocated" : "available"}`}
            onClick={() => {
              if (!isAllocated) {
                onSeatSelect(seatId);
              }
            }}
          >
            {seatId}
          </div>
        );
      })}
    </div>
  );
};

export default SeatMap;

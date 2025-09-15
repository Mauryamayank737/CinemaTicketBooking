import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CinemaHall = ({
  layout = {
    rows: 8,
    seatsPerRow: 12,
    aislePosition: [6],
    rowAislePosition: [2, 5],
    rowGap: 16,
  },
  seatsTypes = {
    regular: { name: "Regular", price: 200, rows: [0, 1, 2], color: "bg-blue-100" },
    premium: { name: "Premium", price: 400, rows: [3, 4, 5], color: "bg-green-200" },
    vip: { name: "VIP", price: 600, rows: [6, 7], color: "bg-purple-300" },
  },
  bookedSeats: initialBookedSeats = [],
  title = "Cinema Hall Booking System",
  sub_title = "Book cinema tickets instantly with the best seat selection, lowest prices and fast, secure checkout. Skip the queue — reserve your seats now.",
  currency = "₹",
}) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState(initialBookedSeats);
  const navigate = useNavigate();

  const getSeatType = (rowIndex) =>
    Object.values(seatsTypes).find((type) => type.rows.includes(rowIndex)) ||
    seatsTypes.regular;

  const getRowLetter = (rowIndex) => String.fromCharCode(65 + rowIndex);

  const getSeatLabel = (rowIndex, seatIndex) => {
    const seatType = getSeatType(rowIndex);
    const rowLetter = getRowLetter(rowIndex);
    const seatPrefix = seatType.name.charAt(0).toUpperCase();
    return `${rowLetter}${seatPrefix}${seatIndex + 1}`;
  };

  const handleSeatClick = (seatId) => {
    if (bookedSeats.includes(seatId)) return;
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  const totalPrice = selectedSeats.reduce((sum, seatId) => {
    const rowIndex = parseInt(seatId.split("-")[0]);
    const seatType = getSeatType(rowIndex);
    return sum + seatType.price;
  }, 0);

  const getDisplaySeatLabel = (seatId) => {
    const [rowIndex, seatIndex] = seatId.split("-").map(Number);
    return getSeatLabel(rowIndex, seatIndex);
  };

  const handleBookSeats = () => {
    if (selectedSeats.length === 0) return;

    const bookedLabels = selectedSeats.map(getDisplaySeatLabel);
    setBookedSeats((prev) => [...prev, ...selectedSeats]);

    navigate("/booking-details", {
      state: {
        selectedSeats: bookedLabels,
        totalPrice,
        currency,
        title
      },
    });

    setSelectedSeats([]);
  };

  return (
    <div className="bg-neutral-100 min-h-screen p-4 sm:p-6">
      {/* Title */}
      <div className="container mx-auto shadow-lg rounded-2xl bg-white p-4 sm:p-6 flex flex-col gap-2 items-center text-center">
        <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
        <h3 className="text-sm sm:text-base text-gray-600">{sub_title}</h3>
      </div>

      {/* Screen */}
      <div className="my-4 sm:my-6 flex justify-center">
        <div className="bg-gray-700 text-white px-4 sm:px-8 py-1 sm:py-2 rounded-b-xl shadow-md text-xs sm:text-base">
          SCREEN
        </div>
      </div>

      {/* Seat Map */}
      <div className="flex flex-col items-center">
        {Array.from({ length: layout.rows }, (_, rowIndex) => {
          const seatType = getSeatType(rowIndex);

          return (
            <div
              key={rowIndex}
              className="flex gap-1 sm:gap-2"
              style={{
                marginBottom: layout.rowAislePosition.includes(rowIndex)
                  ? `${layout.rowGap * 2}px`
                  : `${layout.rowGap}px`,
              }}
            >
              <div className="w-6 sm:w-8 flex items-center justify-center text-xs sm:text-sm font-medium">
                {getRowLetter(rowIndex)}
              </div>

              {Array.from({ length: layout.seatsPerRow }, (_, seatIndex) => {
                const seatId = `${rowIndex}-${seatIndex}`;
                const isBooked = bookedSeats.includes(seatId);
                const isSelected = selectedSeats.includes(seatId);
                const seatLabel = getSeatLabel(rowIndex, seatIndex);

                return (
                  <React.Fragment key={seatIndex}>
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-xs font-medium rounded cursor-pointer
                        ${isBooked ? "bg-red-500 opacity-90 cursor-not-allowed" : ""}
                        ${isSelected ? "bg-green-500 text-white" : seatType.color}
                      `}
                      onClick={() => handleSeatClick(seatId)}
                    >
                      {seatLabel}
                    </div>

                    {layout.aislePosition.includes(seatIndex + 1) && (
                      <div className="w-2 sm:w-6" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 my-4 sm:my-6">
        {Object.values(seatsTypes).map((type) => (
          <div key={type.name} className="flex items-center gap-2">
            <div
              className={`w-5 h-5 sm:w-6 sm:h-6 rounded ${type.color} border border-gray-400`}
            ></div>
            <span className="text-xs sm:text-sm">
              {type.name} ({currency}{type.price})
            </span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-green-500 border border-gray-400"></div>
          <span className="text-xs sm:text-sm">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-gray-500 border border-gray-400"></div>
          <span className="text-xs sm:text-sm">Booked</span>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-4 sm:mt-6 text-center">
        <p className="font-medium text-sm sm:text-base">
          Selected Seats:{" "}
          {selectedSeats.length > 0
            ? selectedSeats.map(getDisplaySeatLabel).join(", ")
            : "None"}
        </p>
        <p className="font-bold mt-2 text-base sm:text-lg">
          Total: {currency} {totalPrice}
        </p>

        <div
          className={`w-full sm:w-48 mx-auto my-4 sm:my-5 px-6 py-2 rounded-xl shadow-md text-sm sm:text-base
            ${selectedSeats.length === 0
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
            }`}
          onClick={handleBookSeats}
        >
          Book the tickets
        </div>
      </div>
    </div>
  );
};

export default CinemaHall;
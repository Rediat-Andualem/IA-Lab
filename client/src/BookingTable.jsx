// ------------------------new backend functionality--------------
import React, { useMemo, useState } from "react";
import { useTable } from "react-table";
import { axiosInstance } from './utility/urlInstance';
import "./BookingTable.css";

function BookingTable({ day, reasonForBlock }) {
  const [bookedCells, setBookedCells] = useState({});
  const [bookings, setBookings] = useState([]);
  const [equipmentId, setEquipmentId] = useState("");

  const startDate = useMemo(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const offsetToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(today);
    monday.setDate(today.getDate() + offsetToMonday);
    return monday;
  }, []);

  const daysOfWeek = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      return day;
    });
  }, [startDate]);

  const data = useMemo(
    () => [
      { Time: "9AM-10AM", ...Object.fromEntries(Array(14).fill(null).map((_, i) => [`Day${i}`, "Book"])) },
      { Time: "10AM-11AM", ...Object.fromEntries(Array(14).fill(null).map((_, i) => [`Day${i}`, "Book"])) },
      { Time: "11AM-12PM", ...Object.fromEntries(Array(14).fill(null).map((_, i) => [`Day${i}`, "Book"])) },
      { Time: "12PM-1PM", ...Object.fromEntries(Array(14).fill(null).map((_, i) => [`Day${i}`, "Book"])) },
      { Time: "2PM-3PM", ...Object.fromEntries(Array(14).fill(null).map((_, i) => [`Day${i}`, "Book"])) },
      { Time: "3PM-4PM", ...Object.fromEntries(Array(14).fill(null).map((_, i) => [`Day${i}`, "Book"])) },
      { Time: "4PM-5PM", ...Object.fromEntries(Array(14).fill(null).map((_, i) => [`Day${i}`, "Book"])) },
    ],
    []
  );

  const handleCellClick = (time, dayIndex) => {
    const slotDate = daysOfWeek[dayIndex]?.toLocaleDateString();
    const bookingDate = new Date().toLocaleDateString();
    const cellKey = `${time}-${slotDate}`;

    if (bookedCells[cellKey]) return;

    setBookedCells((prev) => ({
      ...prev,
      [cellKey]: true,
    }));

    setBookings((prev) => [
      ...prev,
      {
        timeSlot: time,
        slotDate,
        bookingDate,
      },
    ]);
  };

  const handleSubmit = async () => {
    if (!equipmentId) {
      alert("Please select an equipment ID");
      return;
    }

    if (bookings.length === 0) {
      alert("No bookings selected!");
      return;
    }

    const userID = "d87dbaf1-5d7a-4063-be81-8aa15f3e0308";
    const payload = {
      equipmentId,
      bookingsCount: bookings.length,
      bookings,
      userID,
    };
console.log(payload)
    try {
      const response = await axiosInstance.post("/booking/equipmentBookings", payload);   //http://localhost:4789/api/booking/equipmentBookings
      console.log(response);
      alert("Booking submitted successfully!");
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Error submitting booking.");
    }
  };

  const columns = useMemo(() => {
    return [
      { Header: "Time", accessor: "Time" },
      ...daysOfWeek.map((date, index) => ({
        Header: date.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }),
        accessor: `Day${index}`,
      })),
    ];
  }, [daysOfWeek]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  const now = new Date();

  const parseTime = (time) => {
    const [hour, modifier] = time.match(/\d+|AM|PM/g);
    const hourIn24 = modifier === "PM" && hour !== "12" ? parseInt(hour) + 12 : parseInt(hour);
    return hourIn24 * 60;
  };

  const isPastTimeSlot = (time) => {
    const [startTime, endTime] = time.split("-").map(parseTime);
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    return currentMinutes >= endTime;
  };

  return (
    <div>
      <div className="container">
        <select
          name="equipmentName"
          onChange={(e) => setEquipmentId(e.target.value)}
          value={equipmentId}
        >
          <option value="">Select Equipment</option>
          <option value="0bd93372-5816-4ac5-9891-8aa71451c2c5">Equipment 1</option>
          <option value="0bd93372-5816-4ac5-9891-8aa71451c2c5">Equipment 2</option>
          <option value="0bd93372-5816-4ac5-9891-8aa71451c2c5">Equipment 3</option>
        </select>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, cellIndex) => {
                    const time = row.values.Time;
                    const dayIndex = cellIndex - 1;
                    const isTimeColumn = cell.column.id === "Time";
                    const dayDate = daysOfWeek[dayIndex];
                    const cellKey = `${time}-${dayDate?.toLocaleDateString()}`;
                    const isBooked = bookedCells[cellKey];
                    const isWeekend = dayDate?.getDay() === 0 || dayDate?.getDay() === 6;

                    const isPast = dayDate && (
                      dayDate < new Date(now.toDateString()) ||
                      (dayDate.toDateString() === now.toDateString() && isPastTimeSlot(time))
                    );

                    let cellStyle = {};
                    let cellText = cell.value;

                    if (isWeekend && !isTimeColumn) {
                      cellStyle = { backgroundColor: "red", color: "white", cursor: "not-allowed" };
                      cellText = "Weekend";
                    } else if (isPast && !isBooked && !isTimeColumn) {
                      cellStyle = { backgroundColor: "black", color: "white", cursor: "not-allowed" };
                      cellText = "Closed without booking";
                    } else if (isBooked) {
                      cellStyle = { backgroundColor: "green", color: "white" };
                      cellText = "Booked";
                    } else if (isTimeColumn) {
                      cellStyle = { backgroundColor: "#0A7075", color: "white" };
                      cellText = time;
                    }

                    return (
                      <td
                        {...cell.getCellProps()}
                        onClick={() => {
                          if (!isTimeColumn && !isBooked && !isWeekend && !isPast) {
                            handleCellClick(time, dayIndex);
                          }
                        }}
                        style={cellStyle}
                      >
                        {cellText}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <button onClick={handleSubmit}>Submit Booking</button>
      </div>
      {bookings.length > 0 && (
        <div className="booking-summary">
          <h3>Booking Summary</h3>
          {bookings.map((booking, index) => (
            <div key={index}>
              <p>Time Slot: {booking.timeSlot}</p>
              <p>Slot Date: {booking.slotDate}</p>
              <p>Booking Date: {booking.bookingDate}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingTable;

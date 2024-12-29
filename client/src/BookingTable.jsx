// import React, { useMemo, useState } from 'react';
// import { useTable } from "react-table";
// import './BookingTable.css';

// function BookingTable({ day, reasonForBlock }) {
//   const [bookedCells, setBookedCells] = useState({});
//   const [selectedBooking, setSelectedBooking] = useState(null);

//   const startDate = useMemo(() => {
//     const today = new Date();
//     const dayOfWeek = today.getDay();
//     const offsetToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
//     const monday = new Date(today);
//     monday.setDate(today.getDate() + offsetToMonday);
//     return monday;
//   }, []);

//   const daysOfWeek = useMemo(() => {
//     return Array.from({ length: 14 }, (_, i) => {
//       const day = new Date(startDate);
//       day.setDate(startDate.getDate() + i);
//       return day;
//     });
//   }, [startDate]);

//   const data = useMemo(
//     () => [
//       { Time: "9AM-10AM", ...Object.fromEntries(Array(14).fill(null).map((_, i) => [`Day${i}`, "Book"])) },
//       { Time: "10AM-11AM", ...Object.fromEntries(Array(14).fill(null).map((_, i) => [`Day${i}`, "Book"])) },
//       { Time: "11AM-12PM", ...Object.fromEntries(Array(14).fill(null).map((_, i) => [`Day${i}`, "Book"])) },
//       { Time: "12PM-1PM", ...Object.fromEntries(Array(14).fill(null).map((_, i) => [`Day${i}`, "Book"])) },
//       { Time: "2PM-3PM", ...Object.fromEntries(Array(14).fill(null).map((_, i) => [`Day${i}`, "Book"])) },
//       { Time: "3PM-4PM", ...Object.fromEntries(Array(14).fill(null).map((_, i) => [`Day${i}`, "Book"])) },
//       { Time: "4PM-5PM", ...Object.fromEntries(Array(14).fill(null).map((_, i) => [`Day${i}`, "Book"])) },
//     ],
//     []
//   );

//   const handleCellClick = (time, dayIndex) => {
//     const slotDate = daysOfWeek[dayIndex]?.toLocaleDateString();
//     const bookingDate = new Date().toLocaleDateString();
//     const cellKey = `${time}-${slotDate}`;

//     if (bookedCells[cellKey]) return;

//     setBookedCells((prev) => ({
//       ...prev,
//       [cellKey]: true,
//     }));

//     setSelectedBooking({
//       timeSlot: time,
//       slotDate: slotDate,
//       bookingDate: bookingDate,
//     });
//   };

//   const columns = useMemo(() => {
//     return [
//       { Header: "Time", accessor: "Time" },
//       ...daysOfWeek.map((date, index) => ({
//         Header: date.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }),
//         accessor: `Day${index}`,
//       })),
//     ];
//   }, [daysOfWeek]);

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
//     columns,
//     data,
//   });

//   const now = new Date();

//   return (
//     <div>
//       <div className="container">
//       <select name="equipmentName" id="">
//         <option value="equipment_id1">equimpmets1</option>
//         <option value="equipment_id2">equimpmets2</option>
//         <option value="equipment_id3">equimpmets3</option>
//         <option value="equipment_id4">equimpmets4</option>
//       </select>
//         <table {...getTableProps()}>
//           <thead>
//             {headerGroups.map((headerGroup) => (
//               <tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map((column) => (
//                   <th {...column.getHeaderProps()}>{column.render("Header")}</th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...getTableBodyProps()}>
//             {rows.map((row) => {
//               prepareRow(row);
//               return (
//                 <tr {...row.getRowProps()}>
//                   {row.cells.map((cell, cellIndex) => {
//                     const time = row.values.Time;
//                     const dayIndex = cellIndex - 1;
//                     const isTimeColumn = cell.column.id === "Time";
//                     const dayDate = daysOfWeek[dayIndex];
//                     const cellKey = `${time}-${dayDate?.toLocaleDateString()}`;
//                     const isBooked = bookedCells[cellKey];
//                     const isMatchedDay = dayDate?.toLocaleDateString() === day;

//                     let cellStyle = {};
//                     let cellText = cell.value;

//                     // Check if slot is in the past
//                     const slotDateTime = new Date(dayDate);
//                     const slotHour = parseInt(time.split("AM")[0].split("PM")[0]);
//                     slotDateTime.setHours(time.includes("PM") ? slotHour + 12 : slotHour, 0, 0);

//                     const isPast = slotDateTime < now;

//                     // Weekend logic
//                     const isWeekend = dayDate?.getDay() === 0 || dayDate?.getDay() === 6;
//                     if (isWeekend && !isTimeColumn) {
//                       cellStyle = { backgroundColor: "red", color: "white", cursor: "not-allowed" };
//                       cellText = "Weekend";
//                     } else if (isMatchedDay) {
//                       // Special day logic
//                       if (reasonForBlock == 1) {
//                         cellStyle = { backgroundColor: "#ED9E59", color: "#fff", cursor: "not-allowed" };
//                         cellText = "Public Holiday";
//                       } else if (reasonForBlock == 2) {
//                         cellStyle = { backgroundColor: "#032F30", color: "#fff", cursor: "not-allowed" };
//                         cellText = "Machine out of service";
//                       }
//                     } else if (isPast && !isTimeColumn && !isBooked) {
//                       // Past slots
//                       cellStyle = { backgroundColor: "black", color: "white", cursor: "not-allowed" };
//                       cellText = "Closed without booking";
//                     } else if (isBooked) {
//                       // Booked cells
//                       cellStyle = { backgroundColor: "green", color: "#fff" };
//                       cellText = "Booked";
//                     } else if (isTimeColumn) {
//                       // Time column styling
//                       cellStyle = { backgroundColor: "#0A7075", color: "#fff", cursor: "not-allowed" };
//                       cellText = time;
//                     }

//                     return (
//                       <td
//                         {...cell.getCellProps()}
//                         onClick={() => {
//                           if (!isTimeColumn && !isMatchedDay && !isBooked && !isWeekend && !isPast) {
//                             handleCellClick(time, dayIndex);
//                           }
//                         }}
//                         style={cellStyle}
//                       >
//                         {cellText}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//         <button>SubmitBooking</button>
//       </div>
    
//       {selectedBooking && (
//         <div className="booking-summary">
//           <h3>Booking Summary</h3>
//           <p>Time Slot: {selectedBooking.timeSlot}</p>
//           <p>Slot Date: {selectedBooking.slotDate}</p>
//           <p>Booking Date: {selectedBooking.bookingDate}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default BookingTable;


// ------------------------new backend functionality--------------
import React, { useMemo, useState } from "react";
import { useTable } from "react-table";
import {axiosInstance} from './utility/urlInstance'
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
      console.log(equipmentId)
      return;
    }

    if (bookings.length === 0) {
      alert("No bookings selected!");
      return;
    }
let userID ="3005e2d5-6a56-4d47-afa1-3cf4e80721bc"
    const payload = {
      equipmentId,
      bookingsCount: bookings.length,
      bookings,
      userID
    };

    console.log("Submitting booking:", payload);

  await  axiosInstance.post("/booking/equipmentBookings",
    { 
      bookings : payload.bookings, 
      bookingsCount :payload.bookingsCount, 
      equipmentId:payload.equipmentId, 
      userID:payload.userID
    }
  )
      .then((data) => {
        console.log(data)
        alert("Booking submitted successfully!");
        console.log(data);
      })
      .catch((error) => {
        console.error("Error submitting booking:", error);
        alert("Error submitting booking.");
      });
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

  return (
    <div>
      <div className="container">
        <select
          name="equipmentName"
          onChange={(e) => setEquipmentId(e.target.value)}
          value={equipmentId}
        >
          <option value="">Select Equipment</option>
          <option value="3176b9aa-2ee2-4367-8b84-9bcf27e75608">Equipment 1</option>
          <option value="aa93be17-314a-4d19-8058-63f298b4496a">Equipment 2</option>
          <option value="b8c4cb43-651e-45b5-a5ad-3542ec7c6e0b">Equipment 3</option>
     
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
                    const isPast = dayDate && dayDate < now;

                    let cellStyle = {};
                    let cellText = cell.value;

                    if (isWeekend && !isTimeColumn) {
                      // Weekend logic
                      cellStyle = { backgroundColor: "red", color: "white", cursor: "not-allowed" };
                      cellText = "Weekend";
                    } else if (isPast && !isBooked && !isTimeColumn) {
                      // Past slots
                      cellStyle = { backgroundColor: "black", color: "white", cursor: "not-allowed" };
                      cellText = "Closed without booking";
                    } else if (isBooked) {
                      // Booked cells
                      cellStyle = { backgroundColor: "green", color: "white" };
                      cellText = "Booked";
                    } else if (isTimeColumn) {
                      // Time column styling
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

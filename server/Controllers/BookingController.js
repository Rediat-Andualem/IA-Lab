const { Equipment } = require('../models');
const { Booking } = require('../models'); // Assuming you have a Booking model

const getBookings = async (req, res) => {
  const { bookings, bookingsCount, equipmentId, userID } = req.body;

  try {
    // Check if equipment exists
    const equipment = await Equipment.findOne({ where: { equipmentId } });

    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found." });
    }

    // Check maxBookingsPerTwoWeeks limit
    if (parseInt(bookingsCount, 10) > parseInt(equipment.maxBookingsPerTwoWeeks, 10)) {
      return res.status(400).json({ message: "Your booking exceeds the maximum limits." });
    }

    // Prepare booking data
    const bookingData = bookings.map((booking) => ({
      userId: userID,
      equipmentId,
      bookedDate: booking.bookingDate,
      slotTime: booking.timeSlot,
      slotDate: booking.slotDate,
      bookingStatus: "Booked",
    }));

    // Insert bookings into the database
    await Booking.bulkCreate(bookingData);

    return res.status(201).json({ message: "Booking successful." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while processing the booking." });
  }
};

module.exports = { getBookings };

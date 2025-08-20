package com.oracle.inflight.controller;


import com.oracle.inflight.entity.Booking;
import com.oracle.inflight.repository.BookingRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/checkin")
public class CheckInController {

    private final BookingRepository bookingRepository;

    public CheckInController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @GetMapping("/flight/{id}/passengers")
    public List<Booking> getPassengers(@PathVariable("id") Long flightId) {
        return bookingRepository.findByFlightId(flightId);
    }

    @PostMapping("/assign-seat")
    public Booking assignSeat(@RequestBody Map<String, Object> request) {
        Long bookingId = Long.valueOf(request.get("bookingId").toString());
        String seatNo = request.get("seatNo").toString();

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setSeatNo(seatNo);
        return bookingRepository.save(booking);
    }

//     {
//   "bookingId": 1,
//   "seatNo": "12A"
// }

    @PostMapping("/undo")
    public Booking undoSeatAssignment(@RequestBody Map<String, Object> request) {
        Long bookingId = Long.valueOf(request.get("bookingId").toString());

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setSeatNo(null);  // undo seat assignment
        return bookingRepository.save(booking);
}

// {
//   "bookingId": 1
// }
    @PutMapping("/change-seat")
    public Booking changeSeat(@RequestBody Map<String, Object> request) {
        Long bookingId = Long.valueOf(request.get("bookingId").toString());
        String newSeatNo = request.get("seatNo").toString();

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setSeatNo(newSeatNo);  // update seat number
        return bookingRepository.save(booking);
    }

//     {
//   "bookingId": 1,
//   "seatNo": "15C"
// }


}

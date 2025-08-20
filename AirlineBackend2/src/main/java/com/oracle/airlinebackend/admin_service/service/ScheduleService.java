package com.oracle.airlinebackend.admin_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import com.oracle.airlinebackend.admin_service.entity.Schedule;
import com.oracle.airlinebackend.admin_service.repository.ScheduleRepository;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    public Optional<Schedule> getScheduleById(Long id) {
        return scheduleRepository.findById(id);
    }

    public Schedule createSchedule(Schedule schedule) {
        return scheduleRepository.save(schedule);
    }

    public Schedule updateSchedule(Long id, Schedule updatedSchedule) {
        return scheduleRepository.findById(id).map(schedule -> {
            schedule.setFlightId(updatedSchedule.getFlightId());
            schedule.setArrival(updatedSchedule.getArrival());
            schedule.setArrivalTime(updatedSchedule.getArrivalTime());
            schedule.setDestination(updatedSchedule.getDestination());
            schedule.setDestTime(updatedSchedule.getDestTime());
            schedule.setStatus(updatedSchedule.getStatus());
            return scheduleRepository.save(schedule);
        }).orElseThrow(() -> new RuntimeException("Schedule not found with id " + id));
    }

    public void deleteSchedule(Long id) {
        scheduleRepository.deleteById(id);
    }
}

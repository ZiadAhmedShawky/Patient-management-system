package com.patient.mangement_system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.patient.mangement_system.entity.Appointment;
import com.patient.mangement_system.service.AppointmentService;

@RestController
@RequestMapping("/appointment")
public class AppointmentController {
	
	@Autowired
	private AppointmentService appointmentService;
	
	@PostMapping("/save")
	public void save(@RequestBody Appointment appointment) {
		appointmentService.saveAppointment(appointment);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteAppointmentById(@PathVariable Long id) {
		appointmentService.deleteAppointmentById(id);
	}
	
    @GetMapping("/findAll")
    public Page<Appointment> getAllPatients(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "2") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir
    ) {
        return appointmentService.getAllAppointments(page, size, sortBy, sortDir);
    }
    
    @GetMapping("/getById/{id}")
    public Appointment getAppointmentById(@PathVariable Long id) {
    	return appointmentService.getAppointmentById(id);
    }
    
    @PatchMapping("/update/{id}")
    public Appointment updaeAppointment(@PathVariable Long id,@RequestBody Appointment appointment) {
    	return appointmentService.updateAppointment(id, appointment);
    }
    
    
}

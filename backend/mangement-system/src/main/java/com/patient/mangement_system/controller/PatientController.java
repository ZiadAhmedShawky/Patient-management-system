package com.patient.mangement_system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
import com.patient.mangement_system.entity.Patient;
import com.patient.mangement_system.service.AppointmentService;
import com.patient.mangement_system.service.PatientService;

@RestController
@RequestMapping("/patient")
public class PatientController {
	
	@Autowired
	private PatientService patientService;
	
	@Autowired
	private AppointmentService appointmentService;
	
	@PostMapping("/save")
	public void SavePatient(@RequestBody Patient patient) {
		patientService.savePatient(patient);
	}
	
    @GetMapping("/findAll")
    public Page<Patient> getAllPatients(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "2") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir
    ) {
        return patientService.getAllPatients(page, size, sortBy, sortDir);
    }
	
    @GetMapping("/getById/{id}")
    public Patient getPatient(@PathVariable Long id) {
    	return patientService.getPatientById(id);
    }
    
    @PatchMapping("/update/{id}")
    public Patient updatePatient(
            @PathVariable Long id,
            @RequestBody Patient patient
    ) {
        Patient updatedPatient = patientService.updatePatient(id, patient);
        return updatedPatient;
    }
    
    @GetMapping("/{id}/appointments")
    public List<Appointment> findAppointmentsById(@PathVariable Long id){
    	return appointmentService.findAppointmentsForPatient(id);
    }
    
    @DeleteMapping("/delete/{id}")
    public void deletePatientById(@PathVariable Long id) {
    	patientService.deletePatient(id);
    }
    @GetMapping("/search")
    public Page<Patient> search(
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) Integer pageNumber,
            @RequestParam(required = false) Integer pageSize
    		) {
        return patientService.search(firstName, lastName, pageNumber,pageSize);
    }
}

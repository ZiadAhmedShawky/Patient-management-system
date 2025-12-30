package com.patient.mangement_system.entity;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "appointment")
@Getter
@Setter
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "appointment_date")
    private LocalDateTime appointmentDate;

    @Column(name = "reason", length = 255)
    private String reason;

    @Column(name = "status")
    private String status;
    
    @Column(name="patient_id")
    private Long patientId;
}

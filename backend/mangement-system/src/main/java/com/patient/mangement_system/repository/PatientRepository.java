package com.patient.mangement_system.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.patient.mangement_system.entity.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
	
	@Query(value = "select e from Patient e where "+
	"(:FIRST_NAME is null or e.firstName like :FIRST_NAME ) "+		
	"AND (:LAST_NAME is null or e.firstName like :LAST_NAME) "
			
	)
	
	Page<Patient> search(@Param("FIRST_NAME") String firstName,@Param("LAST_NAME") String lastName, Pageable pageable);
}

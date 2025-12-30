package com.patient.mangement_system.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.patient.mangement_system.entity.UserInfo;


public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
    Optional<UserInfo> findByEmail(String email); // Use 'email' if that is the correct field for login
}
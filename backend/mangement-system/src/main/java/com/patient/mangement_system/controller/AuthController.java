package com.patient.mangement_system.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.patient.mangement_system.dto.LoginReq;
import com.patient.mangement_system.entity.UserInfo;
import com.patient.mangement_system.repository.UserInfoRepository;
import com.patient.mangement_system.service.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;


@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserInfoRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    
    public AuthController(
            AuthenticationManager authManager,
            UserInfoRepository userRepository,
            JwtService jwtService,
            PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authManager;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder=passwordEncoder;
        
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> authenticateAndGetToken(@RequestBody LoginReq loginReq) {
    	   try {
    	        this.validateAuthReq(loginReq);
    	        
    	        try {
    	            Authentication authentication = authenticationManager.authenticate(
    	                new UsernamePasswordAuthenticationToken(loginReq.getEmail(), loginReq.getPassword())
    	            );
    	            
    	            UserInfo user = userRepository.findByEmail(loginReq.getEmail()).get();
    	            String token = jwtService.generateToken(loginReq.getEmail(), user.getRoles());
    	            
    	            Map<String, String> response = new HashMap<>();
    	            response.put("token", token);
    	            response.put("role", user.getRoles());
    	            return ResponseEntity.ok(response);
    	            
    	        } catch (BadCredentialsException e) {
    	            // This catches wrong password or user not found
    	            Map<String, String> errorResponse = new HashMap<>();
    	            errorResponse.put("message", "Invalid email or password");
    	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    	        }
    	        
    	    } catch (UsernameNotFoundException e) {
    	        // This catches our validation exceptions
    	        Map<String, String> errorResponse = new HashMap<>();
    	        errorResponse.put("message", e.getMessage());
    	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    	    } catch (Exception e) {
    	        Map<String, String> errorResponse = new HashMap<>();
    	        errorResponse.put("message", "Login failed");
    	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    	    }
    }

    // CREATE USER (ADMIN ONLY)
    @PostMapping("/register")
    public void createUser(@RequestBody UserInfo userInfo) {
        if (userRepository.findByEmail(userInfo.getEmail()).isPresent()) {
            throw new RuntimeException("Username exists");
        }
        
        userInfo.setPassword(passwordEncoder.encode(userInfo.getPassword()));
        
        userRepository.save(userInfo);

    }
    
    private void validateAuthReq(LoginReq loginReq) {
        
    	if(loginReq.getEmail()==null || loginReq.getEmail().isEmpty() ) {
    		throw new UsernameNotFoundException("Invalid User Request");
    	}
    	
       	if(loginReq.getPassword()==null || loginReq.getPassword().isEmpty() ) {
    		throw new UsernameNotFoundException("Invalid User Request");
    	}

    }
}

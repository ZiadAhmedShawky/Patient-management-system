package com.patient.mangement_system.enums;

public enum Role {
    ROLE_ADMIN("Admin"),
    USER("User");
    
    private String role;
	
	Role(String role){
		this.role=role;
	}
	
	public String getRole() {
		return role;
	}
}


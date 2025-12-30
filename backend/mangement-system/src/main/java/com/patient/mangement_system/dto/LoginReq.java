package com.patient.mangement_system.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginReq {
    String email;
    String password;
}

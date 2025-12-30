package com.patient.mangement_system.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.patient.mangement_system.entity.UserInfo;
import com.patient.mangement_system.repository.UserInfoRepository;



@Service
public class UserInfoService implements UserDetailsService {

    private final UserInfoRepository userInfoRepository;

    @Autowired
    public UserInfoService(UserInfoRepository repository) {
        this.userInfoRepository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserInfo> userInfo = userInfoRepository.findByEmail(username);

        if (userInfo.isEmpty()) {
            throw new UsernameNotFoundException("User not found with email: " + username);
        }

        UserInfo user = userInfo.get();
        return User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .authorities(user.getRoles()) // assuming roles is already a collection or string[]
                .build();
    }
}

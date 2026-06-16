package com.layoverexplorer.app.service;

import com.layoverexplorer.app.dto.RegistrationRequest;
import com.layoverexplorer.app.entity.User;
import com.layoverexplorer.app.entity.UserPreference;
import com.layoverexplorer.app.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean existsByEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    @Transactional
    public User registerUser(RegistrationRequest request) {
        if (existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("User with this email already exists");
        }
        if (!request.isPasswordMatching()) {
            throw new IllegalArgumentException("Passwords do not match");
        }

        String encodedPassword = passwordEncoder.encode(request.getPassword());
        User user = new User(request.getEmail(), encodedPassword, "ROLE_USER");
        
        // Initialize default preferences
        UserPreference preference = new UserPreference(user, 4, 24, "arts,food");
        user.setPreference(preference);

        return userRepository.save(user);
    }
}

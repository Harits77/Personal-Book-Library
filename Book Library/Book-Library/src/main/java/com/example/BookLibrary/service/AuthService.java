package com.example.BookLibrary.service;

import com.example.BookLibrary.model.User;
import com.example.BookLibrary.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    // Register user
    public String register(User user) {
        Optional<User> existing = userRepository.findByEmail(user.getEmail());
        if (existing.isPresent()) {
            return "Email already in use";
        }
        userRepository.save(user);
        return "Registered successfully";
    }

    // Login user
    public Map<String, String> login(User user) {
        Optional<User> existing = userRepository.findByEmail(user.getEmail());
        if (existing.isPresent() && existing.get().getPassword().equals(user.getPassword())) {
            return Map.of("userId", existing.get().getId());
        }
        return null;
    }
}

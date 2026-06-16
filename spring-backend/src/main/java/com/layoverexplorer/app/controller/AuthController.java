package com.layoverexplorer.app.controller;

import com.layoverexplorer.app.dto.RegistrationRequest;
import com.layoverexplorer.app.service.UserService;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/login")
    public String showLoginForm() {
        return "login";
    }

    @GetMapping("/register")
    public String showRegistrationForm(Model model) {
        model.addAttribute("registrationRequest", new RegistrationRequest());
        return "register";
    }

    @PostMapping("/register")
    public String processRegistration(
            @Valid @ModelAttribute("registrationRequest") RegistrationRequest registrationRequest,
            BindingResult bindingResult,
            Model model) {

        if (bindingResult.hasErrors()) {
            return "register";
        }

        if (!registrationRequest.isPasswordMatching()) {
            bindingResult.rejectValue("confirmPassword", "error.registrationRequest", "Passwords do not match");
            return "register";
        }

        if (userService.existsByEmail(registrationRequest.getEmail())) {
            bindingResult.rejectValue("email", "error.registrationRequest", "Email already in use");
            return "register";
        }

        try {
            userService.registerUser(registrationRequest);
            return "redirect:/login?registered=true";
        } catch (Exception e) {
            model.addAttribute("errorMessage", "An error occurred during registration. Please try again.");
            return "register";
        }
    }
}

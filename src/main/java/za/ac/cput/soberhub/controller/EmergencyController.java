package za.ac.cput.soberhub.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.soberhub.domain.EmergencyRequest;
import za.ac.cput.soberhub.domain.User;
import za.ac.cput.soberhub.repository.EmergencyRequestRepository;
import za.ac.cput.soberhub.repository.UserRepository;

import java.util.Map;

@RestController
@RequestMapping("/api/emergency")
public class EmergencyController {

    private final EmergencyRequestRepository emergencyRepository;
    private final UserRepository userRepository;

    public EmergencyController(EmergencyRequestRepository emergencyRepository, UserRepository userRepository) {
        this.emergencyRepository = emergencyRepository;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<?> sendEmergency(@RequestBody Map<String, String> body, Authentication auth) {
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();
        EmergencyRequest req = new EmergencyRequest();
        req.setUser(user);
        req.setMessage(body.getOrDefault("message", "Urgent support requested."));
        emergencyRepository.save(req);
        return ResponseEntity.ok(Map.of("message", "Support request recorded."));
    }
}

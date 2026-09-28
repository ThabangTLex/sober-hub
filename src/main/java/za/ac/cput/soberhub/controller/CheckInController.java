package za.ac.cput.soberhub.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.soberhub.domain.CheckIn;
import za.ac.cput.soberhub.domain.User;
import za.ac.cput.soberhub.repository.CheckInRepository;
import za.ac.cput.soberhub.repository.UserRepository;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/checkins")
public class CheckInController {

    private final CheckInRepository checkInRepository;
    private final UserRepository userRepository;

    public CheckInController(CheckInRepository checkInRepository, UserRepository userRepository) {
        this.checkInRepository = checkInRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<CheckIn> getCheckins(Authentication auth) {
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();
        return checkInRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }

    @PostMapping
    public ResponseEntity<?> saveCheckin(@RequestBody Map<String, String> body, Authentication auth) {
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();
        CheckIn checkIn = new CheckIn();
        checkIn.setUser(user);
        checkIn.setMood(body.get("mood"));
        checkIn.setNote(body.get("note"));
        checkInRepository.save(checkIn);
        return ResponseEntity.ok(Map.of("message", "Check-in saved."));
    }
}

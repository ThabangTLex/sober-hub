package za.ac.cput.soberhub.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.soberhub.domain.MentorRequest;
import za.ac.cput.soberhub.domain.User;
import za.ac.cput.soberhub.repository.MentorRequestRepository;
import za.ac.cput.soberhub.repository.UserRepository;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mentor")
public class MentorController {

    private final MentorRequestRepository mentorRepository;
    private final UserRepository userRepository;

    public MentorController(MentorRequestRepository mentorRepository, UserRepository userRepository) {
        this.mentorRepository = mentorRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<MentorRequest> getRequests(Authentication auth) {
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();
        return mentorRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }

    @PostMapping
    public ResponseEntity<?> sendRequest(@RequestBody Map<String, String> body, Authentication auth) {
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();
        MentorRequest req = new MentorRequest();
        req.setUser(user);
        req.setMessage(body.get("message"));
        mentorRepository.save(req);
        return ResponseEntity.ok(Map.of("message", "Mentor request sent."));
    }
}

package za.ac.cput.soberhub.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.soberhub.domain.User;
import za.ac.cput.soberhub.repository.UserRepository;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private final UserRepository userRepository;

    public PaymentController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<?> activateMembership(@RequestBody Map<String, String> body, Authentication auth) {
        String plan = body.get("plan");
        if (plan == null || plan.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Plan is required."));
        }
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();
        user.setMembershipPlan(plan);
        user.setMembershipStatus("active");
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "Membership activated.", "plan", plan));
    }
}

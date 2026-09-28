package za.ac.cput.soberhub.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.soberhub.domain.CommunityPost;
import za.ac.cput.soberhub.domain.User;
import za.ac.cput.soberhub.repository.CommunityPostRepository;
import za.ac.cput.soberhub.repository.UserRepository;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/community")
public class CommunityController {

    private final CommunityPostRepository postRepository;
    private final UserRepository userRepository;

    public CommunityController(CommunityPostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<CommunityPost> getPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc();
    }

    @PostMapping
    public ResponseEntity<?> createPost(@RequestBody Map<String, String> body, Authentication auth) {
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();
        CommunityPost post = new CommunityPost();
        post.setUser(user);
        post.setContent(body.get("content"));
        postRepository.save(post);
        return ResponseEntity.ok(Map.of("message", "Post shared."));
    }
}

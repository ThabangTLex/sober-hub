package za.ac.cput.soberhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import za.ac.cput.soberhub.domain.MentorRequest;
import java.util.List;

public interface MentorRequestRepository extends JpaRepository<MentorRequest, Long> {
    List<MentorRequest> findByUserIdOrderByCreatedAtDesc(Long userId);
}

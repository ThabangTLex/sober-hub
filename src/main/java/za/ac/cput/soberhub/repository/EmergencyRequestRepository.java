package za.ac.cput.soberhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import za.ac.cput.soberhub.domain.EmergencyRequest;
import java.util.List;

public interface EmergencyRequestRepository extends JpaRepository<EmergencyRequest, Long> {
    List<EmergencyRequest> findByUserIdOrderByCreatedAtDesc(Long userId);
}

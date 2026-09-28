package za.ac.cput.soberhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import za.ac.cput.soberhub.domain.CheckIn;
import java.util.List;

public interface CheckInRepository extends JpaRepository<CheckIn, Long> {
    List<CheckIn> findByUserIdOrderByCreatedAtDesc(Long userId);
}

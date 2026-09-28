package za.ac.cput.soberhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import za.ac.cput.soberhub.domain.CommunityPost;
import java.util.List;

public interface CommunityPostRepository extends JpaRepository<CommunityPost, Long> {
    List<CommunityPost> findAllByOrderByCreatedAtDesc();
}

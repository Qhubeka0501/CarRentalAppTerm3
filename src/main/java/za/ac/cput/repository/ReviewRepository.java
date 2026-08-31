package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Review;

/*
 * Class Name: ReviewRepository
 * Description: Review Repository for CarRentSystem
 * Author: Lucky July Twala (231242840)
 * Date: 12 July 2026
 */

@Repository
public interface ReviewRepository extends JpaRepository<Review, String> {

}
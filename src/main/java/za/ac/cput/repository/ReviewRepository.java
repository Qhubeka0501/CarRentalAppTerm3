package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Review;

/*
 * Class Name: ReviewServiceImpl
 * Description: ReviewService implementation for CarRentSystem
 * Author: Alphonsine Ningabiye (230426581)
 * Date: 12 July 2026
 */

@Repository
public interface ReviewRepository extends JpaRepository<Review, String> {

}
package za.ac.cput.service;

import za.ac.cput.domain.Review;

import java.util.List;

/*
 * Class Name: ReviewService
 * Description: ReviewService interface for CarRentSystem
 * Author: Lucky July Twala (231242840)
 * Date: 12 July 2026
 */
public interface ReviewService extends IService<Review, String> {
    List<Review> findAll();
}
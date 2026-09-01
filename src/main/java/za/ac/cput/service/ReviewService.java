package za.ac.cput.service;

import za.ac.cput.domain.Review;

import java.util.List;

/*
 * Class Name: ReviewServiceImpl
 * Description: ReviewService implementation for CarRentSystem
 * Author: Alphonsine Ningabiye (230426581)
 * Date: 12 July 2026
 */
public interface ReviewService extends IService<Review, String> {
    List<Review> findAll();
}
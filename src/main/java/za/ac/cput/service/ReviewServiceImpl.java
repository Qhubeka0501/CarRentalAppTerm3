package za.ac.cput.service;

import org.springframework.stereotype.Service;
import za.ac.cput.domain.Review;
import za.ac.cput.repository.ReviewRepository;

import java.util.List;

/*
 * Class Name: ReviewServiceImpl
 * Description: ReviewService implementation for CarRentSystem
 * Author: Lucky July Twala (231242840)
 * Date: 12 July 2026
 */
@Service
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository repository;

    public ReviewServiceImpl(ReviewRepository repository) {
        this.repository = repository;
    }

    @Override
    public Review create(Review review) {
        return repository.save(review);
    }

    @Override
    public Review read(String reviewId) {
        return repository.findById(reviewId).orElse(null);
    }

    @Override
    public Review update(Review review) {
        return repository.save(review);
    }

    @Override
    public boolean delete(String reviewId) {
        if (repository.existsById(reviewId)) {
            repository.deleteById(reviewId);
            return true;
        }
        return false;
    }

    @Override
    public List<Review> findAll() {
        return repository.findAll();
    }
}
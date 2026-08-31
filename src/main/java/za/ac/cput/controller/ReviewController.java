package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Review;
import za.ac.cput.service.ReviewService;

import java.util.List;

@RestController
@RequestMapping("/review")
public class ReviewController {

    private ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/create")
    public Review create(@RequestBody Review review) {
        return reviewService.create(review);
    }

    @GetMapping("/read/{reviewId}")
    public Review read(@PathVariable("reviewId") String reviewId) {
        return reviewService.read(reviewId);
    }

    @PutMapping("/update")
    public Review update(@RequestBody Review review) {
        return reviewService.update(review);
    }

    @DeleteMapping("/delete/{reviewId}")
    public void delete(@PathVariable("reviewId") String reviewId) {
        reviewService.delete(reviewId);
    }

    @GetMapping("/getAll")
    public List<Review> getAll() {
        return reviewService.findAll();
    }
}
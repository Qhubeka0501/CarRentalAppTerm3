package za.ac.cput.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import za.ac.cput.domain.Review;
import za.ac.cput.service.ReviewService;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReviewControllerTest {

    @Mock
    private ReviewService reviewService;

    @InjectMocks
    private ReviewController reviewController;

    private Review review;

    @BeforeEach
    void setUp() {

        review = new Review.Builder()
                .setReviewId("R001")
                .setCustomerId("C001")
                .setComments("Excellent service and clean car")
                .setRating(5)
                .build();
    }

    @Test
    void create() {

        when(reviewService.create(review))
                .thenReturn(review);

        Review result =
                reviewController.create(review);

        assertNotNull(result);
        assertEquals("R001", result.getReviewId());
        assertEquals("C001", result.getCustomerId());
        assertEquals("Excellent service and clean car",
                result.getComments());
        assertEquals(5, result.getRating());

        verify(reviewService, times(1))
                .create(review);
    }

    @Test
    void read() {

        when(reviewService.read("R001"))
                .thenReturn(review);

        Review result =
                reviewController.read("R001");

        assertNotNull(result);
        assertEquals("R001", result.getReviewId());
        assertEquals("C001", result.getCustomerId());
        assertEquals(5, result.getRating());

        verify(reviewService, times(1))
                .read("R001");
    }

    @Test
    void update() {

        Review updatedReview =
                new Review.Builder()
                        .copy(review)
                        .setComments("Very good service")
                        .setRating(4)
                        .build();

        when(reviewService.update(updatedReview))
                .thenReturn(updatedReview);

        Review result =
                reviewController.update(updatedReview);

        assertNotNull(result);
        assertEquals("R001", result.getReviewId());
        assertEquals("C001", result.getCustomerId());
        assertEquals("Very good service",
                result.getComments());
        assertEquals(4, result.getRating());

        verify(reviewService, times(1))
                .update(updatedReview);
    }

    @Test
    void delete() {

        doNothing()
                .when(reviewService)
                .delete("R001");

        reviewController.delete("R001");

        verify(reviewService, times(1))
                .delete("R001");
    }

    @Test
    void getAll() {

        List<Review> reviews =
                List.of(review);

        when(reviewService.findAll())
                .thenReturn(reviews);

        List<Review> result =
                reviewController.getAll();

        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertEquals(1, result.size());

        assertEquals("R001",
                result.get(0).getReviewId());

        assertEquals("C001",
                result.get(0).getCustomerId());

        assertEquals(5,
                result.get(0).getRating());

        verify(reviewService, times(1))
                .findAll();
    }
}
package za.ac.cput.factory;

import org.junit.jupiter.api.Test;
import za.ac.cput.domain.Review;

import static org.junit.jupiter.api.Assertions.*;

class ReviewFactoryTest {

    @Test
    void createReview() {

        Review review = ReviewFactory.createReview(
                "CUS001",
                "Excellent service",
                "Excellent",
                5
        );

        assertNotNull(review);
        assertNotNull(review.getReviewId());

        assertEquals("CUS001", review.getCustomerId());
        assertEquals("Excellent service", review.getComments());
        assertEquals(5, review.getRating());

        System.out.println(review);
    }
}


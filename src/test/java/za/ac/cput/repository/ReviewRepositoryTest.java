package za.ac.cput.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import za.ac.cput.domain.Review;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class ReviewRepositoryTest {

    @Autowired
    private ReviewRepository repository;

    @Test
    void saveReview() {

        Review review = new Review.Builder()
                .setReviewId("REV001")
                .setCustomerId("CUS001")
                .setComments("Excellent service")
                .setRating(5)
                .build();

        Review saved = repository.save(review);

        assertNotNull(saved);
        assertEquals("REV001", saved.getReviewId());
        assertEquals("CUS001", saved.getCustomerId());
        assertEquals("Excellent service", saved.getComments());
        assertEquals(5, saved.getRating());
    }

    @Test
    void readReview() {

        Review review = new Review.Builder()
                .setReviewId("REV002")
                .setCustomerId("CUS002")
                .setComments("Good service")
                .setRating(4)
                .build();

        repository.save(review);

        Review found = repository.findById("REV002").orElse(null);

        assertNotNull(found);
        assertEquals("REV002", found.getReviewId());
        assertEquals("CUS002", found.getCustomerId());
        assertEquals("Good service", found.getComments());
        assertEquals(4, found.getRating());
    }

    @Test
    void deleteReview() {

        Review review = new Review.Builder()
                .setReviewId("REV003")
                .setCustomerId("CUS003")
                .setComments("Average service")
                .setRating(3)
                .build();

        repository.save(review);

        repository.deleteById("REV003");

        assertFalse(repository.existsById("REV003"));
    }

    @Test
    void findAllReviews() {

        Review review = new Review.Builder()
                .setReviewId("REV004")
                .setCustomerId("CUS004")
                .setComments("Very good")
                .setRating(5)
                .build();

        repository.save(review);

        var reviews = repository.findAll();

        assertNotNull(reviews);
        assertFalse(reviews.isEmpty());
    }
}


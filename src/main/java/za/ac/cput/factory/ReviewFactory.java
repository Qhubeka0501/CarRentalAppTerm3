package za.ac.cput.factory;

/* Class Name: Review.java
 *Description: Review CarRentSystem Class
 * Author: Alphonsine Ningabiye(230426581)
 * Date: 28 June 2026
 */
import za.ac.cput.domain.Review;

public class ReviewFactory {

    public static Review createReview(
            String customerId,
            String comments,
            String excellentService, int rating) {

        String reviewId = generateReviewId();

        return new Review.Builder()
                .setReviewId(reviewId)
                .setCustomerId(customerId)
                .setComments(comments)
                .setRating(rating)
                .build();
    }

    private static String generateReviewId() {
        return "REV" + System.currentTimeMillis();
    }
}
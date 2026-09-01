package za.ac.cput.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import za.ac.cput.domain.Review;
import za.ac.cput.repository.ReviewRepository;

import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ReviewServiceImplTest {

    @Mock
    private ReviewRepository repository;

    @InjectMocks
    private ReviewServiceImpl service;

    private Review review;

    @BeforeEach
    void setUp() {

        MockitoAnnotations.openMocks(this);

        review = new Review.Builder()
                .setReviewId("REV001")
                .setCustomerId("CUS001")
                .setComments("Excellent service")
                .setRating(5)
                .build();
    }

    @Test
    void create() {

        when(repository.save(review)).thenReturn(review);

        Review result = service.create(review);

        assertNotNull(result);
        assertEquals("REV001", result.getReviewId());

        verify(repository).save(review);
    }

    @Test
    void read() {

        when(repository.findById("REV001"))
                .thenReturn(Optional.of(review));

        Review result = service.read("REV001");

        assertNotNull(result);
        assertEquals("REV001", result.getReviewId());

        verify(repository).findById("REV001");
    }

    @Test
    void update() {

        when(repository.save(review)).thenReturn(review);

        Review result = service.update(review);

        assertNotNull(result);
        assertEquals("REV001", result.getReviewId());

        verify(repository).save(review);
    }

    @Test
    void deleteWhenExists() {

        when(repository.existsById("REV001"))
                .thenReturn(true);

        boolean result = service.delete("REV001");

        assertTrue(result);

        verify(repository).existsById("REV001");
        verify(repository).deleteById("REV001");
    }

    @Test
    void deleteWhenNotExists() {

        when(repository.existsById("REV001"))
                .thenReturn(false);

        boolean result = service.delete("REV001");

        assertFalse(result);

        verify(repository).existsById("REV001");

        verify(repository, never())
                .deleteById("REV001");
    }

    @Test
    void findAll() {

        when(repository.findAll())
                .thenReturn(Arrays.asList(review));

        var result = service.findAll();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("REV001", result.get(0).getReviewId());

        verify(repository).findAll();
    }
}


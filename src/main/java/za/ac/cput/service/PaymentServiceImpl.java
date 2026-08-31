package za.ac.cput.service;

import org.springframework.stereotype.Service;
import za.ac.cput.domain.Payment;
import za.ac.cput.repository.PaymentRepository;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository repository;

    public PaymentServiceImpl(PaymentRepository repository) {
        this.repository = repository;
    }

    @Override
    public Payment create(Payment payment) {
        return repository.save(payment);
    }

    @Override
    public Payment read(String paymentId) {
        return repository.findById(paymentId).orElse(null);
    }

    @Override
    public Payment update(Payment payment) {
        return repository.save(payment);
    }

    @Override
    public boolean delete(String paymentId) {
        if (repository.existsById(paymentId)) {
            repository.deleteById(paymentId);
            return true;
        }
        return false;
    }

    @Override public java.util.List<Payment> findAll(){ return repository.findAll(); }
}

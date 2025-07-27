// package com.zidio.auth.payment.service;

// import com.zidio.auth.payment.entity.Payment;
// import com.zidio.auth.payment.repository.PaymentRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.time.LocalDate;
// import java.util.List;

// @Service
// public class PaymentService {

//     @Autowired
//     private PaymentRepository paymentRepository;

//     public Payment makePayment(String email, Double amount) {
//         Payment payment = new Payment();
//         payment.setUserEmail(email);
//         payment.setAmount(amount);
//         payment.setPaymentDate(LocalDate.now());
//         return paymentRepository.save(payment);
//     }

//     public List<Payment> getUserPayments(String email) {
//         return paymentRepository.findByUserEmail(email);
//     }
// }





package com.zidio.auth.payment.service;

import com.zidio.auth.dto.EmailRequest;
import com.zidio.auth.payment.entity.Payment;
import com.zidio.auth.payment.repository.PaymentRepository;
import com.zidio.auth.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private NotificationService notificationService;

    public Payment makePayment(String email, Double amount) {
        Payment payment = new Payment();
        payment.setUserEmail(email);
        payment.setAmount(amount);
        payment.setPaymentDate(LocalDate.now());

        Payment savedPayment = paymentRepository.save(payment);

        // 📨 Send confirmation email
        String subject = "Payment Confirmation";
        String body = "Dear user,\n\nYour payment of ₹" + amount + " on " + savedPayment.getPaymentDate()
                + " was successful.\n\nThank you for your payment.";
        notificationService.sendMail(new EmailRequest(email, subject, body));

        return savedPayment;
    }

    public List<Payment> getUserPayments(String email) {
        return paymentRepository.findByUserEmail(email);
    }
}

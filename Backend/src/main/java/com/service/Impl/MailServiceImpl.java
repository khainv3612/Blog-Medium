package com.service.Impl;

import com.config.MyConstants;
import com.dto.PostDto;
import com.model.Account;
import com.service.IAccountService;
import com.service.IMailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Date;
import java.util.List;

@Service
public class MailServiceImpl implements IMailService {

    @Autowired
    public JavaMailSender emailSender;
    @Autowired
    private IAccountService accountService;

    @Override
    public void sendMail(String content) {
    }

    @Override
    public void sendEmailPending(PostDto postDto) {
        MimeMessage message = emailSender.createMimeMessage();

        boolean multipart = true;

        MimeMessageHelper helper = null;
        try {
            helper = new MimeMessageHelper(message, multipart, "utf-8");
            String htmlMsg = "<p> Thank you for using our service!</p>\n" +
                    "<p> Your post is pending, you can edit or remove it in personal page.</p>\n" +
                    "<p> Post details:</p>\n" +
                    "<h3 style=\"color:#2a5dde;\">Title: " + postDto.getTitle() + "</h3>\n" +
                    "<h4 style=\"color: red\">Last update: " + new Date() + "</h4>";

            message.setContent(htmlMsg, "text/html");
            List<Account> lstAdmin = accountService.getAdmin();
            String emailAdmin = lstAdmin.get(0).getEmail();
            if (lstAdmin.size() > 1)
                for (int i = 1; i < lstAdmin.size(); i++) {
                    emailAdmin += "," + lstAdmin.get(i).getEmail();
                }

            helper.setTo(InternetAddress.parse(emailAdmin));

            helper.setSubject("Your post '"+postDto.getTitle().toUpperCase()+"' is pending!");
            this.emailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}

package com.controller;


import com.dto.UserDetailDTO;
import com.service.IAccountService;
import com.service.IPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/user-details")
public class UserDetailController {

    @Autowired
    private IAccountService AccountService;

    @Autowired
    private IPostService PostService;

    @PostMapping("/get-user-detail")
    public ResponseEntity<UserDetailDTO> getUserDetail(@RequestBody String username) {
        UserDetailDTO detailDTO = AccountService.getUserDetails(username);
        return new ResponseEntity<>(detailDTO, HttpStatus.OK);
    }


}

package com.controller;


import com.dto.ResetPassDTO;
import com.dto.UserDetailDTO;
import com.service.AuthService;
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
    private AuthService authService;

    @Autowired
    private IPostService PostService;

    @PostMapping("/get-user-detail")
    public ResponseEntity<UserDetailDTO> getUserDetail(@RequestBody String username) {
        UserDetailDTO detailDTO = AccountService.getUserDetails(username);
        return new ResponseEntity<>(detailDTO, HttpStatus.OK);
    }

    @PostMapping("/update-pass")
    public ResponseEntity<String> updatePassword(@RequestBody ResetPassDTO dto) {
        if (!authService.checkPassMatch(dto.getIdUser(), dto.getPassConfirm()))
            return new ResponseEntity<>("Current pass is incorrect!", HttpStatus.BAD_REQUEST);
        if (dto.getNewPass().equals(dto.getPassConfirm()))
            return new ResponseEntity<>("Please set new password", HttpStatus.BAD_REQUEST);
        if (authService.updatePassword(dto)) {
            return new ResponseEntity<>("Update success!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Some thing went wrong!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/update-profile")
    public ResponseEntity<String> updateProfile(@RequestBody UserDetailDTO dto) {
        if (authService.updateProfile(dto)) {
            return new ResponseEntity<>("Update success!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Error!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

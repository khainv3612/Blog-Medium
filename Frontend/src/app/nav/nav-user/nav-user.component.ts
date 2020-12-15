import {Component, Input, OnInit} from '@angular/core';
import {AuthServiceSecu} from '../../auth/auth-service-secu.service';
import {UserDetailService} from '../../service/UserDetailService';

@Component({
  selector: 'app-nav-user',
  templateUrl: './nav-user.component.html',
  styleUrls: ['./nav-user.component.css']
})
export class NavUserComponent implements OnInit {

  @Input()
  avatar: string;

  constructor(private authService: AuthServiceSecu, private userService: UserDetailService) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  redirectDetailPage() {
    this.userService.redirectDetailPage(sessionStorage.getItem('username'));
  }
}

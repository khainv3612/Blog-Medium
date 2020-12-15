import {Component, OnInit} from '@angular/core';
import {AuthServiceSecu} from '../auth/auth-service-secu.service';
import {createPopper} from '@popperjs/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  avatar: string = '';

  constructor(private authService: AuthServiceSecu) {
    this.avatar = this.authService.getAvatar();
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}

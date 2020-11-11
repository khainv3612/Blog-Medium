import { Component, OnInit } from '@angular/core';
import {FacebookService, UIParams, UIResponse} from 'ngx-facebook';

@Component({
  selector: 'app-contact-bar',
  templateUrl: './contact-bar.component.html',
  styleUrls: ['./contact-bar.component.css']
})
export class ContactBarComponent implements OnInit {

  constructor( private fb: FacebookService) { }

  ngOnInit(): void {
  }

  share(url: string) {

    const params: UIParams = {
      href: 'https://www.youtube.com/watch?v=yO1rhOAeKMM',
      method: 'share'
    };

    this.fb.ui(params)
      .then((res: UIResponse) => console.log(res))
      .catch((e: any) => console.error(e));

  }

}

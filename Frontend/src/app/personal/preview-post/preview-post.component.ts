import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {PostPayload} from '../../add-post/post-payload';
import {ActivatedRoute, Router} from '@angular/router';
import {AddPostService} from '../../add-post.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-preview-post',
  templateUrl: './preview-post.component.html',
  styleUrls: ['./preview-post.component.css']
})
export class PreviewPostComponent implements OnInit {
  post: PostPayload;
  dialogTitle: String;
  dialogText: String;
  @Output() submitClicked = new EventEmitter<any>();

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private postService: AddPostService,
              public dialogRef: MatDialogRef<PreviewPostComponent>,
              @Inject(MAT_DIALOG_DATA) public data: PostPayload) {
    // this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit() {
    // this.post = history.state;
    this.post = this.data;
    if (this.post.title != null) {
      localStorage.setItem('post-detail', JSON.stringify(this.post));
    } else {
      this.post = JSON.parse(localStorage.getItem('post-detail'));
    }
    this.dialogTitle = this.data.title;
    this.dialogText = this.data.content;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

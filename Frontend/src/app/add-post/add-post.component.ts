import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {PostPayload} from './post-payload';
import {AddPostService} from '../add-post.service';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {AngularFireStorage} from '@angular/fire/storage';
import {delay, finalize} from 'rxjs/operators';
import * as $ from 'jquery';
import * as firebase from 'firebase';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  urlImageSave = environment.URL_SAVE_IMAGE_BLOG_FIREBASE;
  isSaving = false;
  addPostForm: FormGroup;
  postPayload: PostPayload;
  title = new FormControl('');
  body = new FormControl('');
  imageUrl = '';
  checkImageNull = false;
  selectedImage = null;
  editorConfig = {
    theme: 'modern',
    height: '300',
    image_title: true,
    automatic_uploads: true,
    paste_data_images: true,
    file_picker_types: 'file image media audio',
    media_live_embeds: true,
    plugins:
      'advlist autolink lists link image charmap print preview hr anchor pagebreak ' +
      'searchreplace wordcount visualblocks visualchars code fullscreen' +
      ' insertdatetime media nonbreaking save table contextmenu directionality' +
      ' emoticons template paste textcolor colorpicker textpattern paste'
    ,
    // tslint:disable-next-line:max-line-length
    toolbar1: 'insertfile undo redo | styleselect | fontselect  |bold italic | alignleft aligncenter alignright alignjustify |' +
      ' bullist numlist outdent indent | link image | ' +
      'print preview media | forecolor backcolor emoticons imageupload',
    // toolbar2: 'print preview media | forecolor backcolor emoticons',
    image_advtab: true,


    file_picker_callback: function (callback, value, meta) {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'file/*');
      input.click();
      input.onchange = function () {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
          callback(e.target.result, {
            alt: file.name
          });
        };
        reader.readAsDataURL(file);
      };
    }
  };


  constructor(private addpostService: AddPostService, private storage: AngularFireStorage, private router: Router) {
    this.addPostForm = new FormGroup({
      title: this.title,
      body: this.body
    });
    this.postPayload = {
      id: null,
      image: '',
      content: '',
      title: '',
      username: '',
      lastUpdate: ''
    };
  }

  ngOnInit() {

  }

  async addPost() {
    this.postPayload.content = this.addPostForm.get('body').value;
    this.postPayload.title = this.addPostForm.get('title').value;
    await this.uploadFileImage();
    this.postPayload.image = this.imageUrl;
    // this.imageUrl = '';
    this.addpostService.addPost(this.postPayload).subscribe(data => {
      this.router.navigateByUrl('/');
    }, error => {
      this.addPost();
      console.log('Failure Response');
    });
  }

  showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      // this.percentLoadingImg = 'width: 25%';
      reader.onload = (e: any) => this.imageUrl = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      this.checkImageNull = true;
    } else {
      this.imageUrl = '../../../assets/img/Placeholder.jpg';
      this.selectedImage = null;
    }
  }

  async uploadFileImage() {
    this.isSaving = true;
    const date = new Date();
    let dateCreateStr = '';
    dateCreateStr += date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
    const filePathImage = this.urlImageSave + `${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${dateCreateStr}`;
    const fileRefImage = this.storage.ref(filePathImage);
    await this.storage.upload(filePathImage, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRefImage.getDownloadURL().subscribe(url => {
          this.imageUrl = url;
          this.postPayload.image = this.imageUrl;
        });
      })
    ).subscribe();
  }
}


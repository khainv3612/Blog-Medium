import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostPayload} from './post-payload';
import {AddPostService} from '../add-post.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {AngularFireStorage} from '@angular/fire/storage';
import {delay, finalize} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from 'ngx-webstorage';
import {NotifierModule} from 'angular-notifier';
import {NotifierService} from 'angular-notifier';
import set = Reflect.set;

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  postEdit: PostPayload;
  action = '';
  urlImageSave = environment.URL_SAVE_IMAGE_BLOG_FIREBASE;
  isSaving = false;
  addPostForm: FormGroup;
  postPayload: PostPayload;
  title = new FormControl('', {
    validators: Validators.required,
  });
  body = new FormControl('', {
    validators: Validators.required,
  });
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
    branding: false,
    plugins:
      'advlist autolink lists link image charmap print preview hr anchor pagebreak ' +
      'searchreplace wordcount visualblocks visualchars code fullscreen' +
      ' insertdatetime media nonbreaking save table contextmenu directionality' +
      ' emoticons template paste textcolor colorpicker textpattern paste'
    ,
    // tslint:disable-next-line:max-line-length
    toolbar1: 'insertfile undo redo | styleselect | fontselect  | bold italic underline | alignleft aligncenter alignright alignjustify |' +
      ' bullist numlist outdent indent | link image | ' +
      'print preview media | forecolor backcolor emoticons imageupload',
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
  notifier: NotifierService;


  constructor(private addpostService: AddPostService, private storage: AngularFireStorage,
              private router: Router, private routerActive: ActivatedRoute, private localStoraqeService: LocalStorageService
    , private notifierService: NotifierService) {
    this.notifier = notifierService;
    this.router.getCurrentNavigation().extras.state;
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
    this.routerActive.params.subscribe(params => {
      this.action = params['action'];
    });
    // tslint:disable-next-line:triple-equals
    if (this.action == 'add-post') {
      return;
    }
    this.postEdit = history.state;
    if (this.postEdit.title != null) {
      localStorage.setItem('post-edit', JSON.stringify(this.postEdit));
    } else {
      this.postEdit = JSON.parse(localStorage.getItem('post-edit'));
    }
    if (this.postEdit == null) {
      return;
    }
    this.postPayload.id = this.postEdit.id;
    this.title.setValue(this.postEdit.title);
    this.checkImageNull = true;
    this.imageUrl = this.postEdit.image.toString();
    // @ts-ignore
    this.addPostForm.get('body').value = this.postEdit.content;
  }

  async addPost() {
    this.postPayload.content = this.addPostForm.get('body').value;
    this.postPayload.title = this.addPostForm.get('title').value;
    if (!this.validate('title') || !this.validate('content') || !this.validateImage()) {
      return;
    }
    this.isSaving = true;
    this.postPayload.username = sessionStorage.getItem('username');
    if (this.selectedImage != null) {
      await this.uploadFileImage();
    }
    this.postPayload.image = this.imageUrl;
    this.imageUrl = '';
    if (this.action == 'add-post') {
      this.addpostService.addPost(this.postPayload).subscribe(data => {
        this.showNotification('success', 'Add success!');
        this.isSaving = false;
        this.addPostForm.reset();
        this.imageUrl = '';
        // this.backHome();
      }, error => {
        this.addPost();
        console.log('Failure Response');
      });
    } else {
      this.addpostService.updatePost(this.postPayload).subscribe(data => {
        this.showNotification('success', 'Update success!');
        this.isSaving = false;
        this.addPostForm.reset();
        // setTimeout(this.backHome, 1000);
      }, error => {
        this.addPost();
        console.log('Failure Response');
      });
    }

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

  validate(element): boolean {
    switch (element) {
      case 'title': {
        const title = this.addPostForm.get('title').value.toString();
        if (null == title || title === '' || title.isEmpty) {
          this.showNotification('error', 'Title not be null!');
          return false;
        }
        break;
      }
      case 'content': {
        const content = this.addPostForm.get('body').value;
        if (null == content || content == '' || content.isEmpty) {
          this.showNotification('error', 'Please write somethings!!');
          return false;
        }
        break;
      }
    }
    return true;
  }

  showNotification(type, message) {
    this.notifier.show({
      message: message,
      type: type,
    });
  }

  validateImage(): boolean {
    if (null == this.selectedImage) {
      this.showNotification('error', 'Please choose a image background!');
      return false;
    }
    return true;
  }

  backHome() {
    this.router.navigateByUrl('/');
  }
}


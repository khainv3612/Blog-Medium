import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {RegisterComponent} from './auth/register/register.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterSuccessComponent} from './auth/register-success/register-success.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {HomeComponent} from './home/home.component';
import {AddPostComponent} from './add-post/add-post.component';
import {HttpClientInterceptor} from './http-client-interceptor';
import {PostComponent} from './post/post.component';
import {AuthGuard} from './auth.guard';
import {AngularFireModule, FirebaseApp} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {config} from 'rxjs';
import {environment} from '../environments/environment';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {EditorModule} from '@tinymce/tinymce-angular';
import {AdminComponent} from './admin/admin.component';
// import 'angular2-navigate-with-data';
import {NgxPaginationModule} from 'ngx-pagination';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ContactBarComponent} from './contact-bar/contact-bar.component';
import {createPopper} from '@popperjs/core';
import {NavAdminComponent} from './nav/nav-admin/nav-admin.component';
import {NavUserComponent} from './nav/nav-user/nav-user.component';
import {NavAnonymousComponent} from './nav/nav-anonymous/nav-anonymous.component';
import {MyPostComponent} from './personal/my-post/my-post.component';
import {GoogleLoginProvider, FacebookLoginProvider, SocialLoginModule, SocialAuthServiceConfig} from 'angularx-social-login';
import {JwSocialButtonsModule} from 'jw-angular-social-buttons';
import {FacebookModule} from 'ngx-facebook';
import {MaterialModule} from './material.module';
import {PreviewPostComponent} from './personal/preview-post/preview-post.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {PickerModule} from '@ctrl/ngx-emoji-mart';
import {NgxEmojModule} from 'ngx-emoj';
import {CommentComponent} from './personal/comment/comment.component';
import {NotifierModule, NotifierOptions} from 'angular-notifier';
import {ProfileComponent} from './personal/profile/profile.component';
import {allIcons} from 'angular-feather/icons';
import {FeatherModule} from 'angular-feather';
import {LazyImageModule} from 'ng-lazy-image';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    RegisterSuccessComponent,
    HomeComponent,
    AddPostComponent,
    PostComponent,
    AdminComponent,
    ContactBarComponent,
    NavAdminComponent,
    NavUserComponent,
    NavAnonymousComponent,
    MyPostComponent,
    PreviewPostComponent,
    CommentComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // CKEditorModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'admin/manage/:action', component: AdminComponent, canActivate: [AuthGuard]},
      {path: 'post', component: PostComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register-success', component: LoginComponent},
      {path: 'home', component: HomeComponent},
      {path: 'admin/:action', component: AddPostComponent, canActivate: [AuthGuard]},
      {path: 'mypost/:type-post', component: MyPostComponent, canActivate: [AuthGuard]},
      {path: 'profile', component: ProfileComponent},
    ]),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule,
    EditorModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    // JwSocialButtonsModule,
    SocialLoginModule,
    FacebookModule.forRoot(),
    MaterialModule,
    MatTableModule,
    MatIconModule,
    PickerModule,
    NgxEmojModule,
    NotifierModule.withConfig(customNotifierOptions),
    FeatherModule.pick(allIcons),
    LazyImageModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true},
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '902179770868-j2ristopre632ffe3n0ssr38vs4v1e8h.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('766443074087468')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [PostComponent],
})
export class AppModule {
}

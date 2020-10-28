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
      {path: 'admin/review-post', component: AdminComponent, canActivate: [AuthGuard]},
      {path: 'post', component: PostComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register-success', component: RegisterSuccessComponent},
      {path: 'home', component: HomeComponent},
      {path: 'admin/:action', component: AddPostComponent, canActivate: [AuthGuard]},
      {path: 'mypost/:type-post', component: MyPostComponent, canActivate: [AuthGuard]},
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
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}

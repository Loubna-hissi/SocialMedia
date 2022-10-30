import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingComponent } from './pages/setting/setting.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RightbarComponent } from './components/rightbar/rightbar.component';
import { ContentComponent } from './components/content/content.component';
import { LeftbarComponent } from './components/leftbar/leftbar.component';
import { PostComponent } from './components/post/post.component';
import { CommentComponent } from './components/comment/comment.component';
import { HttpinterceptorService } from 'src/sm-api/src/services/httpInterceptor/httpinterceptor.service';
import { NgToastModule } from 'ng-angular-popup';
import { ReactionComponent } from './components/reaction/reaction.component';
import { PostlistComponent } from './components/postlist/postlist.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SettingComponent,
    NotfoundComponent,
    HomeComponent,
    NavbarComponent,
    RightbarComponent,
    ContentComponent,
    LeftbarComponent,
    PostComponent,
    CommentComponent,
    ReactionComponent,
    PostlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgToastModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:HttpinterceptorService,
      multi:true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

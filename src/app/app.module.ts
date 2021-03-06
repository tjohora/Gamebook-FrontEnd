import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { CommentComponent } from './components/comment/comment.component';
import { PostComponent } from './components/post/post.component';
import { StorageServiceModule } from 'angular-webstorage-service';
import { AuthGuard } from './components/helpers/auth.guard';
import { ErrorInterceptor } from './components/helpers/error.interceptor';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import {editProfileComponent} from './components/profile-page/edit-profile/edit-profile.component';
import { FilterCommentsPipe } from './filters/filter-comments.pipe';
import { FilterUsersPipe } from './filters/filter-users.pipe';
import { FilterHeadersPipe } from './filters/filter-headers.pipe';
import { FilterPostUserPipe } from './filters/filter-post-user.pipe';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { SearchPostComponent } from './components/search-post/search-post.component';
import { FilterPostIDPipe } from './filters/filter-post-id.pipe';
import { FilterPostContentPipe } from './filters/filter-post-content.pipe';
import { FilterCommentIDPipe } from './filters/filter-comment-id.pipe';




@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavbarComponent,
    FooterComponent,
    CommentComponent,
    PostComponent,
    ProfilePageComponent,
    editProfileComponent,
    AdminPageComponent,
    FilterCommentsPipe,
    FilterUsersPipe,
    FilterHeadersPipe,
    FilterPostUserPipe,
    FilterPostIDPipe,
    FilterPostContentPipe,
    FilterCommentIDPipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StorageServiceModule
  ],
  providers: [AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

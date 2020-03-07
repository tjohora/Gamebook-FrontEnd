import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { AuthGuard } from './components/helpers/auth.guard';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'register' , component: RegisterComponent },
  { path: 'login' , component: LoginComponent },
  { path: 'makePost' , component: PostFormComponent, canActivate: [AuthGuard] },
  { path: 'makeComment' , component: CommentFormComponent, canActivate: [AuthGuard] },
  { path: 'profile' , component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [RegisterComponent, LoginComponent, HomeComponent, PostFormComponent, CommentFormComponent, ProfilePageComponent]
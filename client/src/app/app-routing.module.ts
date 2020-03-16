import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './_helpers/auth.guard';
import { ViewblogComponent } from './viewblog/viewblog.component';


// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'home',
//     pathMatch: 'full'
//   },
//   {
//     path : '',
//     component : NavbarComponent,
//     children : [
//       {
//         path : 'login',
//         component : LoginComponent
//       },
//       {
//         path : 'signup',
//         component : SignupComponent
//       },
//       {
//         path: 'home',
//         component: HomeComponent
//       },
//       {
//         path: 'about',
//         component: AboutComponent
//       },
//       {
//         path: 'profile',
//         component: ProfileComponent
//       }
//     ]
//   },
//   { 
//     path: '**', 
//     component: 
//     PageNotFoundComponent
//   }
// ];
const routes: Routes = [
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
     {
        path : 'login',
        component : LoginComponent
      },
      {
        path : 'signup',
        component : SignupComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
      path: 'viewblog/:blogid',
      component: ViewblogComponent,
      canActivate: [AuthGuard]
    },
    { 
      path: '**', 
      component: 
      PageNotFoundComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

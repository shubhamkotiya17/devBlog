import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// material modules
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule, MatSelectModule , MatFormFieldModule, MatRadioModule
} from '@angular/material';
import {MatNativeDateModule, MatCardModule,MatTooltipModule} from '@angular/material';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from  '@angular/material';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './_helpers/jwt-interceptor';
import { ErrorInterceptor } from './_helpers/error-interceptor';
import { LoaderService } from './services/loader.service';
import { LoaderComponent } from './_helpers/loader/loader.component';
import { LoaderInterceptor } from './_helpers/loader-interceptor';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './common/dialog/dialog.component';
import { ViewblogComponent } from './viewblog/viewblog.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import { BloglistComponent } from './bloglist/bloglist.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PageNotFoundComponent,
    HomeComponent,
    AboutComponent,
    ProfileComponent,
    LoginComponent,
    SignupComponent,
    LoaderComponent,
    DialogComponent,
    ViewblogComponent,
    BloglistComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatCardModule,
    MatRadioModule,
    MatTooltipModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    MatToolbarModule,MatIconModule,MatSidenavModule,MatListModule,MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    BrowserAnimationsModule
  ],
  entryComponents: [DialogComponent],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

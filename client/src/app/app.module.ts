import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// material modules
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule, MatSelectModule , MatFormFieldModule
} from '@angular/material';
import {MatNativeDateModule, MatCardModule} from '@angular/material';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from  '@angular/material';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PageNotFoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    MatToolbarModule,MatIconModule,MatSidenavModule,MatListModule,MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

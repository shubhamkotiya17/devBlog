import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { DialogComponent } from '../common/dialog/dialog.component';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn:boolean = false;
  constructor(private dialog: MatDialog, private authenticationService : AuthenticationService) {
        this.isLoggedIn = this.authenticationService.isLoggedIn();
   }

  ngOnInit() {
  }

    openDialog() {

      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      this.dialog.open(DialogComponent ,{
          height: '600px',
          width: '900px',
      });
  }

}

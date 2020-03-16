import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  createBlogForm:FormGroup;
  constructor(
            private fb : FormBuilder,
            private dialogRef: MatDialogRef<DialogComponent>
    ) { }

  ngOnInit() {
      this.createForm();
  }

  createForm(){
      this.createBlogForm = this.fb.group({
          title : ['', Validators.required],
          content : ['', Validators.required]
      })
  }

  get f() { return this.createBlogForm.controls ;}

  onCreateBlog(){
    if(this.createBlogForm.invalid)
      return;

    console.log(this.f.title.value);
    
  }

  close() {
    this.dialogRef.close();
  }
}

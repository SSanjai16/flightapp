import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef, MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data,
  public dialogref:MatDialogRef<ConfirmDialogComponent>) { }

  ngOnInit(): void {
  }
  closedialog()
  {
    this.dialogref.close(false);
  }

}

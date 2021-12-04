import { Injectable } from '@angular/core';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DailogService {

  constructor(private dialog : MatDialog) { }
  openconfirmdialog(msg)
  {
    return this.dialog.open(ConfirmDialogComponent,{
      width:'390px',
      panelClass:'confirm-dailog-container',
      disableClose:true,
      data:{
        message:msg
      }
    });
  }
}

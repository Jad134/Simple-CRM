import { Component } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [ MatDialogContent,MatDialogActions,MatDialogClose,MatButtonModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogAddUserComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

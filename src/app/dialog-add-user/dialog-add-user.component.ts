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
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [ MatDialogContent,MatDialogActions,MatDialogClose,MatButtonModule,MatInputModule,MatFormFieldModule, MatDatepickerModule, FormsModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date; 

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogAddUserComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveUser(){
    this.user.birthDate = this.birthDate.getTime()
    console.log('user:', this.user);
    
  }
}

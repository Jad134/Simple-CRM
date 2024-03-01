
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore,doc, updateDoc  } from '@angular/fire/firestore';



@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})


export class DialogEditUserComponent {
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogEditUserComponent>) { }
  userId: any
  user!: User;
  userRef: any;
  firestore: Firestore = inject(Firestore);

  onNoClick(): void {
    this.dialogRef.close();

  }


  async saveUser() {
    this.userRef = doc(this.firestore, "Users", this.userId);
    await updateDoc(this.userRef, this.user.toJSON())
    this.dialogRef.close();

  }
}

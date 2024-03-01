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
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';



@Component({
  selector: 'app-dialog-edit-address',
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
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogEditAddressComponent>) {
    
  }

  userRef: any;
  userId: any;
  user!: User;
  firestore: Firestore = inject(Firestore);


  onNoClick(): void {
    this.dialogRef.close();
    console.log(this.user);

  }

  async saveUser() {
    this.userRef = doc(this.firestore, "Users", this.userId);
    await updateDoc(this.userRef, this.user.toJSON())
    this.dialogRef.close();

  }
}


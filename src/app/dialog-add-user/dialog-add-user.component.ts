import { Component, inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { getStorage, ref } from "firebase/storage";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    MatProgressBarModule,
    CommonModule,
   
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  loading = false;
  user = new User();
  birthDate!: Date;

  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogAddUserComponent>, ) {
    const aCollection = collection(this.firestore, 'items')

    this.items$ = this.getItems();
  }


  getItems() {
    const aCollection = collection(this.firestore, 'Users');
    return collectionData(aCollection);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async saveUser() {
    this.loading = true;
    // Konvertiere das Datum in Millisekunden, bevor es in die Datenbank gespeichert wird
    this.user.birthDate = this.birthDate.getTime();

    try {
      // Konvertiere das Benutzerobjekt in ein JSON-Objekt
      const userData = JSON.parse(JSON.stringify(this.user));

      await addDoc(collection(this.firestore, 'Users'), userData);
      console.log('Benutzer wurde erfolgreich gespeichert:', userData);
      this.loading = false;
      this.dialogRef.close();
    } catch (error) {
      console.error('Fehler beim Speichern des Benutzers:', error);
    }
   
  }
}

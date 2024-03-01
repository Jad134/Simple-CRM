import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { collection, doc } from "firebase/firestore";
import { Firestore, getDocs } from '@angular/fire/firestore';
import { RouterOutlet, RouterModule } from '@angular/router';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, MatDialogModule, MatCardModule,CommonModule,RouterModule,RouterOutlet],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})


export class UserComponent {


  firestore: Firestore = inject(Firestore);
  user = new User();
  allUsers: any[] = [];
  
  
  constructor(public dialog: MatDialog) {
    this.loadData()
  }


  @Input('matTooltipPosition')
  position: TooltipPosition = 'above'


  openDialog() {
    this.dialog.open(DialogAddUserComponent)
  }


  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId)
  }


  async loadData() {
    try {
      const querySnapshot = await getDocs(collection(this.firestore, 'Users'));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        const userData = {
          id: doc.id,
          ...doc.data()
        };
        this.allUsers.push(userData);
        console.log(this.allUsers);
      });
    } catch (error) {
      console.error('Fehler beim Laden der Daten:', error);
    }
  }
}

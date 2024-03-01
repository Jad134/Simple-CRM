import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, doc, getDoc, query, where, getDocs } from '@angular/fire/firestore';
import { User } from '../../models/user.class';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';




@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIcon, MatButtonModule,MatMenuModule,MatDialogModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})


export class UserDetailComponent {


  firestore: Firestore = inject(Firestore);
  userID: any = '';
  user: User = new User;
  userData: any;
  

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.route.paramMap.subscribe(async paramMap => {
      this.userID = paramMap.get('id');
      console.log('the id is:', this.userID)
      this.getUser()
    })
  }


  async getUser() {
    const trimmedUserID = this.userID.trim();
    const docRef = doc(this.firestore, "Users", trimmedUserID);
    console.log(this.userID.toString())
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      this.userData = docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }


  editAddress(){
   const dialog = this.dialog.open(DialogEditAddressComponent)
   dialog.componentInstance.user = this.userData;
  }


  editUserDetail(){
     const dialog = this.dialog.open(DialogEditUserComponent)
     dialog.componentInstance.user = this.userData;
  }

}

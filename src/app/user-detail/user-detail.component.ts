import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, doc, getDoc, query, where, getDocs } from '@angular/fire/firestore';



@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  firestore: Firestore = inject(Firestore);
  userID: any = '';


  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(async paramMap => {
      this.userID = paramMap.get('id');
      console.log('the id is:',this.userID)
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
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");

   
  }
}

}

import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    var firebaseConfig = {
      apiKey: "AIzaSyBJVaDFB8cWPg7CECwqLOkDQ9J2CnOMHks",
      authDomain: "jta-insta-clone-5cd9f.firebaseapp.com",
      databaseURL: "https://jta-insta-clone-5cd9f-default-rtdb.firebaseio.com",
      projectId: "jta-insta-clone-5cd9f",
      storageBucket: "jta-insta-clone-5cd9f.appspot.com",
      messagingSenderId: "514413354242",
      appId: "1:514413354242:web:d883ce8e7136b1ad02f61b",
      measurementId: "G-45Y34NNM6E"
    };
   firebase.initializeApp(firebaseConfig)
  }
  title = 'app3';
}

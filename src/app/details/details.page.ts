import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    private data: DataService,
  ) { }

  item = new Item();
  prodId: String;
  backBtn = "Zurück";
  prods: Array<any>;
  userId: String;

  ngOnInit() {

    this.data.currentMessage.subscribe(prodId => this.prodId = prodId)
    if (this.prodId == "no id") {
      this.router.navigate(["/home"]);
    }
    this.firebaseService.getOrder(this.prodId)
      .then(
        res => {
          this.prods = res.payload.data().products;
          this.userId = res.payload.data().user;
        })

  }

}

class Item {
  public name: String;
  public price: number;
  public id: String;

  constructor() { }
};

class Extra {
  public name: String;
  public price: number;

  constructor() { }
};
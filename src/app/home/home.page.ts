import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  items: Array<any>;
  prodId: string;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    private data: DataService,
  ) {}

  ngOnInit() {
    this.firebaseService.getOrder()
      .then(result => {
        this.items = result;
      })
  }

  toDetailPage(item) {
    this.prodId = item.payload.doc.data().id;
    this.data.changeMessage(this.prodId);
    this.router.navigate(["/details"]);
  }


}


class Item {
  public products;
  public price;
}

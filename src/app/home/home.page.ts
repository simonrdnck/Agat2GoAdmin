import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  items: Array<any>;
  formattedItems: Array<formattedItem> = [];
  prodId: string;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    private data: DataService,
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.loadOrders()
  }

  loadOrders() {
    this.formattedItems = []
    this.firebaseService.getOrders()
      .then(result => {
        this.items = result;
        this.items.forEach(element => {
          if (element.payload.doc.data().closed != true) {
            var item = element.payload.doc.data()
            item.id = element.payload.doc.id
            var d = new Date(item.time);
            item.time = d.toLocaleString();
            this.formattedItems.push(item);
          }
        });
        this.formattedItems.sort((a, b) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0));
      })
  }

  toDetailPage(id) {
    this.prodId = id;
    this.data.changeMessage(this.prodId);
    this.router.navigate(["/details"]);
  }


}

class formattedItem {
  public products: Array<any>;
  public time: string;
  public user: string;
  public userId: string;
  public id: string;
  public closed: boolean;
}

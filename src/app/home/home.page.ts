import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  items: Array<any>;
  formattedItems: Array<formattedItem> = [];
  prodId: string;
  currentTime: string;
  loading: HTMLIonLoadingElement;
  

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    private data: DataService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.loadOrders()
  }


  compareTime(orderTime) {
 
    let diffyellow = 5;
    var d = new Date().toLocaleString("en-EN", {timeZone: "Europe/Berlin"});
    var date = new Date(d)
    var newDateyellow = new Date(orderTime.getTime() - diffyellow*60000);

    if(date >= newDateyellow && date < orderTime){
      return 2;
    }
    else if (date >= orderTime){
      return 3;
    }
    else{
      return 1;
    }
  }

  reloadPage(){
    this.showLoading();
    setTimeout(() => {
      this.hideLoading();
    }, 500);
    this.loadOrders();
    }
     
  
    async showLoading(): Promise<void> {
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
    }
  
    hideLoading(): Promise<boolean> {
      return this.loading.dismiss()
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
            item.tooLate = this.compareTime(d);
            item.time = d.toLocaleString();
            this.formattedItems.push(item);
          }
        });
        this.formattedItems.sort((a, b) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0));
      })
  }
}

class formattedItem {
  public products: Array<any>;
  public time: string;
  public user: string;
  public userId: string;
  public id: string;
  public closed: boolean;
  public tooLate = 1;
  public toGo: boolean;
}

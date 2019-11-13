import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { AlertController } from '@ionic/angular';

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
    public alertController: AlertController,
    private route: ActivatedRoute
  ) { }

  item = new Item();
  prodId: String;
  backBtn = "Zurück";
  prods: Array<any>;
  userId: String;
  userName: string;
  isClosed = false;
  toGo = true;

  ngOnInit() {
  };

  ionViewWillEnter(){
    this.prodId = this.route.snapshot.paramMap.get('id');
    this.firebaseService.getOrder(this.prodId)
      .then(
        res => {
          this.prods = res.payload.data().products;
          this.userName = res.payload.data().user;
          this.userId = res.payload.data().userId;
          this.isClosed = res.payload.data().closed;
          this.toGo = res.payload.data().toGo;
        })
  }

  async closeOrder() {

    const alert = await this.alertController.create({
      header: 'Bestätigen!',
      message: 'Wollen Sie die Bestellung wirklich abschließen?',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Abgebrochen');
          }
        }, {
          text: 'Weiter',
          handler: () => {
            console.log('Confirm Okay');
            this.firebaseService.closeOrder(this.prodId);
            this.prods.forEach(element => {
              this.firebaseService.addBonus(this.userId);
            });
            this.router.navigateByUrl('/home');
          }
        }
      ]
    });

    await alert.present();
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
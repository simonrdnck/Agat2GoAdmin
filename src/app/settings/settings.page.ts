import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    private data: DataService,
    public alertController: AlertController,
    private route: ActivatedRoute
  ) { }

  private notstop = false;

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.firebaseService.getNotstop()
      .then(
        res => {
          this.notstop = res.payload.data().notstop;
        })
  }
 
  async setNotstop() {

    const alert = await this.alertController.create({
      header: 'Bestätigen!',
      message: 'Wollen Sie die Pilotphase wirklich beenden?',
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
            this.firebaseService.setNotstop();
            this.router.navigateByUrl('/settings');
          }
        }
      ]
    });

    await alert.present();
  }

}

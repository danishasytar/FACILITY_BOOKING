import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { HomePage } from '../home/home';

import 'rxjs/add/operator/map';



@Component({
  selector: 'page-meeting-room',
  templateUrl: 'meeting-room.html'
})
export class MeetingRoomPage {

	time:string = 'AM';
	isAndroid:boolean = false;
  StartTime= "";
  meetingroom;

	@ViewChild(Slides) Slides: Slides;

  constructor(public navCtrl: NavController , private alertCtrl: AlertController, private storage: Storage, public http: HttpClient) {
  this.load();
  }


  myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}
   presentAlert() {
	  this.goToSlide();
    let alert = this.alertCtrl.create({

    title: 'Details Meeting Room',
    
    buttons: ['Dismiss']
      });

    alert.present();
  }

  goToSlide() {
    this.Slides.slideTo(3,500);
    }

  ionViewWillEnter(){
      this.load();
    }

  load(){
      this.http.get('http://unwilled-children.000webhostapp.com/api/meetingroom')
      .subscribe(data=> {
        console.log(data);
        this.meetingroom = data;
      }, error => {
        console.log(error);
      })
      
    }

  goToHome(params){
    if (!params) params = {};
    this.navCtrl.setRoot(HomePage);
  }

  addEntry(){
    this.navCtrl.push('MeetingRoomPage');
  }

  
}


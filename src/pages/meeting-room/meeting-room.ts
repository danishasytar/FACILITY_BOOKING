import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
      this.http.get('http://unwilled-children.000webhostapp.com/admin/api/meetingroom')
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

  book() {
    let book_detail = "Meeting Room booking, by MR ...."
    console.log("hha")
      let message = { 
        app_id: "b1cecf36-34a5-41e1-8727-d2ebfb477838",//app id at one signal
        contents: {"en": book_detail},
        included_segments: ["All"]
      };
      this.http.post('https://onesignal.com/api/v1/notifications', JSON.stringify(message), {headers: new HttpHeaders({"Content-Type":"application/json; charset=utf-8", 'Authorization': 'Basic ZGVjODMzODgtYjNkNS00M2YyLTk1MDctOGE0YTVhZjY4Mjc3'})})
        .subscribe(res => {
          console.log(res)
        }, (err) => {
          console.error(err)  
        }); 
  }

  
}


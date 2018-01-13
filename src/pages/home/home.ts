import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MeetingRoomPage } from '../meeting-room/meeting-room';
import { ShowerRoomPage } from '../shower-room/shower-room';
import { PrivateRoomPage } from '../private-room/private-room';
import { CloudPage } from '../cloud/cloud';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items: any = [];

  facility;

  constructor(public navCtrl: NavController , public http: HttpClient) {
    this.load();

  }
    goToMeetingRoom(params){
    if (!params) params = {};
    this.navCtrl.setRoot(MeetingRoomPage);
  }

    goToShowerRoom(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ShowerRoomPage);
  }

    goToPrivateRoom(params){
    if (!params) params = {};
    this.navCtrl.setRoot(PrivateRoomPage);
  }

    goToSpecialEvent(params){
      if (!params) params= {};
      this.navCtrl.setRoot(CloudPage);
    }

    ionViewWillEnter(){
      this.load();
    }

    load(){
      this.http.get('http://unwilled-children.000webhostapp.com/admin/api/facility')
      .subscribe(data=> {
        console.log(data);
        this.facility = data;
      }, error => {
        console.log(error);
      })
      
    }

    //allow navigation to the PrivateRoomPage component for creating a new entry
    addEntry(){
      this.navCtrl.push('PrivateRoomPage');
    }

    //allow navigation to the PrivateRoomPage component for amending an existing entry to the PrivateRoomPage
    viewEntry(param){
      this.navCtrl.push('PrivateRoomPage',param);
    }

}

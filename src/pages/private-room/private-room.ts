import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HomePage } from '../home/home';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-private-room',
  templateUrl: 'private-room.html'
})
export class PrivateRoomPage {
//Define FormBuilder /model properties
public form  :FormGroup;
public room_name:  any;
public passenger_name:  any;
public time_start:  any;
public time_end:  any;
public remarks:  any;

//flag to be used for checking whether we are adding/editing an entry
public isEdited               : boolean = false;
// Flag to hide the form upon successful completion of remote operation
public hideForm               : boolean = false;
// Property to help ste the page title
public pageTitle              : string;
// Property to store the recordID for when an existing entry is being edited
public recordID               : any      = null;
private baseURL               : string = "http://subtropical-chance.000webhostapp.com/";

time:string = 'AM';
isAndroid: boolean = false;
privateroom;
        api_url = "https://sheetsu.com/apis/v1.0su/0060c6d90fe9";
      currentID=1;

@ViewChild(Slides) Slides: Slides;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public platform: Platform, public http: HttpClient, public NP: NavParams, public fb: FormBuilder, public toastCtrl: ToastController) {
  this.load();
  // Create form builder validation rules
      this.form = fb.group({
         "room_name"                  : ["", Validators.required],
         "passenger_name"             : ["", Validators.required],
         "time_start"                 : ["", Validators.required],
         "time_end"                   : ["", Validators.required],
         "premarks"                   : ["", Validators.required]
          });
  }
  myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}
presentAlert() {
	this.goToSlide();
  let alert = this.alertCtrl.create({

    title: 'Details Shower Room',
    
    buttons: ['Dismiss']
  });

  alert.present();
}


  goToSlide() {
    this.Slides.slideTo(3,500);
  }
// Determine whether we adding or editing a record
// based on any supplied navigation parameters
  ionViewWillEnter(){


      if(this.NP.get("record"))
      {
         this.isEdited      = true;
         this.selectEntry(this.NP.get("record"));
         this.pageTitle     = 'Amend entry';
      }
      else
      {
         this.isEdited      = false;
         this.pageTitle     = 'Create entry';
      }
    }

    // Assign the navigation retrieved data to properties
   // used as models on the page's HTML form
   selectEntry(item)
   {
      this.room_name        = item.room_name;
      this.passenger_name   = item.passenger_name;
      this.time_start       = item.time_start;
      this.time_end         = item.time_end;
      this.remarks          = item.remarks;
      this.recordID         = item.id;
   }
   // createEntry(name, description)
   // {
   //    let body     : string   = "key=create&room_name=" + this.room_name + "&description=" + this.passenger_name,
   //        type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
   //        headers  : any      = new Headers({ 'Content-Type': type}),
   //        options  : any      = new RequestOptions({ headers: headers }),
   //        url      : any      = this.baseURL + "manage-data.php";

   //    this.http.post(url, body, options)
   //    .subscribe((data) =>
   //    {
   //       // If the request was successful notify the user
   //       if(data.status === 200)
   //       {
   //          this.hideForm   = true;
   //          this.sendNotification(`Congratulations the technology: ${name} was successfully added`);
   //       }
   //       // Otherwise let 'em know anyway
   //       else
   //       {
   //          this.sendNotification('Something went wrong!');
   //       }
   //    });
   // }


    load(){
      this.http.get('https://sheetsu.com/apis/v1.0su/0060c6d90fe9')
      .subscribe(data=> {
        console.log(data);
        this.privateroom = data;
      }, error => {
        console.log(error);
      })
     }

      addData(data){


      var room_name;
      var passenger_name;
      var time_start;
      var time_end;
      var remarks;

  this.http.post('https://sheetsu.com/apis/v1.0su/0060c6d90fe9', JSON.stringify(data))
  .subscribe(res => {
    console.log(res);
  }, (err) => {
    console.log(err);
  });

     }

    goToHome(params){
    if (!params) params = {};
    this.navCtrl.setRoot(HomePage);
  }

  displayRoom(){

  }

  addEntry(){
    this.navCtrl.push('PrivateRoomPage');
  }

  book() {
    let book_detail = "Private Room booking, by MR ...."
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


// addEntry(){
//   console.log("addd")
//   let headers = new Headers();
//   headers.append('Content-Type', 'application/json');

// var data = {
//   "room_name": "string",
//   "passenger_name": "string",
//   "time_start": "string",
//   "time_end": "string",
//   "remarks": "string"
// };
//   //parameter tak betul

}
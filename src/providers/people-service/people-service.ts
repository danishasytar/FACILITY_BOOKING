import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

/*
  Generated class for the PeopleServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PeopleServiceProvider {

	apiURL= 'http://unwilled-children.000webhostapp.com/api/privateroom/add';
  
  constructor(public http: HttpClient) {
    console.log('Hello PeopleServiceProvider Provider');
  }

  get(){
  	return new Promise(resolve => {
  		this.http.get(this.apiURL+'/privateroom').subscribe(data => {
  			resolve(data);
  		},err =>{
  			console.log(err);
  		});
  	});
  }

  // add(data){
  // 	return new Promise((resolve,reject) =>{
  // 		this.http.post(this.apiURL+'privateroom', JSON.stringify(data), {
  // 			headers: new HttpHeaders().set('Authorization', 'my-auth-token'),
  // 			params: new HttpParams().set('id','1'),
  // 		})
  // 		.subscribe(res => {
  // 			resolve(res);
  // 		}, (err) => {
  // 			reject(err);
  // 		});
  // 	});
  // }
}

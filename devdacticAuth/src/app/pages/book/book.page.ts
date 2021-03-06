import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router'
import { Observable, of } from 'rxjs';
import { NavController } from '@ionic/angular';
import { Http, Headers } from '@angular/http';
import { RestApiService } from '../../services/rest-api.service';


@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {
 
  classSlots: any;
  rooms;
  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };
  name: string;
 
  constructor(public api: RestApiService, public loadingController: LoadingController, private router : Router, public navCtrl: NavController) {

   
  }
 
  ngOnInit() {
    this.getClassSlots();
  }
  async getClassSlots() {
  
  await this.api.getClassSlots()
    .subscribe(res => {
      // console.log(res);
      this.classSlots = res;
      console.log(this.classSlots);
     
    }, err => {
      console.log(err);
      
    });
  }
  pushPage(){
    this.navCtrl.navigateForward(`/submit/${this.classSlots.name}`);
  }

  submit(){
    this.router.navigate(['submit']);
    }
}


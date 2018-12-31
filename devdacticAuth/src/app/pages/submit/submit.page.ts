import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../../services/rest-api.service';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.page.html',
  styleUrls: ['./submit.page.scss'],
})
export class SubmitPage implements OnInit {

 	startT;
 	endT;
 	classSlots: any;
 	rooms;
 	passName = null;

 	constructor( public api: RestApiService, private activatedRoute : ActivatedRoute){
		this.startT = new Date().toISOString();
		this.endT  = new Date().toISOString();
  	}

  ngOnInit() {
  	 this.getClassSlots();
  	 this.passName = this.activatedRoute.snapshot.paramMap.get('name');
  }
  async getClassSlots() {
  
  await this.api.getClassSlots()
    .subscribe(res => {
      this.classSlots = res;
     
    }, err => {
      console.log(err);
      
    });
  }


  SubmitSlot(){

  }

}

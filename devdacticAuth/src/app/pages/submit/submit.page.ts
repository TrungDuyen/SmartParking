import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../../services/rest-api.service';
import { AuthService } from './../../services/auth.service';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { NavController, NavParams, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.page.html',
  styleUrls: ['./submit.page.scss'],
})
export class SubmitPage implements OnInit {

 	startT;
 	endT;
 	username;
 	slotName;
 	slotForm: FormGroup;
 	passName = null;
 	carNumber;

 	constructor(public authService: AuthService, public api: RestApiService, private activatedRoute : ActivatedRoute, private formBuilder: FormBuilder, public alertController: AlertController){
		
		this.authService.getSpecialData().subscribe(res => {
     	this.username = res['msg'];
     	this.startT = new Date().toISOString();
		this.endT  = new Date().toISOString();
		this.carNumber = [null];
  		this.slotForm = this.formBuilder.group({
  			'username': this.username,
  			'carNumber': this.carNumber,
			'slotName': this.activatedRoute.snapshot.paramMap.get('name'),
			'startT' : this.startT,
			'endT': this.endT,
  		})
    });
  	}

  ngOnInit() {
  	 this.passName = this.activatedRoute.snapshot.paramMap.get('name');
  	 
  }

  async submitSlot(){
  await this.api.postClassSlots(this.slotForm.value)
  .subscribe(res => {
      let id = res['id'];
    }, (err) => {
      console.log(err);
    });
  const alert = await this.alertController.create({
      header: 'Success',
      message: 'Book success.',
      buttons: ['OK']
    });

    await alert.present();
	}
}

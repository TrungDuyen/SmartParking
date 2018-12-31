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
 	slotName;
 	slotForm: FormGroup;
 	passName = null;

 	constructor( public api: RestApiService, private activatedRoute : ActivatedRoute, private formBuilder: FormBuilder){
		this.startT = new Date().toISOString();
		this.endT  = new Date().toISOString();
		this.slotForm = this.formBuilder.group({
			'carNumber': [null, Validators.required],
			'slotName': this.activatedRoute.snapshot.paramMap.get('name'),
			'startT' : this.startT,
			'endT': this.endT
		})
  	}

  ngOnInit() {
  	 this.passName = this.activatedRoute.snapshot.paramMap.get('name');
  }

  // submitSlot(){
  // 	console.log(this.slotForm);

  // }
  async submitSlot(){
  await this.api.postClassSlots(this.slotForm.value)
  .subscribe(res => {
      let id = res['id'];
      // this.router.navigate(['/detail/'+id]);
    }, (err) => {
      console.log(err);
    });
}
}

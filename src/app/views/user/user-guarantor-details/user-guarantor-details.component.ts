import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import Swal from 'sweetalert2'

import { Router, ActivatedRoute } from '@angular/router';

import { DomSanitizer } from '@angular/platform-browser';

import { HttpClient, HttpEventType } from '@angular/common/http';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../../../user.service';
// import { NgForm } from '@angular/forms';
// import { ErrorStateMatcher } from '@angular/material/core';
import { DAMService } from '../../../dam.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({

  selector: 'app-user-guarantor-details',

  templateUrl: './user-guarantor-details.component.html',

  styleUrls: ['./user-guarantor-details.component.scss']

})

export class UserGuarantorDetailsComponent implements OnInit {

  toolTip:string ="Please provide the below information to complete the application form"
  gurantorForm: FormGroup
  gurantor_statuss: string = 'fail';
  gurantor_status = false;
  submitted = false
  api1: any
  states: any;
  cities: {};
  app_form_data: string
  continue: boolean = false
  userName: String
  _id: any
  application_id: any
  gurantor_phoneCode: any
  data: string;
  language: any;
  ft_sm: any;
  ft_md: any;
  bg_color: any;
  setTxt: any;
  continue_: any;
  lan: any;
  message: any;
  bg: any;
  diff: any;

  constructor(private formBuilder: FormBuilder, private ngxService: NgxUiLoaderService,
    private userservice: UserService, private dService: DAMService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    var response;
    this.dService.getform1().subscribe(data => {
      response = JSON.parse(JSON.stringify(data))
      console.log("appli", response)
    });


    this._id = sessionStorage.getItem('_id');
    this.application_id = sessionStorage.getItem('application_no');
    this.userservice.apiscountry().subscribe(data => {
      this.api1 = data
      console.log("data of some country coc", this.api1)
    })

    // var test = this.route.snapshot.queryParamMap.get('obj');
    // this.data = this.route.snapshot.queryParamMap.get('obja');
    // console.log("test", test);

    this.gurantorForm = this.formBuilder.group({
      guarantor_name: ['', Validators.required],
      guarantor_country: ['', Validators.required],
      guarantor_state: ['', Validators.required],
      guarantor_city: ['', Validators.required],
      guarantor_house_no: ['', Validators.required],
      guarantor_street_no: ['', Validators.required],
      guarantor_phonecode: ['', Validators.required],
      guarantor_contact: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
      guarantor_pincode: ['', Validators.required],
      guarantor_status: [''],
      application_no: this.application_id
    }), this.gurantorForm.controls['guarantor_status'].setValue(true);
    this.showData()
  }

  showData() {

    this.userservice.getGuarantorInfo({ 'application_no': this.application_id })
      .subscribe(data => {
        let status = null
        try{ status = data['message']['status']} catch(e){}
  
        console.log('status', status);
        if (this.userservice.home(status)) {

        console.log("data", data);
        try {
          let guarantor_contact = data['guarantor_contact'].split('-')
          this.gurantorForm.get('guarantor_house_no').setValue(data['guarantor_house_no']);
          this.gurantorForm.get('guarantor_name').setValue(data['guarantor_name']);
          this.gurantorForm.get('guarantor_street_no').setValue(data['guarantor_street_no']);
          this.gurantorForm.get('guarantor_contact').setValue(guarantor_contact[1]);
          this.gurantorForm.get('guarantor_phonecode').setValue(guarantor_contact[0]);
          this.gurantor_phoneCode = guarantor_contact[0]
          this.gurantorForm.get('guarantor_pincode').setValue(data['guarantor_pincode']);
          this.gurantorForm.get('guarantor_country').setValue(data['guarantor_country']);
          this.states = [{ name: data['guarantor_state'] }]
          this.gurantorForm.get('guarantor_state').setValue(data['guarantor_state']);
          this.cities = [{ name: data['guarantor_city'] }]
          this.gurantorForm.get('guarantor_city').setValue(data['guarantor_city']);
        }
        catch (error) { }
      }
      })
  }

  onChangeCountry() {

    let present_country_id = ""
    let present_country_name = this.gurantorForm.value.guarantor_country
    console.log(present_country_name);

    this.api1.map((obj) => {
      if (obj.name == present_country_name) {
        present_country_id = obj.id
        this.gurantor_phoneCode = obj.phonecode
      }
    })

    console.log("present_country_name", present_country_name, 'present_country_id', present_country_id);
    this.userservice.apistate(present_country_id, present_country_name).subscribe(
      data => {
        let status = null
        try{ status = data['message']['status']} catch(e){}
  
        console.log('status', status);
        if (this.userservice.home(status)) {

        console.log("country state", data)
        this.states = data
        }
      })



    // console.log('cntyid', country_id);
    // if (country_id) {
    //   this.userservice.apistate(country_id, "").subscribe(data => {
    //     this.states = data;
    //     console.log("statse", this.states)
    //     this.cities = null;
    //   }
    //   );
    // } else {
    //   this.states = null;
    //   this.cities = null;
    // }
  }

  onChangeState(state) {
    console.log("state", state);

    let present_state_id = ""
    let present_state_name = state

    this.states.map((obj) => {
      if (obj.name == present_state_name) {
        present_state_id = obj.id
      }
    })
    console.log("present_state_name", present_state_name, 'present_state_id', present_state_id);
    this.userservice.apicity(present_state_id).subscribe(
      data => {

        let status = null
        try{ status = data['message']['status']} catch(e){}
  
        console.log('status', status);
        if (this.userservice.home(status)) {
        console.log("city", data)
        this.cities = data
        }
      })

  }

  get f() { return this.gurantorForm.controls; }

  reset() {
    this.gurantorForm.get('guarantor_house_no').setValue("");
    this.gurantorForm.get('guarantor_name').setValue("");
    this.gurantorForm.get('guarantor_street_no').setValue("");
    this.gurantorForm.get('guarantor_contact').setValue("");
    this.gurantorForm.get('guarantor_phonecode').setValue("");
    this.gurantor_phoneCode = ""
    this.gurantorForm.get('guarantor_pincode').setValue("");
    this.gurantorForm.get('guarantor_country').setValue("");
    this.states = [{ name: "" }]
    this.gurantorForm.get('guarantor_state').setValue("");
    this.cities = [{ name: "" }]
    this.gurantorForm.get('guarantor_city').setValue("");
  }

  back() {
    this.router.navigate(['user-contact-details']);
  }

  onSubmit() {

    this.submitted = true
    var data;
    var verifyObject;
    if (this.gurantorForm.invalid) {
      return
    }

    this.ngxService.start();

    let sendData = {
      application_no: this.gurantorForm.value['application_no'],
      guarantor_city: this.gurantorForm.value['guarantor_city'],
      guarantor_contact: this.gurantorForm.value['guarantor_phonecode'] + '-' + this.gurantorForm.value['guarantor_contact'],
      guarantor_country: this.gurantorForm.value['guarantor_country'],
      guarantor_house_no: this.gurantorForm.value['guarantor_house_no'],
      guarantor_name: this.gurantorForm.value['guarantor_name'],
      guarantor_phonecode: this.gurantorForm.value['guarantor_phonecode'],
      guarantor_pincode: this.gurantorForm.value['guarantor_pincode'],
      guarantor_state: this.gurantorForm.value['guarantor_state'],
      guarantor_status: this.gurantorForm.value['guarantor_status'],
      guarantor_street_no: this.gurantorForm.value['guarantor_street_no'],
    }

    console.log('sendData', sendData);
    this.userservice.gurantor(sendData).subscribe(data => {

      let status = null
      try{ status = data['message']['status']} catch(e){}

      console.log('status', status);
      if (this.userservice.home(status)) {

      var response = JSON.parse(JSON.stringify(data)).message;
      console.log("data", data)

      if (response === "Fail from validation" || response === "Please, verify guarantor first.") {
        this.ngxService.stop();
        Swal.fire('', response)
      }
      else {
        sessionStorage.setItem('foure', 'done');
        this.ngxService.stop();
        this.router.navigate(['user-current-designation']);
      }
    }
    })
  }

  pincode_no() {
    let getdata = this.gurantorForm.value.guarantor_pincode;
    (getdata == undefined) ? (getdata = "") :
      (getdata.length > 10) ? (this.gurantorForm.get('guarantor_pincode').setValue(getdata.substring(0, 10))) :
        this.gurantorForm.get('guarantor_pincode').setValue(getdata.replace(/\D/g, ""));
  }

  cancel(){
    this.router.navigate(['../user-dashboard'])
  }

  contactdetail() {
    this.router.navigate(['user-contact-details']);
  }

  guarantor_number() {
    let getdata = this.gurantorForm.value.guarantor_contact;
    (getdata == undefined) ? (getdata = "") :
      (getdata.length > 10) ? (this.gurantorForm.get('guarantor_contact').setValue(getdata.substring(0, 10))) :
        this.gurantorForm.get('guarantor_contact').setValue(getdata.replace(/\D/g, ""));
  }

  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();

    }
  }

  onverify() {
    var verifyObject;
    this.submitted = true
    var data;
    if (this.gurantorForm.invalid) {
      return
    }
    // this.gurantorForm.value['guarantor_contact'] = (this.gurantorForm.value['guarantor_phonecode'] + '-' + this.gurantorForm.value['guarantor_contact'])
   
      let sendData = {
        application_no: this.gurantorForm.value['application_no'],
        guarantor_city: this.gurantorForm.value['guarantor_city'],
        guarantor_contact: this.gurantorForm.value['guarantor_phonecode'] + '-' + this.gurantorForm.value['guarantor_contact'],
        guarantor_country: this.gurantorForm.value['guarantor_country'],
        guarantor_house_no: this.gurantorForm.value['guarantor_house_no'],
        guarantor_name: this.gurantorForm.value['guarantor_name'],
        guarantor_phonecode: this.gurantorForm.value['guarantor_phonecode'],
        guarantor_pincode: this.gurantorForm.value['guarantor_pincode'],
        guarantor_state: this.gurantorForm.value['guarantor_state'],
        guarantor_status: this.gurantorForm.value['guarantor_status'],
        guarantor_street_no: this.gurantorForm.value['guarantor_street_no'],
      }

      console.log('sendData', sendData);
    this.userservice.verifygurantor(sendData).subscribe(data => {
      let status = null
      try{ status = data['message']['status']} catch(e){}
      console.log('status', status);
      if (this.userservice.home(status)) {
      console.log("onverify", data)
      let gurantor_statuss = data['message']
      if (gurantor_statuss == 'success') {

        this.onSubmit()

      }
      else {
        Swal.fire('', 'Gurantor is already registered!')
      }

    }
    })
  }

  ngDoCheck(){
    this.font(this.message)
    this.backGround(this.bg)
    this.setLanguage(this.language)
 }

 font(session){
    let font = this.userservice.fontSet(session)
    // console.log('font', font)
    this.ft_sm = font.ft_sm
    this.ft_md = font.ft_md
   }
 
   backGround(bg){
    let bg_color = this.userservice.backGround(bg)
    this.bg_color = bg_color['bg_color']
    this.setTxt = bg_color['setTxt']
    this.continue_ = bg_color['continue']
    this.diff = bg_color['diff']
  }

  setLanguage(language){
    this.lan = this.userservice.setLanguage(language)
  }

}
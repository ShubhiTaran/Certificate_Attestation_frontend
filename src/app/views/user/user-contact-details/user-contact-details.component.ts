import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { DAMService } from '../../../dam.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-user-contact-details',
  templateUrl: './user-contact-details.component.html',
  styleUrls: ['./user-contact-details.component.scss']
})
export class UserContactDetailsComponent implements OnInit {

  toolTip:string ="Please provide the below information to complete the application form"
  message: any;
  bg: any;
  language: any;
  ft_sm: any;
  ft_md: any;
  bg_color: any;
  lan: any;
setTxt: any;
  continue: any;
  model: any = {};
  submitted: false;
  userName: string;
  _id: string;
  application_id: string;
  present_countryList: any
  present_stateList: any
  present_cityList: any
  present_country_code: any
  permanent_cityList: any
  permanent_stateList: any
  permanent_countryList: any
  permanent_country_code: any

  // form: any;
  isChecked: boolean = false
  diff: any;

  constructor(private formBuilder: FormBuilder, private userservice: UserService,
    private ngxService: NgxUiLoaderService,
    private router: Router, private route: ActivatedRoute) { }



  ngOnInit() {
    this.parms()
    this.getCountry()
    this.showData()

  }

  parms() {
    localStorage.setItem('lastPage', '3')
    this._id = sessionStorage.getItem('_id')
    this.application_id = sessionStorage.getItem('application_no');
  }

  showData() {
    this.userservice.getContactInfo({ 'application_no': this.application_id })
      .subscribe(data => {
        let status = null
        try{ status = data['message']['status']} catch(e){}
  
        console.log('status', status);
        if (this.userservice.home(status)) {

        console.log('getContactInfo', data);
        this.model.permanent_house_no = data['permanent_house_no']
        this.model.present_house_no = data['present_house_no']
        this.model.permanent_street_no = data['permanent_street_no']
        this.model.present_street_no = data['present_street_no']
        this.model.permanent_pincode = data['permanent_pincode']
        this.model.present_pincode = data['present_pincode']
        if(data['permanent_mobile']){
        let permanent_mobile = data['permanent_mobile'].split("-")
        this.model.permanent_mobile = permanent_mobile[1]
        this.model.permanent_phonecode = permanent_mobile[0]
        let present_mobile = data['present_mobile'].split("-")
        this.model.present_mobile = present_mobile[1]
        }
        this.model.present_phonecode = 91 //present_mobile[0]
        this.model.permanent_email_id = data['permanent_email_id']
        this.model.present_email_id = data['present_email_id']
        this.model.permanent_country = data['permanent_country']
        this.model.present_country = data['present_country']

        this.permanent_stateList = [{ "name": data['permanent_state'] }]
        this.present_stateList = [{ "name": data['present_state'] }]
        this.present_cityList = [{ "name": data['present_city'] }]
        this.permanent_cityList = [{ "name": data['permanent_city'] }]

        this.model.permanent_state = data['permanent_state']
        this.model.present_state = data['present_state']
        this.model.permanent_city = data['permanent_city']
        this.model.present_city = data['present_city']
        console.log("ngOninit")
      }
      })
  }

  getCountry() {
    this.userservice.apiscountry().subscribe(data => {
      let status = null
      try{ status = data['message']['status']} catch(e){}

      console.log('status', status);
      if (this.userservice.home(status)) {
      console.log("apiscountry", data);
      this.present_countryList = this.permanent_countryList = data
      }
    })
  }

  cancel(){
    this.router.navigate(['../user-dashboard'])
  }

  onSubmit() {
    this.ngxService.start();
    this.model['application_no'] = this.application_id
    this.model["permanent_mobile"] = this.model["permanent_phonecode"] + "-" + this.model["permanent_mobile"]
    this.model["present_mobile"] = this.model["present_phonecode"] + "-" + this.model["present_mobile"]

    console.log("sendData", this.model);

    this.userservice.contactdetails(this.model).subscribe(data => {
      let status = null
      try{ status = data['message']['status']} catch(e){}

      console.log('status', status);
      if (this.userservice.home(status)) {
      console.log('onSubmit', data)
      this.ngxService.stop();
      let applicant_type = localStorage.getItem('applicant_type')
      let navigateTo = "user-current-designation"
      if(applicant_type == "behalf"){
         navigateTo = "user-guarantor-details"
      }
      else{
        navigateTo = "user-current-designation";
        sessionStorage.setItem('foure', 'done');
      }
      sessionStorage.setItem('three', 'done');
      this.router.navigate([navigateTo]);
    }
    })
  }

  reset() {
    this.model = {}
  }

  back() {
    this.router.navigate(['user-passport-details']);
  }

  present_contactNo_no() {
    let getdata = this.model.present_mobile;
    (getdata == undefined) ? (getdata = "") :
      (getdata.length > 10) ? (this.model.present_mobile = getdata.substring(0, 10)) :
        this.model.present_mobile = getdata.replace(/\D/g, "");
  }

  permanent_contactNo_no() {
    let getdata = this.model.permanent_mobile;
    (getdata == undefined) ? (getdata = "") :
      (getdata.length > 10) ? (this.model.present_mobile = getdata.substring(0, 10)) :
        this.model.permanent_mobile = getdata.replace(/\D/g, "");
  }

  PresentOnChangeCity() {

  }

  permanent_pincode_() {
    let getdata = this.model.permanent_pincode;
    (getdata == undefined) ? (getdata = "") :
      (getdata.length > 10) ? (this.model.permanent_pincode = getdata.substring(0, 10)) :
        this.model.permanent_pincode = getdata.replace(/\D/g, "");
  }

  present_pincode_() {
    let getdata = this.model.present_pincode;
    (getdata == undefined) ? (getdata = "") :
      (getdata.length > 10) ? (this.model.present_pincode = getdata.substring(0, 10)) :
        this.model.present_pincode = getdata.replace(/\D/g, "");
  }

  PresentOnChangeState() {

    let present_state_id = ""
    let present_state_name = this.model.present_state

    this.present_stateList.map((obj) => {
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
        this.present_cityList = data
        }
      })

  }

  PresentOnChangeCountry() {

    let present_country_id = ""
    let present_country_name = this.model.present_country

    this.present_countryList.map((obj) => {
      if (obj.name == present_country_name) {
        present_country_id = obj.id
        this.present_country_code = obj.phonecode
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
        this.present_stateList = data
        }
      })
  }

  PermanentOnChangeCountry() {

    let permanent_country_id = ""
    let permanent_country_name = this.model.permanent_country

    this.permanent_countryList.map((obj) => {
      if (obj.name == permanent_country_name) {
        permanent_country_id = obj.id
        this.permanent_country_code = obj.phonecode
      }
    })

    console.log("permanent_country_name", permanent_country_name, 'permanent_country_id', permanent_country_id);
    this.userservice.apistate(permanent_country_id, permanent_country_name).subscribe(
      data => {
        let status = null
        try{ status = data['message']['status']} catch(e){}
  
        console.log('status', status);
        if (this.userservice.home(status)) {
        console.log("country state", data)
        this.permanent_stateList = data
        }
      })
  }

  PermanentOnChangeState() {
    let pernament_state_id = ""
    let permanent_state_name = this.model.permanent_state

    this.permanent_stateList.map((obj) => {
      if (obj.name == permanent_state_name) {
        pernament_state_id = obj.id
      }
    })
    console.log("permanent_state_name", permanent_state_name, 'pernament_state_id', pernament_state_id);
    this.userservice.apicity(pernament_state_id).subscribe(
      data => {
        let status = null
        try{ status = data['message']['status']} catch(e){}
  
        console.log('status', status);
        if (this.userservice.home(status)) {
        console.log("city", data)
        this.permanent_cityList = data
        }
      })
  }

  PermanentOnChangeCity() {

  }

  contactDetail() {
    // this.submitted = true
    // console.log("this.f====>", this.f);
    // console.log("policy======>", this.contactForm.value);
    // if (this.contactForm.invalid) {
    //   return
    // }

    // this.userservice.contactdetails(this.contactForm.value).subscribe(data => {

    //   var response = JSON.parse(JSON.stringify(data)).message;
    //   console.log("response of application form", response)
    //   localStorage.setItem(this.app_form_data, response);

    //   var response1 = localStorage.getItem(this.app_form_data)

    //   if (response === "fail") {
    //     alert(response)
    //   }
    //   else {
    //     Swal.fire('', 'Successfully Updated.')
    //     this.router.navigate(['user-guarantor-details'], 
    //     { queryParams: { "obj": response, "obja": this._id, si: true, "userName": this.userName } })
    //   }
    // })

  }


  chkBoxChange(values: any) {
    this.isChecked = values.currentTarget.checked
    console.log(this.isChecked);
    if(!this.isChecked){
      this.permanent_cityList = []
      this.permanent_stateList = []
      this.model.permanent_house_no = ""
      this.model.permanent_street_no = ""
      this.model.permanent_pincode = ""
      this.model.permanent_mobile = ""
      this.model.permanent_email_id = ""
      this.model.permanent_country = ""
      this.model.permanent_phonecode = ""
    }
  }

  ngDoCheck() {
    // console.log("ngDochenck")
    this.font(this.message)
    this.backGround(this.bg)
    this.setLanguage(this.language)
    if (this.isChecked) {
      // console.log("checkbox true");
      this.model.permanent_house_no = this.model.present_house_no
      this.model.permanent_street_no = this.model.present_street_no
      this.model.permanent_pincode = this.model.present_pincode
      this.model.permanent_mobile = this.model.present_mobile
      this.model.permanent_email_id = this.model.present_email_id
      this.model.permanent_country = this.model.present_country
      this.model.permanent_phonecode = this.model.present_phonecode
      //  this.permanent_country_code = this.present_country_code
      this.permanent_stateList = [{ "name": this.model.present_state }]
      this.model.permanent_state = this.model.present_state
      this.permanent_cityList = [{ "name": this.model.present_city }]
      this.model.permanent_city = this.model.present_city
    }
    else{
      
      // this.model.permanent_city = ""
      // this.permanent_cityList = []
      // this.permanent_stateList = []
      // this.model.permanent_state = ""
      console.log("insdie else")
    }
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
    this.continue = bg_color['continue']
    this.diff = bg_color['diff']
  }

  setLanguage(language){
    this.lan = this.userservice.setLanguage(language)
  }

}
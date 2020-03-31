import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../../user.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'
import { NgxUiLoaderService } from 'ngx-ui-loader';
// import { stat } from 'fs';

@Component({
  selector: 'app-register-here',
  templateUrl: './register-here.component.html',
  styleUrls: ['./register-here.component.scss'],
})


export class RegisterHereComponent implements OnInit {
  @Input() public pgName;

  bg: any;
  language: any;
  ft_sm: any;
  ft_md: any;
  bg_color: any;
  setTxt: any;
  continue: any;
  lan: any;

  cssUrl: string;
  ageStatus: boolean = false
  showSucessMessage: boolean;
  serverErrorMessages: string;
  header: String = "REGISTER YOUR ACCOUNT"
  passwordStrenth:boolean = true;
  req_id: string;
  passwordMatch: boolean = true
  otpResponse: string;
  email_choice = true;
  contact_status = false;
  verifyStatus: string = 'success';
  resetForm: FormGroup
  submitted = false;
  marked = true;
  marked1: any
  marked2 = true
  userdetail: any = [];
  api: any = []
  api1: any = []
  splitted: {}
  control: FormControl;
  universitys: any;
  message: any;
  ft_xl: any;
  diff: any;
  others: boolean = false;
  constructor(public router: Router, public userservice: UserService, public sanitizer: DomSanitizer,
    private ngxService: NgxUiLoaderService,
     public formbuilder: FormBuilder, private route: ActivatedRoute) { }
 
  ngOnInit() {

    this.changeStyle()
    $(document).ready(function () {
      $('#comment_form').submit(function () {
        $(this).ajaxSubmit({
          error: function (xhr) {
            alert("");
          },
          success: function (response) {
            console.log(response);
          }
        });
        return false;
      });
    });

    this.university()

    this.resetForm = this.formbuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      middle_name: [''],
      nationality: ['', Validators.required],
      contact: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email_id: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      password: ['', [Validators.required]],
      dob: ['', Validators.required],
      // email_choice: ['', Validators.required],
      contact_status: [''],
      confirm_password: ['', Validators.required],
      university: ["", Validators.required],
      others:[""]
    }
      , { validator: this.checkIfMatchingPasswords('password', 'confirm_password') },


    );

    // this.resetForm.controls['email_choice'].setValue(this.email_choice);
    // this.resetForm.controls['contact_status'].setValue(this.verifyStatus === 'success' ? true : false);
    this.userservice.apiscountry().subscribe(data => {

      this.api = data

      console.log("data of some country coc", this.api)
    })

  }

  changeStyle(){
    const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
 
    const n = randomIntegerInRange(1, 100) % 2;
    this.cssUrl = n % 2 === 0 ? '../src/scss/theam1.scss' : '../src/scss/theam1.scss';

  }

  ageChk(date) {
    console.log("date", date)
    let day = new Date(date).getDate()
    let month = new Date(date).getMonth()
    let year = new Date(date).getFullYear()
    this.ageStatus = new Date(year + 18, month - 1, day) <= new Date();
    console.log("ageStatus", this.ageStatus)
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true })
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  get f() { return this.resetForm.controls }

  startpage() {
    this.submitted = true

    this.ageChk(this.resetForm.value.dob)

    if(!this.ageStatus){
      return
    }

    if (this.resetForm.invalid) {
      console.log('resetForm', this.resetForm.value, "valid", this.resetForm.invalid)
      return
    }

    this.resetForm.value['email_choice'] = true
    if(this.others){
      this.resetForm.value['university'] = this.resetForm.value['others']
    }

    this.ngxService.start();
    this.userservice.registration(this.resetForm.value).subscribe(res => {
      console.log("datatatt", JSON.stringify(this.resetForm.value))
      console.log("response-------", res)
      var response = JSON.parse(JSON.stringify(res)).message;
      console.log("response---", JSON.parse(JSON.stringify(response)));
      this.ngxService.stop();
      if (response === "Your contact or email id is already registered with us." || response === "Please, verify your contact first") {
        let message = null
        if(response == "Your contact or email id is already registered with us."){
          message = this.lan.your_contact_or_email_id_is_already_registered_with_us
        }
        else if(response == "Please, verify your contact first"){
          message = this.lan.please_verify_your_contact_first
        }
        Swal.fire('', message)
      }
      else {
        let message = this.lan.successfully_registered
        Swal.fire('', message)
        this.router.navigate(['email-otp'])
      }
    })
  }


  confirm_password() {
    let password = this.resetForm.value.password
    let confirm_password = this.resetForm.value.confirm_password

    if (password != confirm_password) {
      this.passwordMatch = false
    }
    else {
      this.passwordMatch = true
    }
  }

  phone_number() {
    let getdata = this.resetForm.value.contact;
    (getdata == undefined) ? (getdata = "") :
      (getdata.length > 10) ? (this.resetForm.get('contact').setValue(getdata.substring(0, 10))) :
        this.resetForm.get('contact').setValue(getdata.replace(/\D/g, ""));
  }

  password_chk() {

    

    // let str = this.resetForm.value.password;
    // console.log("str", str);
    
    // let string = str.split('');
    // let caps = false;
    // let small = false;
    // let number = false;
    // let spl = false;
    // let amp = false;

    // let status = false

    // string.map((val) => {
    
    //   let ascii = val.charCodeAt(0);
   
    //   if (ascii >= 97 && ascii <= 122) {
    //     caps = true
    //   }
    //   if (ascii >= 65 && ascii <= 90) {
    //     small = true
    //   }

    //   if (ascii >= 48 && ascii <= 57) {
    //     number = true
    //   }

    //   var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    //   if (format.test(str)) {
    //     spl = true
    //   }

    //   if(val == '&'){
    //   //   console.log('amp sybol is there');
    //     amp = true;
    //   }

    //   if (caps && small && number && spl && amp) {
    //     status = true
    //   }

    // })

    // this.passwordStrenth = status

  }

  university() {
    this.userservice.university().subscribe(data => {
      console.log("university", data);
      this.universitys = data['message']
      // this.universitys.push("Others")

    })
  }

  universityChange(univ){
    this.others = false
    if(univ == "Other"){
      this.others = true
    }
  }


  
  processVal(res) {
    console.log("response----", res);

  }
  

  db() {
    this.router.navigate(['dashboard'])
  }
  resetform() {
    this.resetForm.value.first_name = "",
      this.resetForm.value.last_name = "",
      this.resetForm.value.middle_name = "",
      this.resetForm.value.nationality = "",
      this.resetForm.value.contact = "",
      this.resetForm.value.email_id = "",
      this.resetForm.value.gender = "",
      this.resetForm.value.password = "",
      this.resetForm.value.dob = ""

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
    this.ft_xl = font.ft_xl
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
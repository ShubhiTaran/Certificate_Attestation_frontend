import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../user.service';
import { NgForm } from "@angular/forms";
import Swal from 'sweetalert2'
@Component({
  selector: 'app-email-otp',
  templateUrl: './email-otp.component.html',
  styleUrls: ['./email-otp.component.scss']
})
export class EmailOtpComponent implements OnInit {

  forgotForm: FormGroup;
  setBg: any;
  diff: any;
  continue: any;
  bg_image: string;
  constructor(public router: Router, public userservice: UserService, public formbuilder: FormBuilder, public route: ActivatedRoute) { }
  submitted: boolean = false
  // public time: any = 4.59
  message: any;
  bg: any;
  language: any;
  ft_sm: any;
  ft_md: any;
  ft_xl: any;
  bg_color: any;
  lan: any;

  ngOnInit() {
    this.forgotForm = this.formbuilder.group({
      email_otp: ['', Validators.required]
    });
    this.timeUpdate()
    // Swal.fire('','OTP has been send to Your Email Id')    
  }

  timeUpdate() {
    // setInterval(() =>{
      
    //   this.time = (Number(this.time) - .01).toFixed(2)
    //   if(this.time == 4){
    //     this.time = 3.59
    //   }
    //   else if(this.time == 3){
    //     this.time = 2.59
    //   }
    //   else if(this.time == 2){
    //     this.time = 1.59
    //   }
    //   else if(this.time == 1){
    //     this.time == .59
    //   }
    //   if(this.time == 0){
    //     Swal.fire('',"Your time is experired, Please regiser again.")
    //     this.router.navigate(['register-here'])
    //   }
    // }, 1000)
  }

  otppass() {
    this.submitted = true
    this.userservice.emailotp(this.forgotForm.value).subscribe(data => {
      console.log("forgot password", this.forgotForm.value)
      console.log("otp respone----", data)
      var response = JSON.parse(JSON.stringify(data)).message;
      console.log("response of email otp is ", response)

      if (response === 'success') {
        let message = "Successfully registered."
        Swal.fire('', message)
        this.router.navigate(['dashboard'])
      } else {
        let message = null
        if(response == "Please, provide OTP."){
          message = this.lan.please_provide_otp
        }
        else{
          message = response
        }
        Swal.fire('', message)
      }
    })
    
  }
  resetpass() {
    this.router.navigate(['reset-pass'])
  }
  db() {
    this.router.navigate(['dashboard'])
  }

  ngDoCheck(){
    this.font(this.message)
    this.backGround(this.bg)
    this.setLanguage(this.language)
 }

  font(session) {
    let font = this.userservice.fontSet(session)
    // console.log('font', font)
    this.ft_sm = font.ft_sm
    this.ft_md = font.ft_md
    this.ft_xl = font.ft_xl
  }

  backGround(bg) {
    let bg_color = this.userservice.backGround(bg)
    this.bg_color = bg_color['bg_color']
    this.setBg = bg_color['bg_color']
    this.diff = bg_color['diff']
    this.continue = bg_color['continue']
    this.bg_image = 'backgroundImg-black'
    if(this.bg_color == 'bg-blues'){
      this.setBg = 'body-white'
      this.bg_image = 'backgroundImg-blue'
      this.continue = 'txt-white bg-blues'
    }
  }

  setLanguage(language) {
    this.lan = this.userservice.setLanguage(language)
  }

}

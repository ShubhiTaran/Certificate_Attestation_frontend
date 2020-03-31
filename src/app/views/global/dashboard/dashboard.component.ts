import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../../../user.service';
import { NgForm } from "@angular/forms";
import Swal from 'sweetalert2'
import {Md5} from 'ts-md5/dist/md5';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data: any
  //  _id:string;
  app_form_data: string;
  app_form_data1: string;
  eye: boolean = true;
  isChecked: boolean;
  model = {
    email_id: '',
    password: '',
    capcha:''
  };
  message: any;
  bg: any;
  language: any;
  ft_sm: any;
  ft_md: any;
  ft_xl: any;
  bg_color: any;
  lan: any;
  diff: any;
  continue: any;
  setBg: any;
  bg_image: string;
  setCapcha:string 
  capcha_error: string;
  constructor(public userservice: UserService, public router: Router, public route: ActivatedRoute) { }
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;

  ngOnInit() {
    // this.isChecked = false
    sessionStorage.removeItem("token");
    document.cookie = "eee"
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });

    console.log(document.cookie)
    this.setItem()
    this.capcha_create()
  }

  setItem() {
    let email_id = sessionStorage.getItem("email_id");
    let password = sessionStorage.getItem("password");
    this.model.email_id = email_id;
    this.model.password = password;
  }

  capcha_chk(){
    this.capcha_error = ''
  }

  onSubmit() {


    if(this.setCapcha.replace(/ /g,'') != this.model['capcha']){
      this.capcha_error = ""
      this.capcha_create()
      this.model['capcha'] = ''
      return
    }
    // else{
    //   this.capcha_create()
    //   this.model['capcha'] = ''
    //   this.capcha_error = ""
    // }

    let ciphertext_password = CryptoJS.AES.encrypt( this.model.password, 'Rpqb$2018');
    let ciphertext_email = CryptoJS.AES.encrypt( this.model.email_id, 'Rpqb$2018');

    let sendData = {
       email_id : this.model.email_id,
       password: ciphertext_password.toString()
    }
    console.log(sendData)


    this.userservice.login(sendData).subscribe((data) => {


      this.capcha_create()
      this.model['capcha'] = '';
      this.model['password'] = '';
   
      let first_name = data['first_name']
      let registration_status = data['registration_status']
      let token = data['token']
      let user_type = data['user_type']
      let _id = data['_id']
      let message = data['message']

      const chkboxStatus = document.getElementById("customCheck")["checked"]
      console.log("chkboxStatus", chkboxStatus);

      if (message) {
        Swal.fire('', message)
        return
      }

      if (chkboxStatus) {
        sessionStorage.setItem("email_id", this.model.email_id)
        sessionStorage.setItem("password", this.model.password)
      }
      else {
        sessionStorage.setItem("email_id", "")
        sessionStorage.setItem("password", "")
      }

      if (registration_status == false) {
        this.router.navigate(['email-otp'])
        return
      }
      document.cookie = token;
      // alert(document.cookie);
      // console.log(document.cookie)
      sessionStorage.setItem('token', 'token');
      sessionStorage.setItem('_id', _id);
      sessionStorage.setItem('userName', first_name);
      if (user_type == "student") {
        this.router.navigate(['user-dashboard']);
      }
      else if (user_type == "admin") {
        this.router.navigate(['../admin-do-ds-dashboard']);
      }
      else if (user_type == "deputysecretary") {
        this.router.navigate(['../deputy-sec-dashboard']);
      }
      else if (user_type == "deskofficer") {
        this.router.navigate(['../desk-officer-dashboard']);
      }

    }, (error) => {
      console.error("error", error);
      let status = error.status;
      if(status == 429){
        let nextValidRequestDate = error.error.error.nextValidRequestDate;
        let text =   error.error.error.text;
        let date = new Date(nextValidRequestDate);
        let time_stamp = date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
        let message = "Your IP address blocked. You can login again by " + time_stamp;
        Swal.fire('',message , 'error');
      }

   })
    

  }



  checkValue(status) {
    this.isChecked = status
  }

  show() {
    var p = document.getElementById('pass');
    p.setAttribute('type', 'text');
    this.eye = false
  }

  hide() {
    var p = document.getElementById('pass');
    p.setAttribute('type', 'password');
    this.eye = true
  }

  forgotpass() {
    this.router.navigate(['forgot-pass'])

  }

  registerhere() {
    this.router.navigate(['register-here'])
  }

  capcha_create(){
  
      var alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9');
      var i;
      for (i = 0; i < 6; i++) {
          var a = alpha[Math.floor(Math.random() * alpha.length)];
          var b = alpha[Math.floor(Math.random() * alpha.length)];
          var c = alpha[Math.floor(Math.random() * alpha.length)];
          var d = alpha[Math.floor(Math.random() * alpha.length)];
          var e = alpha[Math.floor(Math.random() * alpha.length)];
          var f = alpha[Math.floor(Math.random() * alpha.length)];
          var g = alpha[Math.floor(Math.random() * alpha.length)];
      }
      var code = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' ' + f + ' ' + g;
     this.setCapcha = code
  
  }


  ngDoCheck() {
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



  doc_verification() {
    this.router.navigate(['../doc-verification'])
  }
}
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { Router, ActivatedRoute } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import { HttpClient,HttpEventType } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../../../user.service';
import { NgForm } from "@angular/forms";


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userDetails:any;
  data:any;
  data1:any
  app_message:any
  passportForm:FormGroup;
  user_id:any;
  submitted = false
  _id:String
  appl_data: any;
  userName:String

  language: string
  ft_md: string
  ft_sm: string
  bg_color: string
  lan: any
  public message: any
  public bg: any
  ft_xl: any;
  diff: any;
 
  
  constructor(private router : Router,private userservice:UserService,private route:ActivatedRoute,private formBuilder:FormBuilder) { }

  ngOnInit() {
    
    var test = this._id = sessionStorage.getItem('_id');
    console.log("dat test",test);
  localStorage.setItem(this.user_id,test)
    this.passportForm = this.formBuilder.group({
      _id: test
    });
    this.userservice.getUserProfile(test).subscribe(
      res => {
        let status = null
      try{ status = test['message']['status']} catch(e){}

      console.log('status', status);
      if (this.userservice.home(status)) {
       this.data1 = res;
        this.data=this.data1.message[0];
        this.userDetails=JSON.parse(JSON.stringify(this.data))
        console.log("data of details",this.userDetails)
      }
      },
      err => { 
        console.log(err);
        
      }
    );
  }
  

isCollapsed: boolean = false;
iconCollapse: string = 'icon-arrow-up';

collapsed(event: any): void {
  // console.log(event);
}

expanded(event: any): void {
  // console.log(event);
}

toggleCollapse(): void {
  this.isCollapsed = !this.isCollapsed;
  this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
}
appli() {
  this.userservice.newappli(this.passportForm.value).subscribe(res => {
    let status = null
      try{ status = res['message']['status']} catch(e){}

      console.log('status', status);
      if (this.userservice.home(status)) {
    console.log("response-----", this.passportForm.value)
    console.log("response of message", res)
    var response=JSON.parse(JSON.stringify(res)).message;
    console.log("response of the message id",response)
    localStorage.setItem(this.app_message, response);
    var response1 = localStorage.getItem(this.app_message)
    this.router.navigate(['user-appl-form'])
  }
  })
}
currentDesignation(){

		this.router.navigate(['user-current-designation'])	  
}
s2(){

  this.router.navigate(['view-user-s2'])	  
}
home(){
  this.router.navigate(['user-dashboard'])
}
doc() {
  console.log("this.passportForm.value",this.passportForm.value)
   this.router.navigate(['user-mandatory-documents'])
 }
 profile() {
   this.userservice.getUserProfile(this.passportForm.value).subscribe(res => {
    let status = null
    try{ status = res['message']['status']} catch(e){}

    console.log('status', status);
    if (this.userservice.home(status)) {
     console.log("response----- of id", this.passportForm.value)
     console.log("response of id ",res)
     var data=this.passportForm.value
    var data1= data._id
    console.log("data of id",data1)
    
     localStorage.setItem(this.app_message, data1);
    
     var response = localStorage.getItem(this.app_message)
     this.router.navigate(['user-profile'])
   }
   })
 }

 ngDoCheck() {
  this.font(this.message)
  this.backGround(this.bg)
  this.setLanguage(this.language)
}

 font(session) {
  let font = this.userservice.fontSet(session)
  //  console.log('font', font)
  this.ft_sm = font.ft_sm
  this.ft_md = font.ft_md
  this.ft_xl = font.ft_xl
}

backGround(bg) {
  // console.log("background", bg)
  let bg_color = this.userservice.backGround(bg)
  this.bg_color = bg_color['bg_color']
  this.diff = bg_color['diff']
}

setLanguage(language) {
  this.lan = this.userservice.setLanguage(language)
}

}

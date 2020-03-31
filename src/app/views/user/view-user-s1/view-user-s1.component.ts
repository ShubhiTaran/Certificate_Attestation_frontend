import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { UserService } from '../../../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment.prod'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-user-s1',
  templateUrl: './view-user-s1.component.html',
  styleUrls: ['./view-user-s1.component.scss']
})
export class ViewUserS1Component implements OnInit {
  format: any;
  lan: any;
  continue: any;

  constructor(public userService: UserService, private route: ActivatedRoute, 
    private sanitizer: DomSanitizer,private router: Router, ) { }

  urlLink = environment.apiURL
  public userName: String
  pageNumber: number = 2
  show: any
  setClass: any
  classArr: any
  application_no: any
  ApproveStatus: String
  primary_reason: String
  primary_reasonTxtShow: boolean = false

  personalDetails: any



  uplodedDocuments = []

  redBorder = "redBorder"

  country: String
  state: String
  city: String
  houseNo: String
  streetNo: String
  pincode: String
  mobileNo: String
  emailId: String

  userImg: String
  passportImg: String
  documentImg: String
  _id: any

  visa_photo:String
  affidavit_photo:String
  callletter_photo:string

  ft_md:string 
  ft_sm:string 
  bg_color:string 
  public message:any
  public bg:any 
  public setTxt:any 
  language:string

  ngDoCheck(){
    this.font(this.message)
    this.backGround(this.bg)
    this.setLanguage(this.language)
 }

  ngOnInit() {
   this.parmas()
  }

  font(session){
    let font = this.userService.fontSet(session)
    // console.log('font', font)
    this.ft_sm = font.ft_sm
    this.ft_md = font.ft_md
   }
 
   backGround(bg){
    let bg_color = this.userService.backGround(bg)
    this.bg_color = bg_color['bg_color']
    this.setTxt = bg_color['setTxt']
    this.continue = bg_color['continue']
  }

  setLanguage(language){
    this.lan = this.userService.setLanguage(language)
  }



  parmas() {
    this.application_no = sessionStorage.getItem('application_no');
  }

  home(){
    this.router.navigate(['../user-dashboard'])

  }
  
}

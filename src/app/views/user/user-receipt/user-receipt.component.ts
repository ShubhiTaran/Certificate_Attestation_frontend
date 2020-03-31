import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../../../user.service';
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import { environment } from '../../../../environments/environment.prod'
// import * as jsPDF from 'jspdf';
// // import jsPDF from 'jspdf';
// import 'jspdf-autotable';
declare var jsPDF: any;



@Component({
  selector: 'app-user-receipt',
  templateUrl: './user-receipt.component.html',
  styleUrls: ['./user-receipt.component.scss']
})
export class UserReceiptComponent implements OnInit {

  urlLink = environment.apiURL
  userReceipt: any;
  data: any;
  reciept_data: any = {
    name:'',
    father_name:'',
    mother_name:'',
    application_number:'',
    appointment_date:'',
    meeting_address:''
  }
  user_id: any;
  passportForm: FormGroup;
  application_no: any;
  user_image: any;
  userName: string
  _id: any
  pdf_link: any


  bg: any;
  language: any;
  ft_sm: any;
  ft_md: any;
  bg_color: any;
  setTxt: any;
  continue: any;
  lan: any;
  message: any;
  ft_xl: any;
  diff: any;

  constructor(private router: Router, private userservice: UserService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit() {

    var _id = this._id = sessionStorage.getItem('_id');
    this.application_no = sessionStorage.getItem('application_no');
   
    this.passportForm = this.formBuilder.group({
      _id: _id
    });

    this.userservice.getReceipt(this.application_no).subscribe(
      res => {
        console.log('result', res)
        this.reciept_data = res;
        let receiptPath = this.pdf_link = `${this.urlLink}/${'download'}/${res['receiptPath']}`
        console.log("receiptPath", receiptPath)
        // this.pdf_link = 
        this.user_image = `${this.urlLink}/${this.reciept_data.personal_photo}`
        console.log("image url", this.user_image)
        console.log("data of details", this.reciept_data)
      });
  }

  home() {
    this.router.navigate(['user-dashboard'])
  }
  appli() {
    this.router.navigate(['user-appl-form'])
  }

  @ViewChild('content') content: ElementRef

  public DownloadPDF() {
    console.log("chk")
    window.open(this.pdf_link)
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
    this.setTxt = bg_color['setTxt']
    this.continue = bg_color['continue']
    this.diff = bg_color['diff']
  }

  setLanguage(language) {
    this.lan = this.userservice.setLanguage(language)
  }

}



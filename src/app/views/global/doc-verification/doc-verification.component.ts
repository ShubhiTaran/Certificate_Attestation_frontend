import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../user.service';
import { setTime } from 'ngx-bootstrap/chronos/utils/date-setters';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { sha256, sha224 } from 'js-sha256';
import {Md5} from 'ts-md5/dist/md5';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-doc-verification',
  templateUrl: './doc-verification.component.html',
  styleUrls: ['./doc-verification.component.scss']
})
export class DocVerificationComponent implements OnInit {

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
  selectedFile: File = null;
  load: boolean = false
  officer_name: string
  designation: string
  attested_on: string
  imgName: string
  animate: any = Array(12).fill(false)
  fail: boolean = false
  success: boolean = false
  percent: number = 20;
  imgURL: any;
  format: any;
  base64:any;
  diff: any;

  constructor(public userservice: UserService,private ngxService: NgxUiLoaderService,
     private router: Router, private sanitizer: DomSanitizer, ) { }

  ngOnInit() {
  }

  ngDoCheck() {
    this.font(this.message)
    this.backGround(this.bg)
    this.setLanguage(this.language)
  }

  verify() {
    this.animate = Array(12).fill(false)
    if(this.selectedFile != null){
        this.univercityCheck()
    }
    else{
      let message = "Please upload the image."
      Swal.fire('', message)
    }

  }

  setTime() {
    let index = 0

    let intervalID: any = setInterval(() => {
      this.animate[index] = true
      window.scrollTo(0, 1000);
      if (++index == this.animate.length) {
        window.clearInterval(intervalID);
      }
      // console.log('arr', this.animate)
    }, 800);

  }

  onFileSelected(event) {
    this.load = true
    this.selectedFile = <File>event.target.files[0];
    const mimeType = this.selectedFile['type']
    if (mimeType.match(/image\/*/) == null && mimeType.match(/pdf\/*/) == null) {
      Swal.fire('', 'Images or Pdf only supported.')
      return
    }
    // console.log(this.selectedFile)
    let imgName = this.selectedFile['name']
    this.imgName = imgName.substring(imgName.length - 15)
  }


  preview(files) {
    console.log("files", files);
    this.success = this.fail = false
    if (files.length === 0)
      return;
      var mimeType = files[0].type;
      console.log("mimeType", mimeType);
  
      if (mimeType.match(/image\/*/) == null && mimeType.match(/pdf\/*/) == null) {
        // this.message = "Only images are supported.";
        return;
      }
      if(mimeType.match(/pdf\/*/)){
        console.log('this is pdf')
        this.format = 'pdf'
      }
      else{
        this.format = 'image'
      }
      // this.format = img.substring(img.length - 3, img.length)
      // console.log("format", this.format);

    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      let img = reader.result.toString()
      
      this.imgURL = this.sanitizer.bypassSecurityTrustResourceUrl(img);
      this.base64 = img;
    }


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

  db() {
    this.router.navigate(['../dashboard'])
  }

  response() {
    return {
      status: true,
      officer_name: 'Vikram',
      designation: 'Deputy Securarty',
      attested_on: '2018-02-02'
    }
  }

  univercityCheck() {
    this.ngxService.start();
    let rawBase64 = this.base64;
    let base64 = rawBase64.substr(rawBase64.indexOf('base64')+7, rawBase64.length-1)
    // console.log('base64', base64)
    let hash =  Md5.hashAsciiStr(base64); 
    console.log("hash", hash)
    this.userservice.univercityCheck({hash}).subscribe(data => {
      console.log('data', data)
      this.ngxService.stop();
      if(data['status']){
        this.success = true
        this.officer_name = data['owner']
        this.designation = data['designation']
        this.attested_on = data['date']
        this.setTime()
      }
      else{
        this.fail = true
      }
    })
  }
}

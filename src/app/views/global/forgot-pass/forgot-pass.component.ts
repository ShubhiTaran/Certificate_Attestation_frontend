
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../user.service';
import { NgForm } from "@angular/forms";
import Swal from 'sweetalert2'
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss']
})
export class ForgotPassComponent implements OnInit {
  model: any = {};
  message: any;
  bg: any;
  language: any;
  ft_sm: any;
  ft_md: any;
  ft_xl: any;
  bg_color: any;
  lan: any;
  setBg: any;
  diff: any;
  continue: any;
  bg_image: string;
  constructor(public router: Router, public userservice: UserService, private ngxService: NgxUiLoaderService,
     public formbuilder: FormBuilder) { }

  ngOnInit() {

  }

  onSubmit() {

    console.log(this.model);
    this.ngxService.start();
    this.userservice.forgotpass(this.model).subscribe(data => {
      console.log('data', data)
      let message = data['message']
      if (message === "Please Register Your email id.") {
        Swal.fire('', message)
        this.ngxService.stop();
      }
      else {
        Swal.fire('', message)
        this.ngxService.stop();
        this.router.navigate(['dashboard'])
      }

    })
  }


  db() {
    this.router.navigate(['dashboard'])
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
    if (this.bg_color == 'bg-blues') {
      this.setBg = 'body-white'
      this.bg_image = 'backgroundImg-blue'
      this.continue = 'txt-white bg-blues'
    }
  }

  setLanguage(language) {
    this.lan = this.userservice.setLanguage(language)
  }
}
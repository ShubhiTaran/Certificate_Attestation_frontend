import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../user.service';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit {
  onchange: File
  files: any[];
  result: any
  resetForm: FormGroup;
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
  set_password_id: string;
  passwordMatch: boolean = false;
  passwordStrenth:boolean = true;

  constructor(public router: Router, public userservice: UserService,  private ngxService: NgxUiLoaderService,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.set_password_id = this.activatedRoute.snapshot.queryParamMap.get('set_password_id');

  }


  confirm_password() {
    let model = this.model
    let confirm_pass = model.confirm_pass;
    let password = model.password;
    model['set_password_id'] = this.set_password_id
    // console.log("model", model)

    if (confirm_pass == password) {
      this.passwordMatch = true
    }
    else {
      this.passwordMatch = false;
      console.log("password did not matched")
      return
    }
  }


  onSubmit() {

    let model = this.model
    let confirm_pass = model.confirm_pass;
    let password = model.password;
    model['set_password_id'] = this.set_password_id
   

    if (confirm_pass == password) {
      this.passwordMatch = true
    }
    else {
      this.passwordMatch = false;
      console.log("password did not matched")
      return
    }
    this.ngxService.start();
    console.log("model", model)
    this.userservice.resetPassword(model).subscribe(data => {
      console.log("data", data)
      let message = data['message']
      if (message === "This link is already used you can not use it again.") {
        Swal.fire('', message)
        this.ngxService.start();
      }
      else if (message === "Your password is successfully updated.") {
        Swal.fire('', message)
        this.ngxService.start();
        this.router.navigate(['dashboard'])

      }
    })

  

    // console.log('senddata', this.resetForm.value)
    // this.userservice.resetpass(this.resetForm.value).subscribe(data => {
    //   console.log("Reset password", this.resetForm.value)
    //   console.log(data)
    //   var response = JSON.parse(JSON.stringify(data)).message;

    //   if (response === "This link is already used you can not use it again.") {

    //     alert(response)
    //   }
    //   else if (response === "Your password is successfully updated.") {
    //     alert(response)
    //     this.router.navigate(['dashboard'])

    //   }
    // })
  }

  password_chk() {

    

    let str = this.model.password
    console.log("str", str);
    
    let string = str.split('')
    let caps = false
    let small = false
    let number = false
    let spl = false

    let status = false

    string.map((val) => {
    
      let ascii = val.charCodeAt(0);
   
      if (ascii >= 97 && ascii <= 122) {
        caps = true
      }
      if (ascii >= 65 && ascii <= 90) {
        small = true
      }

      if (ascii >= 48 && ascii <= 57) {
        number = true
      }

      var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      if (format.test(str)) {
        spl = true
      }

      if (caps && small && number && spl) {
        status = true
      
      }

    })

    this.passwordStrenth = status

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

  db() {
    this.router.navigate(['dashboard'])
  }
}
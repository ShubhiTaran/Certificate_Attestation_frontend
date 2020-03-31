import { Component, OnInit, Renderer2 } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.scss']
})
export class LoginHeaderComponent implements OnInit {
  setTxt: any;
  diff: any;

  constructor(public userservice: UserService, private renderer: Renderer2) { }

  message: any;
  bg: any;
  language: any;
  ft_sm: any;
  ft_md: any;
  ft_xl: any;
  bg_color: any;
  lan: any;
  url: any
  isDashboard: boolean = false;
  ngOnInit() {
    this.pageIdentification()
  }

  pageIdentification() {
    this.url = window.location.href
    let split = this.url.split('/')
    let isDashboard = false
    split.map((val) => {
      if (val == "dashboard" || val == "forgot-pass" || val == "email-otp") {
        isDashboard = true
      }
    })

    if(this.url.includes("reset-pass")){
      isDashboard = true
    }
    this.isDashboard = isDashboard;
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
    if(this.isDashboard && this.bg_color == 'bg-blues'){
    
      this.bg_color = "body-white"
      this.setTxt = "txt-blue"
      this.diff = 'txt-black'
    }
    else if(this.isDashboard && this.bg_color == 'bg-blacks'){
    
      this.bg_color = "body-white"
      this.setTxt = "txt-black"
      this.diff = 'txt-black'
    }
    else {
      
      this.setTxt = 'txt-white'
      this.diff = 'txt-white'
    }
   
    

  }

  setLanguage(language) {
    this.lan = this.userservice.setLanguage(language)
  }

}

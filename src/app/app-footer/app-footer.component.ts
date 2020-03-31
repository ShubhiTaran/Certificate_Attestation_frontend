import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss']
})
export class AppFooterComponent implements OnInit {
 

  constructor( private userservice: UserService) { }

  message: any;
  bg: any;
  language: any;
  ft_sm: any;
  ft_md: any;
  bg_color: any;
  lan: any;
  setTxt: any;
  continue: any;
  ft_xl: any;

  ngOnInit() {
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

  backGround(bg){
    this.bg_color = this.userservice.backGround(bg)['bg_color']
    if(this.bg_color == 'bg-blues'){
      this.bg_color = 'bg-lightBlack'
    }
  }

  setLanguage(language) {
    this.lan = this.userservice.setLanguage(language)
  }

}

import { Component, OnInit, Renderer2 } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {

  ft_md: string 
  ft_sm: string 
  ft_xl: string 
  bg_color: string 
  lan: any
  message: any;
  bg: any;
  language: any;
  setTxt: any;
  diff: any;

  constructor(private userservice: UserService, private renderer: Renderer2,) { }

  ngOnInit() {
  }

  ngDoCheck() {
    this.font(this.message)
    this.backGround(this.bg)

  }

  font(session) {
    let font = this.userservice.fontSet(session)
    // console.log('font', font)
    this.ft_sm = font.ft_sm
    this.ft_md = font.ft_md
    this.ft_xl = font.ft_xl
  }

  backGround(bg){
    let bg_color = this.userservice.backGround(bg)
    this.bg_color = bg_color['bg_color']
    this.setTxt = bg_color['setTxt']
    this.diff = bg_color['diff']
  }

}

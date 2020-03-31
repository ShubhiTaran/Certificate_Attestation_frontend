import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../../../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-disclimer',
  templateUrl: './disclimer.component.html',
  styleUrls: ['./disclimer.component.scss']
})
export class DisclimerComponent implements OnInit {

  language: string
  ft_md: string
  ft_sm: string
  bg_color: string
  lan: any
  public message: any
  public bg: any
  ft_xl: any;
  diff: any;
  continue: any;
  
  constructor(private formBuilder: FormBuilder, private userservice: UserService, 
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  ngDoCheck() {
    this.font(this.message)
    this.backGround(this.bg)
  }
  
   font(session) {
    let font = this.userservice.fontSet(session)
    this.ft_sm = font.ft_sm
    this.ft_md = font.ft_md
    this.ft_xl = font.ft_xl
  }
  
  backGround(bg) {
    let bg_color = this.userservice.backGround(bg)
    this.bg_color = bg_color['bg_color']
    // this.setTxt = bg_color['setTxt']
    this.continue = bg_color['continue']
    this.diff = bg_color['diff']
  }

}

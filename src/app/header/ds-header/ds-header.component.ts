import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-ds-header',
  templateUrl: './ds-header.component.html',
  styleUrls: ['./ds-header.component.scss']
})
export class DsHeaderComponent implements OnInit {

  @Input() public userName;
  @Input() public _id;
  @Input() public pgName;
  @Input() public message;
  @Input() public bg;
  @Input() public language;
  ft_sm: any;
  ft_xl: any;
  bg_color: any;
  lan: any;

  constructor( private router:Router, private route:ActivatedRoute, 
     private userservice: UserService) { }

  ngOnInit() {

  }

  ngDoCheck() {
    this.parmas()
    this.font(this.message)
    this.backGround(this.bg)
    this.setLanguage(this.language)
  }

  parmas() {
    this._id = sessionStorage.getItem('_id');
    this.userName = sessionStorage.getItem('userName');
  }


  home(){
    this.router.navigate(['../deputy-sec-dashboard']);
  }

  updatePassword(urlLink){
    this.router.navigate([urlLink]);
  }



  font(session) {
    let font = this.userservice.fontSet(session)
    // console.log('font', font)
    this.ft_sm = font.ft_sm
    this.ft_sm = font.ft_md
    this.ft_xl = font.ft_xl
  }

  backGround(bg){
    this.bg_color = this.userservice.backGround(bg)['bg_color']
  }

  setLanguage(language) {
    this.lan = this.userservice.setLanguage(language)
  }
}

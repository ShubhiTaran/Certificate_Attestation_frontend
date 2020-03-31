import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  @Input() public userName;
  @Input() public pgName;
  ft_md: string 
  ft_sm: string 
  ft_xl: string 
  bg_color: string 
  lan: any
  message: any;
  bg: any;
  language: any;
  _id: any;

  constructor( private router:Router, private route:ActivatedRoute, 
     private userservice: UserService) { }

  ngOnInit() {
    this.parmas()
  }

  parmas() {
    this.userName = sessionStorage.getItem('userName');
    this._id = sessionStorage.getItem('_id');
  }

  home(){
    this.router.navigate(['../admin-do-ds-dashboard']);
  }

  updatePassword(urlLink){
    this.router.navigate([urlLink]);
  }

  newAccount(){
    this.router.navigate(['../admin-add-account']);
  }

  DoDsDetail(){
    this.router.navigate(['../admin-do-ds-dashboard']);
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

  backGround(bg){
    this.bg_color = this.userservice.backGround(bg)['bg_color']
  }

  setLanguage(language) {
    this.lan = this.userservice.setLanguage(language)
  }

}

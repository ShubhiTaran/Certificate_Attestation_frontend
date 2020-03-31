import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../../../user.service';


@Component({
  selector: 'app-user-mandatory-documents',
  templateUrl: './user-mandatory-documents.component.html',
  styleUrls: ['./user-mandatory-documents.component.scss']
})
export class UserMandatoryDocumentsComponent implements OnInit {
user_id:string;
passportForm: FormGroup;
  submitted = false
  app_message: string
  appl_data: any;
  userName: any;
  _id: any;

  language: string
  ft_md: string
  ft_sm: string
  bg_color: string
  lan: any
  public message: any
  public bg: any
  ft_xl: any;
  diff: any;
  
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
    this.diff = bg_color['diff']
  }
  
}
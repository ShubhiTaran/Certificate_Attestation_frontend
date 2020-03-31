import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-do-contact-us',
  templateUrl: './do-contact-us.component.html',
  styleUrls: ['./do-contact-us.component.scss']
})
export class DoContactUsComponent implements OnInit {
  userName: any;

  constructor( private userservice: UserService,
    public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
   
  }

}

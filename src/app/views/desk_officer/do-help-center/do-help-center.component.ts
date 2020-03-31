import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-do-help-center',
  templateUrl: './do-help-center.component.html',
  styleUrls: ['./do-help-center.component.scss']
})
export class DoHelpCenterComponent implements OnInit {
  userName: any;

  constructor( private userservice: UserService,
    public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
  
  }


}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-do-site-map',
  templateUrl: './do-site-map.component.html',
  styleUrls: ['./do-site-map.component.scss']
})
export class DoSiteMapComponent implements OnInit {
  userName: any;

  constructor( private userservice: UserService,
    public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
  
  }

}

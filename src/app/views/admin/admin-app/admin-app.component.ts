import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-app',
  templateUrl: './admin-app.component.html',
  styleUrls: ['./admin-app.component.scss']
})
export class AdminAppComponent implements OnInit {

  constructor( public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
  }
addacount(){
  this.router.navigate(['add-acc'])
}
}

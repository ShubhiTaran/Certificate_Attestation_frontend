import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chk',
  templateUrl: './chk.component.html',
  styleUrls: ['./chk.component.scss']
})
export class ChkComponent implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute,) { }

  ngOnInit() {
    this.router.navigate(['../search'], 
    { queryParams:{"userName": null}, relativeTo: this.route });
  }

}

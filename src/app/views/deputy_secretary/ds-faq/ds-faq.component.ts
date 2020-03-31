import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ds-faq',
  templateUrl: './ds-faq.component.html',
  styleUrls: ['./ds-faq.component.scss']
})
export class DsFaqComponent implements OnInit {
  userName: any;
  _id: any;

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
 
  }


}

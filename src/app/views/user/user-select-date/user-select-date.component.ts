import { Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-user-select-date',
  templateUrl: './user-select-date.component.html',
  styleUrls: ['./user-select-date.component.scss']
})
export class UserSelectDateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $("#nav").scrollspy({ offset: -75 });
  }

}

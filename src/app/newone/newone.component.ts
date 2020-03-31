import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-newone',
  templateUrl: './newone.component.html',
  styleUrls: ['./newone.component.scss']
})
export class NewoneComponent implements OnInit {

  constructor() { }

  flip:string

  ngOnInit() {


    setInterval(() =>{
      console.log("hello");
      this.flip = "flip flip-card-inner"
    }, 10000)


   
  }

}

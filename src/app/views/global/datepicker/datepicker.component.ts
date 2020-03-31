import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

  myForm: FormGroup;
  constructor(public formBuilder: FormBuilder){}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      date: null,
      range: null
    });
  }

}

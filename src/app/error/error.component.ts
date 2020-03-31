import { Component, OnInit, ErrorHandler } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements ErrorHandler {

  constructor() { }

  handleError(error) {
    console.warn('Handler caught an error', error);
  }

}

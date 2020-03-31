import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { User } from './user';
@Injectable({
  providedIn: 'root'
})
export class DAMService {
  
  constructor() { }

private form1=new BehaviorSubject(null);

sendform1(data:any){
  this.form1.next(data);
}
getform1(){
  return this.form1.asObservable();
}

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2'
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-admin-add-account',
  templateUrl: './admin-add-account.component.html',
  styleUrls: ['./admin-add-account.component.scss']
})

export class AdminAddAccountComponent implements OnInit {

  userName: String
  model: any = {};
  submitted: any = {};
  passMathch: String
  message: any;
  bg: any;
  language: any;
  ft_sm: any;
  ft_md: any;
  bg_color: any;
  lan: any;
  setTxt: any;
  hero: any = {
    name: '',
    mobile: ''
  }

  simpleItems = [true, 'Two', 3];
  continue: any;
  diff: any;
  country: Object;
  // selectedSimpleItem:any;

  constructor(private route: ActivatedRoute, private router: Router,
    public userService: UserService, private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    this.tokenChk();
    this.getCountry();
  }

  tokenChk() {
    if (!sessionStorage.getItem('token')) {
      this.router.navigate(['dashboard'])
      return
    }
  }

  getCountry() {
    this.userService.apiscountry().subscribe(data => {
      this.country = data
    })
  }

  onSubmit() {
    let model = this.model
    console.log("model", model)
    // console.log("selectedItem", this.selectedSimpleItem);
    if (model.Cpassword != model.password) {
      this.passMathch = "Password didn't matched"
      return
    }

    this.ngxService.start();
    this.userService.onBoard(model)
      .subscribe((result) => {
        let status = null
        try { status = result['message']['status'] } catch (e) { }
        console.log('status', status);
        if (this.userService.home(status)) {
          this.ngxService.stop();
          console.log("result", result);
          if(result['message'] == "success"){
            Swal.fire("", 'Successfully Registered.')
          }
          else{
            Swal.fire("", 'Not Registered, Email ID or phone number alredy exist!!')
          }
          
          this.router.navigate(['../admin-do-ds-dashboard']);

        }
      })
  }

  contactNo_no() {
    let getdata = this.model.phone_number;
    (getdata == undefined) ? (getdata = "") :
      (getdata.length > 10) ? (this.model.phone_number = getdata.substring(0, 10)) :
        this.model.phone_number = getdata.replace(/\D/g, "");
  }

  home() {
    this.router.navigate(['../admin-dashboard']);
  }


  ngDoCheck() {
    this.font(this.message)
    this.backGround(this.bg)
    this.setLanguage(this.language)
  }

  font(session) {
    let font = this.userService.fontSet(session)
    this.ft_sm = font.ft_sm
    this.ft_md = font.ft_md
  }

  backGround(bg) {
    let bg_color = this.userService.backGround(bg)
    this.bg_color = bg_color['bg_color']
    this.setTxt = bg_color['setTxt']
    this.continue = bg_color['continue']
    this.diff = bg_color['diff']
  }

  setLanguage(language) {
    this.lan = this.userService.setLanguage(language)
  }
}
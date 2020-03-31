import { Component, OnInit, Renderer2 } from '@angular/core';
import * as $ from 'jquery';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../../../user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  providers: [NgbModalConfig, NgbModal]

})

export class UserDashboardComponent implements OnInit {
  passportForm: FormGroup;
  submitted = false
  app_message: string
  appl_data: any = []
  userName: any;
  _id: any;
  language: string
  ft_md: string
  ft_sm: string
  bg_color: string
  lan: any
  public message: any
  public bg: any
  setTxt: any;
  continue: any;
  diff: any;
  application_no: any;
 ft_xl: string = "ft-xl"


  constructor(private formBuilder: FormBuilder, private userservice: UserService,
    private renderer: Renderer2, config: NgbModalConfig, private modalService: NgbModal,
    private router: Router, private route: ActivatedRoute) { 
      config.backdrop = 'static';
    config.keyboard = false;
    }

  ngDoCheck() {
    this.font(this.message)
    this.backGround(this.bg)
    this.setLanguage(this.language)
  }


  ngOnInit() {
    // this.font(this.message)
    // this.backGround(this.bg)
    // this.setLanguage(this.language)
    this.parmas()
    this.resetSession()
    var test = sessionStorage.getItem('_id');

    console.log("test", test);
    this.passportForm = this.formBuilder.group({ _id: test });

    let sendData = { "_id": test }
    this.userservice.getapplications(sendData).subscribe(data => {
      let status = null
      try { status = data['message']['status'] } catch (e) { }
      console.log('status', status);
      if (this.userservice.home(status)) {
        console.log("data", data)
        if (data['message'] == "No requests yet") {
          console.log("No requests yet")
          return
        }
        else {
          this.appl_data = data['All_request_details']
        }
      }
    })

  }

  resetSession(){
    sessionStorage.removeItem('one');
    sessionStorage.removeItem('two');
    sessionStorage.removeItem('three');
    sessionStorage.removeItem('foure');
    sessionStorage.removeItem('five');
    sessionStorage.removeItem('isAllow');
  }

  font(session) {
    let font = this.userservice.fontSet(session)
    //  console.log('font', font)
    this.ft_sm = font.ft_sm
    this.ft_md = font.ft_md
    this.ft_xl = font.ft_xl
  }

  backGround(bg) {
    let bg_color = this.userservice.backGround(bg)
    this.bg_color = bg_color['bg_color']
    this.setTxt = bg_color['setTxt']
    this.diff = bg_color['diff']
    this.continue = bg_color['continue']
  }

  setLanguage(language) {
    this.lan = this.userservice.setLanguage(language)
  }

  getapplications() {

  }

  parmas() {
    this.route.queryParams.subscribe(params => {
      this.userName = params.userName
      this._id = params._id
      this.application_no = params.application_no
    });
  }

  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }
  // appli() {

  //   this.router.navigate(['user-appl-form'],
  //     { queryParams: { _id: this._id, application_no: this.application_no } })

  // }

  // toggleCollapse(): void {
  //   this.isCollapsed = !this.isCollapsed;
  //   this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  // }


  viewDetails(application_no) {
    sessionStorage.setItem('application_no', application_no);
    this.router.navigate(['view-user-s1'])
  }

  currection(certificate_arr, visa, callLetter, afflict, passport_remark, application_no) {

    sessionStorage.setItem('application_no', application_no);
    sessionStorage.setItem('passport_remark', passport_remark);

    let certificate_remark: any = false
    let chk = false
    try {

      if (visa || callLetter || afflict) {
        chk = true
      }

      certificate_arr.map((val) => {
        if (val != null) {
          chk = true
        }
      })

    } catch (e) { }

    console.log("chk", chk, "callLetter", callLetter, "visa", visa, "afflict", afflict)

    if (chk || callLetter || visa || afflict) {

      sessionStorage.setItem('certificate_remark', 'true');
      let sendData = JSON.stringify({
        certificate_arr, visa, callLetter, afflict
      })
      certificate_remark = sendData
    }
    else {
      sessionStorage.removeItem('certificate_remark');
    }

    let errorCorrected = true
    if (chk && passport_remark) {
      // alert(1)
      errorCorrected = false
      this.router.navigate(['user-currection-passport'],
        {
          queryParams: {
            application_no, certificate_remark, passport_remark,
            _id: this._id, "userName": this.userName
          }
        })
    }
    else if (chk) {
      // alert(2)
      errorCorrected = false
      this.router.navigate(['user-currection'])
    }
    else if (passport_remark) {
      // alert(3)
      errorCorrected = false
      this.router.navigate(['user-currection-passport'])
    }

    if (errorCorrected) {
      // if already corrected then need to go for submit only
      let message = "Error already corrected, Please submit the application"
      Swal.fire('', message)
      this.router.navigate(['user-currection'])
    }

  }


  doc() {
    console.log("this.passportForm.value", this.passportForm.value)
    this.router.navigate(['user-mandatory-documents'])
  }

  profile() {
    this.userservice.getUserProfile(this.passportForm.value).subscribe(res => {

      let status = null
      try { status = res['message']['status'] } catch (e) { }

      console.log('status', status);
      if (this.userservice.home(status)) {
        console.log("check response", res);
        this.router.navigate(['user-profile'])
      }
    })
  }


  calander(application_no, content) {
    this.userservice.getReceipt(application_no).subscribe((data) => {
      console.log('getReceipt', data)
      let appointment_date = data['appointment_date']
      if (appointment_date) {
        let message = "Already scheduled, Your schedule date is : "
        Swal.fire('', message + appointment_date);
      }
      else {
        this.modalService.open(content);
        sessionStorage.setItem('application_no', application_no);
      }
    });
  }

  navigateShedule(){
    sessionStorage.setItem('isAllow', 'yes')
    this.router.navigate(['shedule-reshedule'])
  }

  application_status(status, application_no, user) {

    if (status == "Pending") {
      sessionStorage.setItem('application_no', application_no);
      let pageName = "user-appl-form"

      console.log('applicant_type', user.applicant_type);

      if (user.applicant_type) {
        pageName = "user-passport-details";
        sessionStorage.setItem('one', 'done');
      }
      if (user.passport_number) {
        pageName = "user-contact-details";
        sessionStorage.setItem('two', 'done');
      }
      if (user.permanent_city) {
        if (user.applicant_type == 'behalf') {
          pageName = "user-guarantor-details";
          sessionStorage.setItem('three', 'done');
        }
        else {
          pageName = "user-current-designation";
          sessionStorage.setItem('three', 'done');
          sessionStorage.setItem('foure', 'done');
        }
      }

      if (user.guarantor_city && user.applicant_type == 'behalf') {
        sessionStorage.setItem('foure', 'done');
        pageName = "user-current-designation";
      }
      if (user.designation) {
        sessionStorage.setItem('five', 'done');
         pageName = "user-upload-documents";
         }

      localStorage.setItem('lastPageNumber', "1");
      this.router.navigate([pageName])
    }
  }


  receipt_page(application_no) {
    sessionStorage.setItem('application_no', application_no);
    console.log("function receive application numbar & id--", application_no)
    this.router.navigate(['user-receipt']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../user.service';
import Swal from 'sweetalert2'
import { DAMService } from '../../../dam.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-user-current-designation',
  templateUrl: './user-current-designation.component.html',
  styleUrls: ['./user-current-designation.component.scss']
})

export class UserCurrentDesignationComponent implements OnInit {

  toolTip: string = "Please provide the below information to complete the application form"
  currentStatus: String = 'employee'
  student: boolean = false
  employee: boolean = true
  userName: String
  _id: any
  model: any = {};
  submitted: any = {};
  application_id: string;
  bg: any;
  language: any;
  ft_sm: any;
  ft_md: any;
  bg_color: any;
  setTxt: any;
  continue: any;
  lan: any;
  message: any;
  diff: any;
  un_employee: boolean = false;
  public _year_of_passing: any
  years: any[];
  universitys: any
  other: boolean = false;

  constructor(private formBuilder: FormBuilder, private userservice: UserService,
    private ngxService: NgxUiLoaderService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.application_id = sessionStorage.getItem('application_no');
    this.university()
    this.showData()
    this.pushYear()

  }

  pushYear() {
    let years = []
    let i;
    for (i = 1991; i <= 2019; i++) {
      years.push(i)
    }
    this.years = years
  }

  showData() {

    this.userservice.getCurrentDesignation({ "application_no": this.application_id })
      .subscribe(data => {
        let status = null
        try { status = data['message']['status'] } catch (e) { }

        console.log('status', status);
        if (this.userservice.home(status)) {

          console.log("data", data);
          if (Object.keys(data).length === 0 && data.constructor === Object) {
            return
          }

          this.student = this.employee = this.un_employee = false

          let designation = data['designation']

          if (designation == "self-employee") {
            this.employee = true
            this.currentStatus = 'employee'
            this.model['organization_address'] = data['organization_address']
          }
          else if (designation == "student") {
            this.student = true
            this.currentStatus = "student"
            this.model['organization_address'] = data['college_address']
            let name_of_college = data['name_of_college']
         
             if(this.universitys.includes(name_of_college)){
                this.model['name_of_college'] = name_of_college
              this.other = false;
            }
            else{
              this.model['name_of_college'] = "Other"
              this.other = true;
              this.model['Others'] = name_of_college
            }
            
            
          }
          else {
            this.un_employee = true
            this.currentStatus = "un_employee"
            this.model['college_address'] = data['college_address']
            let name_of_college = data['name_of_college']
         
            if(this.universitys.includes(name_of_college)){
               this.model['name_of_college'] = name_of_college
             this.other = false;
           }
           else{
             this.model['name_of_college'] = "Other"
             this.other = true;
             this.model['Others'] = name_of_college
           }
          }

          this.model['name_of_organization'] = data['name_of_organization']
          // this.model['pan_card_number'] = data['pan_card_number']
          this.model['year_of_passing'] = data['year_of_passing']
          this.model['course'] = data['course']
         
          this.model['purpose_for_authentication'] = data['purpose_for_authentication']
        }
      })
  }

  // this.userservice.currentinfo(this.contactForm.value).subscribe(data=>{
  // this.router.navigate(['user-upload-documents'], 
  // { queryParams: { "obj": response, "obja":this.data,si: true, "userName":this.userName } })

  back() {
    this.router.navigate(['user-guarantor-details']);
  }

  reset() {
    this.model = {}
  }

  universityChange(univ) {
    this.other = false
    if (univ == "Other") {
      this.other = true
    }
  }

  university() {
    this.userservice.university().subscribe(data => {
      console.log("university", data);
      this.universitys = data['message']
      // this.universitys.push("Others")

    })
  }

  toggle(e) {
    console.log(e)
    this.currentStatus = e;
    this.employee = this.student = this.un_employee = false
    if (e == 'employee') {
      this.employee = true

      this.model["college_address"] = ""
      this.model["course"] = ""
      // this.model["name_of_college"] = []
    }
    else if (e == "un_employee") {
      this.un_employee = true
    }
    else {
      this.student = true
      this.model["name_of_organization"] = ""
      this.model["organization_address"] = ""
      // this.model["pan_card_number"] = ""
    }

  }

  cancel() {
    this.router.navigate(['../user-dashboard'])
  }

  onSubmit() {
    // console.log('model', this.model);
    let sendData = {}
    console.log("this.currentStatus", this.currentStatus)
    sendData["application_no"] = this.application_id
    if (this.currentStatus == 'employee') {
      sendData['purpose_for_authentication'] = this.model["purpose_for_authentication"]
      sendData['designation'] = "self-employee"
      sendData['name_of_organization'] = this.model["name_of_organization"]
      sendData['organization_address'] = this.model["organization_address"]
      // sendData['pan_card_number'] = this.model["pan_card_number"]

    }
    else if (this.currentStatus == "un_employee") {
      sendData['designation'] = "unemployed"
      sendData['year_of_passing'] = this.model['year_of_passing']
      sendData['course'] = this.model['course']
      sendData['college_address'] = 'mumbai'//this.model['college_address']
      sendData['purpose_for_authentication'] = this.model['purpose_for_authentication']

      if (this.model['name_of_college'] == "Other") {
        sendData['name_of_college'] = this.model['Others']
      } else {
        sendData['name_of_college'] = this.model["name_of_college"]
      }
    }
    else {
      sendData['designation'] = "student"
      sendData['purpose_for_authentication'] = this.model["purpose_for_authentication"]
      sendData['college_address'] = this.model["organization_address"]
      sendData['course'] = this.model["course"]

      if (this.model['name_of_college'] == "Other") {
        sendData['name_of_college'] = this.model['Others']
      } else {
        sendData['name_of_college'] = this.model["name_of_college"]
      }

    }

    console.log("sendData", sendData);
    this.ngxService.start();
    this.userservice.currentinfo(sendData).subscribe(data => {
      let status = null
      try { status = data['message']['status'] } catch (e) { }

      console.log('status', status);
      if (this.userservice.home(status)) {
        console.log("currentinfo", data);
        sessionStorage.setItem('five', 'done');
        this.router.navigate(['user-upload-documents'])
        this.ngxService.stop();
      }
    })
  }

  ngDoCheck() {
    this.font(this.message)
    this.backGround(this.bg)
    this.setLanguage(this.language)
  }


  font(session) {
    let font = this.userservice.fontSet(session)
    // console.log('font', font)
    this.ft_sm = font.ft_sm
    this.ft_md = font.ft_md
  }

  backGround(bg) {
    let bg_color = this.userservice.backGround(bg)
    this.bg_color = bg_color['bg_color']
    this.setTxt = bg_color['setTxt']
    this.continue = bg_color['continue']
    this.diff = bg_color['diff']
  }

  setLanguage(language) {
    this.lan = this.userservice.setLanguage(language)
  }


}

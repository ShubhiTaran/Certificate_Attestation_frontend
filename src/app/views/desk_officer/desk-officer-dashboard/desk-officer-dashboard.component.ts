import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-desk-officer-dashboard',
  templateUrl: './desk-officer-dashboard.component.html',
  styleUrls: ['./desk-officer-dashboard.component.scss']
})
export class DeskOfficerDashboardComponent implements OnInit {

  public userName: String
  public setClass = []
  public txtDeslect = []
  correctionCount: any
  totalApplications: Number
  approvedCount: Number
  rejectedCount: Number
  pendingCount: Number
  empty: Boolean
  data = []
  page = 1
  pageSize = 5
  message: any;
  bg: any;
  language: any;
  ft_sm: any;
  ft_md: any;
  bg_color: any;
  lan: any;
  setTxt: any;
  bg_diff: any;
  diff: any;

  constructor(public userService: UserService, private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.totalApplication()
  }

  ngDoCheck() {
    this.font(this.message)
    this.backGround(this.bg)
    this.setLanguage(this.language)
  }

  font(session) {
    let font = this.userService.fontSet(session)
    // console.log('font', font)
    this.ft_sm = font.ft_sm
    this.ft_md = font.ft_md
  }

  backGround(bg) {
    let bg_color = this.userService.backGround(bg)
    this.bg_color = bg_color['bg_color']
    this.setTxt = bg_color['setTxt']
    this.diff = bg_color['diff']
    this.bg_diff = bg_color['bg_diff']

  }

  setLanguage(language) {
    this.lan = this.userService.setLanguage(language)
  }

  home() {
    this.router.navigate(['../desk-officer-dashboard']);
  }

  totalApplication() {
    this.setClass = this.txtDeslect = Array(5).fill(true)
    this.setClass[0] = this.txtDeslect[0] = false
    this.allRequests()
  }

  approved() {
    this.setClass = this.txtDeslect = Array(5).fill(true)
    this.setClass[1] = this.txtDeslect[1] = false
    this.approvedRequests()
  }

  rejected() {
    this.setClass = this.txtDeslect = Array(5).fill(true)
    this.setClass[2] = this.txtDeslect[2] = false
    this.rejectedRequests()
  }

  pending() {
    this.setClass = this.txtDeslect = Array(5).fill(true)
    this.setClass[3] = this.txtDeslect[3] = false
    this.listOfRequests()
  }





  allRequests() {
    this.userService.allRequests()
      .subscribe((result) => {
        let status = null
        try { status = result['message']['status'] } catch (e) { }

        console.log('status', status);
        if (this.userService.home(status)) {

          console.log("result of data", result)
          try {
            let data = result["All request details"]
            this.totalApplications = data.length
            this.data = data
            this.empty = true
            console.log("result", result)
          }
          catch (error) {
            this.empty = false
            this.totalApplications = 0
          }

        }
      },
        error => {
          console.log("getDatesError", error);
        })
  }

  approvedRequests() {

    this.userService.approvedRequests().subscribe((result) => {
      let status = null
      try { status = result['message']['status'] } catch (e) { }

      console.log('status', status);
      if (this.userService.home(status)) {

        try {
          let data = result["All request details"]
          this.approvedCount = data.length
          this.data = data
          this.empty = true
          console.log("result", result)
        }
        catch (error) {
          this.empty = false
          this.approvedCount = 0
        }
      }
    },
      error => {
        console.log("approvedRequestsError", error);
      })
  }

  rejectedRequests() {
    this.userService.rejectedRequests().subscribe((result) => {
      let status = null
      try { status = result['message']['status'] } catch (e) { }

      console.log('status', status);
      if (this.userService.home(status)) {
        console.log("result", result)
        try {
          let data = result["All request details"]
          this.rejectedCount = data.length
          this.data = data
          this.empty = true
          console.log("result", result)
        }
        catch (error) {
          this.empty = false
          this.rejectedCount = 0
        }
      }
    },
      error => {
        console.log("rejectedRequestsError", error);
      })
  }

  // bending request
  listOfRequests() {
    this.userService.listOfRequests().subscribe((result) => {
      let status = null
      try { status = result['message']['status'] } catch (e) { }

      console.log('status', status);
      if (this.userService.home(status)) {
        try {
          let data = result["All request details"]
          this.pendingCount = data.length
          this.data = data
          this.empty = true
          console.log("result", result)
        }
        catch (error) {
          this.empty = false
          this.pendingCount = 0
        }
      }
    },
      error => {
        console.log("listOfRequestsError", error);
      })
  }

  correctionRequests() {
    this.setClass = this.txtDeslect = Array(5).fill(true)
    this.setClass[4] = this.txtDeslect[4] = false
    this.userService.correctionRequests().subscribe((result) => {
      let status = null
      try { status = result['message']['status'] } catch (e) { }

      console.log('status', status);
      if (this.userService.home(status)) {
        try {
          let data = result["All request details"]
          this.correctionCount = data.length
          this.data = data
          this.empty = true
          console.log("result", result)
        }
        catch (error) {
          this.empty = false
          this.correctionCount = 0
        }
      }
    })
  }

  viewDetails(application_no, status) {
    console.log("application_no", application_no)
    sessionStorage.setItem('application_no', application_no);
    sessionStorage.setItem('status', status);
    this.router.navigate(['../do-view-details'])
  }


}
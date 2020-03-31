import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-do-ds-dashboard',
  templateUrl: './admin-do-ds-dashboard.component.html',
  styleUrls: ['./admin-do-ds-dashboard.component.scss']
})
export class AdminDODSDashboardComponent implements OnInit {

  public userName: String
  public setClass = []
  public txtDeslect = []
  totalApplications: Number
  approvedCount: Number
  rejectedCount: Number
  pendingCount: Number
  empty: Boolean
  data: any
  page = 1
  pageSize = 5

  ft_md:string 
  ft_sm:string 
  bg_color:string 
  public message:any
  public bg:any 
  public setTxt:any 
  language:string
  continue: any;
  lan: any;
  diff: any;

  constructor(public userService: UserService, private router: Router,
     private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.totalApplication()
  }

  home() {
    this.router.navigate(['../admin-dashboard']);
  }

  totalApplication() {
    this.setClass = this.txtDeslect = Array(5).fill(true)
    this.setClass[0] = this.txtDeslect[0] = false
    this.getDeskofficer()
  }

  approved() {
    this.setClass = this.txtDeslect = Array(5).fill(true)
    this.setClass[1] = this.txtDeslect[1] = false
    this.getDeputySecretary()
  }

  getDeskofficer() {
    this.userService.getDeskofficer()
      .subscribe((result) => {
        let status = null
        try{ status = result['message']['status']} catch(e){}
  
        console.log('status', status);
        if (this.userService.home(status)) {
        console.log(result)
        try {
          let data = result
          this.totalApplications = data['length']
          this.data = data
          this.empty = true
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

  removeUser(_id, user_type) {

    console.log("_id", _id, "user_type", user_type)
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this account',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
     
      if (result.value) {
        this.userService.removeUser({ _id, user_type })
          .subscribe((result) => {
            console.log("result", result)
            let status = null
            try{ status = result['message']['status']} catch(e){}
      
            console.log('status', status);
            if (this.userService.home(status)) {
            console.log("result", result);
            Swal.fire("", "Removed form the list.");
            if(user_type == "deskofficer"){
              this.getDeskofficer()
            }
            else{
              this.getDeputySecretary()
            }
          }
          })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire(
        //   'Cancelled',
        //   'Your account is safe :)',
        //   'error'
        // )
      }
    
    })

  }

  changeUserType(event){
    if(event == "user"){
      this.router.navigate(['../admin-dashboard']);
    }
   }

  getDeputySecretary() {
    this.userService.getDeputySecretary().subscribe((result) => {
      let status = null
      try{ status = result['message']['status']} catch(e){}

      console.log('status', status);
      if (this.userService.home(status)) {
      try {
        let data = result
        this.approvedCount = data["length"]
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



  viewDetails(application_no) {
    sessionStorage.setItem('application_no', application_no);
    console.log("application_no", application_no)
    this.router.navigate(['../do-view-details'])
  }

  ngDoCheck(){
    this.font(this.message)
    this.backGround(this.bg)
    this.setLanguage(this.language)
 }

  font(session){
    let font = this.userService.fontSet(session)
    this.ft_sm = font.ft_sm
    this.ft_md = font.ft_md
   }
 
   backGround(bg){
    let bg_color = this.userService.backGround(bg)
    this.bg_color = bg_color['bg_color']
    this.setTxt = bg_color['setTxt']
    this.continue = bg_color['continue']
    this.diff = bg_color['diff']
  }

  setLanguage(language){
    this.lan = this.userService.setLanguage(language)
  }



}

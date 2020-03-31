import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-head',
  templateUrl: './user-head.component.html',
  styleUrls: ['./user-head.component.scss']
})
export class UserHeadComponent implements OnInit {

  @Input() public userName;
  @Input() public _id;
  @Input() public pgName;
  @Input() public message;
  @Input() public bg;
  @Input() public language;

  app_message: string
  addAppHide: boolean = true
  ft_md: string = "ft-md"
  ft_sm: string = "ft-sm"
  ft_xl: string = "ft-xl"
  bg_color: string = "bg-blues"
  lan: any
  obj: any;
  continue: any;
  diff: any;
  // public message: any

  constructor(private router: Router, private route: ActivatedRoute,
    private userservice: UserService) { }

  ngOnInit() {
 
    this.parmas()
    this.applicationHide()
  }

  parmas() {
    this.userName = sessionStorage.getItem('userName');
    this._id = sessionStorage.getItem('_id');
    this.obj = sessionStorage.getItem('application_no');

    // this.route.queryParams.subscribe(params => {
    //   this.userName = params.userName;
    //   this._id = params._id;
    //   this.obj = params.application_no;
    // });
  }

  applicationHide() {
    let sendData = { _id: this._id }

    console.log("sendData", sendData)
    this.userservice.getapplications(sendData).subscribe(data => {
      let status = null
      try { status = data['message']['status'] } catch (e) { }
      console.log('status', status);
      if (this.userservice.home(status)) {
        try {
          let getData = data['All_request_details']
          // console.log("getData", getData)
          getData.map((obj) => {
            let application_status = obj.application_status
            if (application_status != "Closed") {
              this.addAppHide = true
            }
            else{
              this.addAppHide = false
            }
          })
        }
        catch (error) {
          this.addAppHide = false
          console.log("error", error)
        }
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
    this.ft_xl = font.ft_xl
  }


  navigate(nav){
    this.router.navigate([nav])
  }

  backGround(bg) {
    let bg_color = this.userservice.backGround(bg)
    this.bg_color = bg_color['bg_color']
    // this.setTxt = bg_color['setTxt']
    this.continue = bg_color['continue']
    this.diff = bg_color['diff']
  }

  setLanguage(language) {
    this.lan = this.userservice.setLanguage(language)
  }

  addApplication() {

    // this.router.navigate(['user-disclimer'], 
    //       { queryParams: { _id: this._id,"userName": this.userName } })

    localStorage.setItem('lastPageNumber', '1');
    sessionStorage.setItem('addAppHide', 'hide')
    this.addAppHide = true
    this.userservice.newappli({ _id: this._id }).subscribe(res => {

      let status = null
      try { status = res['message']['status'] } catch (e) { }

      console.log('status', status);
      if (this.userservice.home(status)) {

        console.log('res', res)
        let status = res['message']['status']
        console.log('status', status);
        if (this.userservice.home(status)) {
          var response = JSON.parse(JSON.stringify(res)).message;  //userId
          console.log("response of the message id", response)
          sessionStorage.setItem('application_no', response);
          this.router.navigate(['user-appl-form'])
        }
      }

    })
  }


}

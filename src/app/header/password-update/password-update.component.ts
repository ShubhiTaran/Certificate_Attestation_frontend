import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.scss']
})
export class PasswordUpdateComponent implements OnInit {

  @Input() public pageLink;
  model:any ={}
  language: string
  ft_md: string
  ft_sm: string
  bg_color: string
  lan: any
  public message: any
  public bg: any
  ft_xl: any;
  diff: any;
  continue: any;
  passwordStrenth: boolean = true
  passwordMatch: boolean = true
  userName: any;
  _id: any;

  constructor(private userservice:UserService,  public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.tokenChk();
  
  }



  tokenChk(){
    if(!sessionStorage.getItem('token')){
      this.router.navigate(['dashboard'])
      return
    } 
  }

dashboard(){
  this.router.navigate([this.pageLink]);
}
  
  onSubmit(){
    let model = this.model;
    let user_id = sessionStorage.getItem('_id')
    let sendData = {
      user_id : user_id,
      old_password : model.old_password ,
      new_password :model.new_password 
    }
    console.log("sendData", sendData)
    this.userservice.changePassword(sendData).subscribe(result => {
      let status = null
      try { status = result['message']['status'] } catch (e) { }
      console.log('status', status);

      if (this.userservice.home(status)) {
        let message = result['message'];
        console.log("message", message)
        if(message == "success"){
        Swal.fire("", "Successfully Updated.")
        this.dashboard()
        }
        else{
          Swal.fire('', message)
        }
      }
    })
  }

  ngDoCheck() {
    this.font(this.message)
    this.backGround(this.bg)
    this.setLanguage(this.language)
  }

  password_chk() {
    // let str = this.model.new_password
    // let string = str.split('')
    // let caps = false
    // let small = false
    // let number = false
    // let spl = false

    // let status = false

    // string.map((val) => {
    //   let ascii = val.charCodeAt(0);
    //   if (ascii >= 97 && ascii <= 122) {
    //     caps = true
    //   }
    //   if (ascii >= 65 && ascii <= 90) {
    //     small = true
    //   }
    //   if (ascii >= 48 && ascii <= 57) {
    //     number = true
    //   }
    //   var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    //   if (format.test(str)) {
    //     spl = true
    //   }
    //   if (caps && small && number && spl) {
    //     status = true
    //   }
    // })
    // this.passwordStrenth = status

  }

  confirm_password_() {
    let password = this.model.new_password;
    let confirm_password = this.model.confirm_password;
    if (password != confirm_password) {
      this.passwordMatch = false
    }
    else {
      this.passwordMatch = true
    }
  }

   font(session) {
    let font = this.userservice.fontSet(session)
    //  console.log('font', font)
    this.ft_sm = font.ft_sm
    this.ft_md = font.ft_md
    this.ft_xl = font.ft_xl
  }
  
  backGround(bg) {
    // console.log("background", bg)
    let bg_color = this.userservice.backGround(bg)
    this.bg_color = bg_color['bg_color']
    this.diff = bg_color['diff']
    this.continue = bg_color['continue']
  }
  
  setLanguage(language) {
    this.lan = this.userservice.setLanguage(language)
  }

}

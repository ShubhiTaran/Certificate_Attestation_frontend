import { Component, OnInit, Renderer2 } from '@angular/core';
import { UserService } from '../../user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.scss']
})
export class HelpCenterComponent implements OnInit {

  ft_md: string 
  ft_sm: string 
  ft_xl: string 
  bg_color: string 
  lan: any
  message: any;
  bg: any;
  language: any;
  setTxt: any;
  diff: any;
  continue: any;
  model: any = {};
  selectedFile: File = null;
  imgName: string = "Choose file"

  constructor(private userservice: UserService,  public router: Router,
    public userService: UserService, private ngxService: NgxUiLoaderService,
    private renderer: Renderer2,) { }

  ngOnInit() {
  }

  onSubmit(){
    let model = this.model;
    let sendData = {}
    sendData['email_id'] = model.emial_id;
    sendData['contact_no'] = model.contact_no;
    sendData['subject'] =  model.subject;
    sendData['message'] = model.message;

     console.log("sendData", sendData)
     this.ngxService.start();
    this.userService.communication(sendData).subscribe((result) => {
      let status = null
      try{ status = result['message']['status']} catch(e){}
      console.log('status', status);
      if (this.userService.home(status)) {
        console.log("result", result)
        let message = result['message']
        if(message == "Success"){
          Swal.fire("", "Message send successfully.")
          this.router.navigate(['dashboard'])
          this.ngxService.stop();
        }
        else{
          Swal.fire("",message)
          this.ngxService.stop();
        }
      }
    })
  }

  phone_number() {
    let getdata = this.model.contact_no;
    (getdata == undefined) ? (getdata = "") :
      (getdata.length > 10) ? (this.model.contact_no = getdata.substring(0, 10)) :
        this.model.contact_no = getdata.replace(/\D/g, "");
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    const mimeType = this.selectedFile['type']
    if (mimeType.match(/image\/*/) == null && mimeType.match(/pdf\/*/) == null) {
      Swal.fire('', 'Images or Pdf only supported.')
      return
    }
    // // console.log(this.selectedFile)
    let imgName = this.selectedFile['name']
    this.imgName = imgName.substring(imgName.length - 15)
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

  backGround(bg){
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

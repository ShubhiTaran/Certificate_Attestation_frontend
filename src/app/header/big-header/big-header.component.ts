import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-big-header',
  templateUrl: './big-header.component.html',
  styleUrls: ['./big-header.component.scss']
})
export class BigHeaderComponent implements OnInit {

  @Input() public number;
  @Input() public application_id;
  @Input() public _id;
  @Input() public userName;
  setClass = []
  setColor = []
  stop: any

  bg: any;
  language: any;
  ft_sm: any;
  ft_md: any;
  bg_color: any;
  setTxt: any;
  continue: any;
  lan: any;
  message: any;
  behalf: boolean;
  foure_no = 4
  five_no = 4
  six_no = 5
  
 


  constructor(private router: Router, private route: ActivatedRoute,
     private userservice: UserService) { }

  ngOnInit() {



    let lastPageNumber = localStorage.getItem('lastPageNumber')
    if(this.number > lastPageNumber){
      localStorage.setItem('lastPageNumber', this.number)
    }
    this.chkPage();
    this.stop = localStorage.getItem('lastPageNumber')
    console.log('stop', this.stop);
    this.showData()
    this.setStop()
    this.classSet()

  }

  chkPage(){

    console.log('this.number', this.number, 'done', sessionStorage.getItem('three'));
    if(sessionStorage.getItem('one') != 'done' && this.number > 1){
      localStorage.setItem('lastPageNumber', '1')
      this.router.navigate(['user-appl-form']);
      console.log("inside one");
    }
    else if(sessionStorage.getItem('two') != 'done' && this.number > 2){
      localStorage.setItem('lastPageNumber', '2')
      this.router.navigate(['user-passport-details']);
      console.log("inside two");
    }
    else if(sessionStorage.getItem('three') != 'done' && this.number > 3){
      localStorage.setItem('lastPageNumber', '3')
      this.router.navigate(['user-contact-details']);
      console.log("inside three");
    }
    else if(sessionStorage.getItem('foure') != 'done' && this.number > 4){
      localStorage.setItem('lastPageNumber', '4')
      this.router.navigate(['user-guarantor-details']);
      console.log("inside foure");
    }
    else if(sessionStorage.getItem('five') != 'done' && this.number > 5){
      localStorage.setItem('lastPageNumber', '5')
      this.router.navigate(['user-current-designation']);
      console.log("inside five");
    }
  }

  classSet() {
    let qred = "setTxt_select"
    let enable = "setRound txt-white d-flex justify-content-center align-items-center"
    let arr = Array(20).fill('')
    arr.map((val, index) => {
      if (this.number == index) {
        this.setClass[index] = enable
        this.setColor[index] = qred
      }
    })
  }

  setStop() {
    let blue = "setTxt"
    let black = "setTxt_disable"
    let disable = "setRound_dis txt-white d-flex justify-content-center align-items-center"
    let enable = "setRound txt-white d-flex justify-content-center align-items-center"
    let arr = Array(20).fill('')
    arr.map((val, index) => {
      if (this.stop >= index) {
        this.setClass.push(enable)
        this.setColor.push(blue)

      }
      else {
        this.setClass.push(disable)
        this.setColor.push(black)
      }
    })

    // console.log('setClass', this.setClass);

  }

  one() {
    if (this.stop > 0) {
      // alert(this.stop)      
      this.router.navigate(['user-appl-form']);
    }
  }

  two() {
    if (this.stop > 1) {
      // alert(this.stop)
      this.router.navigate(['user-passport-details']);
    }
  }

  three() {
    if (this.stop > 2) {
      // alert(this.stop)
      this.router.navigate(['user-contact-details']);
    }
  }

  foure() {
    if (this.stop > 3) {
    this.router.navigate(['user-guarantor-details']);
  }
}

  five() {
    if (this.stop > 4) {
    this.router.navigate(['user-current-designation']);
  }
  }
  six() {
    if (this.stop > 5) {
    this.router.navigate(['user-upload-documents']);
  }
}

showData() {
  let applicant_type = localStorage.getItem('applicant_type')
  console.log('applicant_type', applicant_type)
  if(applicant_type == 'behalf'){
    // alert('behalf')
    this.behalf = true
    this.foure_no = 4
    this.five_no = 5
    this.six_no = 6
  }
  }

ngDoCheck(){
  this.font(this.message)
  this.backGround(this.bg)
  this.setLanguage(this.language)
}


font(session){
  let font = this.userservice.fontSet(session)
  // console.log('font', font)
  this.ft_sm = font.ft_sm
  this.ft_md = font.ft_md
 }

 backGround(bg){
  let bg_color = this.userservice.backGround(bg)
  this.bg_color = bg_color['bg_color']
  this.setTxt = bg_color['setTxt']
  this.continue = bg_color['continue']
}

setLanguage(language){
  this.lan = this.userservice.setLanguage(language)
}


}

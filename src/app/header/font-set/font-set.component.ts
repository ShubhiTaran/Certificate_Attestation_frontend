import { Component, OnInit, Output, EventEmitter, Renderer2 } from '@angular/core';
import { UserService } from '../../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-font-set',
  templateUrl: './font-set.component.html',
  styleUrls: ['./font-set.component.scss']
})
export class FontSetComponent implements OnInit {

  @Output() public childEvent = new EventEmitter();
  @Output() public bg = new EventEmitter();
  @Output() public language = new EventEmitter();
  public identifiLan:string 
  setTxt: string;
  public a:string = 'A'
  diff: any;
  bg_color:any;
  url: string;
  isDashboard: boolean;

  constructor(public userService: UserService,private router:Router, private route:ActivatedRoute,
     private renderer: Renderer2,) { }

  ngOnInit() {
    this.childEvent.emit(sessionStorage.getItem('font'));
    this.bg.emit(sessionStorage.getItem('bg'))
    this.language.emit(sessionStorage.getItem('language'))
    this.identifiLan = sessionStorage.getItem('language')
    // this.languages(sessionStorage.getItem('language'))
    if(!this.identifiLan) { this.identifiLan = 'english'}
    this.languages(this.identifiLan)
    this.pageIdentification()
  }

  ngDoCheck(){
    this.backGround_(null)
  }

  font() {
    sessionStorage.setItem('font', "0")
    console.log('globalFont', sessionStorage.getItem('font'))
  }

  fireEvent() {
  
  }

  subtract() {
    // this.fireEvent()
    let session = Number(sessionStorage.getItem('font'))
    if (session == -4) {
      return
    }
    session = (session - 1)
    sessionStorage.setItem('font', session.toString())
    console.log('mainPageSession', session)
    this.childEvent.emit(session);
    // window.location.reload()
  }

  add() {
    let session = Number(sessionStorage.getItem('font'))

    if (session == 4) {
      return
    }
    session = (session + 1)
    sessionStorage.setItem('font', session.toString())
    console.log('mainPageSession', session)
    this.childEvent.emit(session);
    // window.location.reload()
  }

  nutral(){
    sessionStorage.setItem('font', '0')
    this.childEvent.emit(0);
  }

  background(color){
    this.bg.emit(color)
    sessionStorage.setItem('bg', color)
  }

  pageIdentification() {
    this.url = window.location.href
    let split = this.url.split('/')
    let isDashboard = false
    split.map((val) => {
      if (val == "dashboard" || val == "forgot-pass" || val == "email-otp" ) {
        isDashboard = true
      }
    })
    if(this.url.includes("reset-pass")){
      isDashboard = true
    }
    this.isDashboard = isDashboard;
  }

  backGround_(bg){
    let bg_color = this.userService.backGround(bg)
    this.setTxt = bg_color['setTxt']
    this.diff = bg_color['diff']
    this.bg_color = bg_color['bg_color']

    if(this.bg_color == 'bg-blues'){
      this.renderer.addClass(document.body, 'body-white');
      this.renderer.removeClass(document.body, 'body-black');
    }
    else{
      this.renderer.removeClass(document.body, 'body-white');
      this.renderer.addClass(document.body, 'body-black');
    }

    if(this.isDashboard){
      this.diff = 'txt-white'
    }

  }
  

  languages(language){
    this.identifiLan = language
    this.language.emit(language)
     sessionStorage.setItem('language', language)
    
     if(language == 'english'){
      this.a = 'A'
     }
     else{
      this.a = 'अ'
     }
   
  }

  search(search_val){
    // console.log("search_val", search_val);
    localStorage.setItem("search", search_val)
    // let url =  window.location.href
    this.urlSet()
   
  }

 urlSet(){
   let url = window.location.href
  let split = url.split('/')
  let condition = false;
  split.map((val) => {
    console.log(val)
    if ( val == "search" || val == "do-search" || val == "ds-search"  || val == "admin-search") {
      condition = true
    }
  })
  if(!condition){
    // alert()
    localStorage.setItem('url', url)
  }
  this.router.navigate(['../chk']);
 }


}



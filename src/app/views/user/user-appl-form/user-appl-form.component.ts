import {
  Component,
  OnInit
} from '@angular/core';
import * as $ from 'jquery';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  DomSanitizer
} from '@angular/platform-browser';
import {
  HttpClient,
  HttpEventType
} from '@angular/common/http';
import {
  FormGroup,
  FormBuilder,
  NgForm,
  Validators
} from '@angular/forms';
import {
  UserService
} from '../../../user.service';
import {
  DAMService
} from '../../../dam.service';
// import { NgbDatepickerKeyMapService } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-keymap-service';
import { User } from '../../../user';
import Swal from 'sweetalert2'
import { NgxUiLoaderService } from 'ngx-ui-loader';
// import { Logs } from 'selenium-webdriver';
import { environment } from '../../../../environments/environment.prod'
// import { LiveAnnouncer } from '@angular/cdk/a11y';


@Component({
  selector: 'app-user-appl-form',
  templateUrl: './user-appl-form.component.html',
  styleUrls: ['./user-appl-form.component.scss']
})
export class UserApplFormComponent implements OnInit {
  select: String;
  valid_yes = true;
  valid_no = false;
  urlLink = environment.apiURL
  contactForm: FormGroup;
  app_form_data: string;
  submitted = false;
  selectedFile: any = null;
  public imagePath;
  imgURL: any = "assets/img/shape.png"
  api: any = []
  myId: any
  contactForms: any
  response1: any
  userName: any
  img_error: any
  _id: any
  public message: string;
  public serverData: any;
  verifyStatus: string;
  applicant_type: string
  data: any;
  appli_form: string;
  image_message: string;
  application_id: any
  date_of_birth: Date ;
  ageStatus: boolean = false
  bg: any;
  language: any;
  ft_sm: any;
  ft_md: any;
  bg_color: any;
  setTxt: any;
  continue: any;
  lan: any;
  diff: any;


  constructor(private formBuilder: FormBuilder, private userservice: UserService,
    private ngxService: NgxUiLoaderService, private dService: DAMService,
    private router: Router, private route: ActivatedRoute, private http: HttpClient) { }


  ngOnInit() {
    // alert()
    this.ngxService.start();
    this.ngxService.stop();
    
    localStorage.setItem('lastPage', '1')
    var test = this.application_id = sessionStorage.getItem('application_no');
    this.data = this._id = sessionStorage.getItem('_id');

    // this.dService.getform1().subscribe(data => {
    //   response=JSON.parse(JSON.stringify(data))
    //   console.log("appli",response)
    // });

    // console.log("message test", test);
    // console.log("undefined", this.contactForm);
    this.contactForm = this.formBuilder.group({
      relationship_with_applicant: ""
    });

    $("input[type='image']").click(function () {
      $("input[id='my_file']").click();
    });

    if (this.contactForm.value.applicant_type == "behalf") {
      alert("inside the behalf")
      this.contactForm = this.formBuilder.group({
        applicant_type: ['', Validators.required],
        full_name: ['', Validators.required],
        sex: ['', Validators.required],
        relationship_with_applicant: [''],
        valid_visa:[''],
        nationality: ['', Validators.required],
        date_of_birth: ['', Validators.required],
        father_name: ['', Validators.required],
        mother_name: ['', Validators.required],
        application_no: test

      });
    } else if(this.contactForm.value.applicant_type == "foreigner"){
      this.contactForm = this.formBuilder.group({
        applicant_type: ['', Validators.required],
        full_name: ['', Validators.required],
        sex: ['', Validators.required],
        relationship_with_applicant: [''],
        valid_visa:['',Validators.required],
        nationality: ['', Validators.required],
        date_of_birth: ['', Validators.required],
        father_name: ['', Validators.required],
        mother_name: ['', Validators.required],
        application_no: test

      });
    }
    else {
      this.contactForm = this.formBuilder.group({

        applicant_type: ['', Validators.required],
        full_name: ['', Validators.required],
        sex: ['', Validators.required],
        relationship_with_applicant: [''],
        valid_visa:[''],
        nationality: ['', Validators.required],
        date_of_birth: ['', Validators.required],
        father_name: ['', Validators.required],
        mother_name: ['', Validators.required],
        application_no: test

      });
    }

    this.userservice.apiscountry().subscribe(data => {
      let status = null
      try { status = data['message']['status'] } catch (e) { }

      console.log('status', status);
      if (this.userservice.home(status)) {
        this.api = data
        console.log("data of some country coc", this.api)
      }
    })
    this.showData()
     
  }


  contactDetail() {
    let _id = this._id
    this.userservice.getUserProfile(_id).subscribe(
      res => {
        let status = null
        try { status = res['message']['status'] } catch (e) { }

        console.log('status', status);
        if (this.userservice.home(status)) {

          let data = res['message'][0]
          console.log("result", data)

          this.contactForm.get('full_name').setValue(data['first_name'] + data['middle_name'] + data['last_name']);
          this.date_of_birth = data['dob'] //'2018-02-01'
          this.contactForm.get('nationality').setValue(data['nationality']);

          this.contactForm.get('sex').setValue(data['gender']);
          this.contactForm.get('valid_visa').setValue('Yes');
          
        }
      });
  }

  showData() {
    this.userservice.getPersonalInfo({ 'application_no': this.application_id })
      .subscribe(async data => {

        let status = null
        try { status = data['message']['status'] } catch (e) { }

        console.log('status', status);
        if (this.userservice.home(status)) {
        }

        console.log("getPersonalInfo", data)
        let getKey = Object.keys(data)
        if (getKey.length > 0) {
          localStorage.setItem('applicant_type', data['applicant_type'])
          this.contactForm.get('applicant_type').setValue(data['applicant_type']);
          this.contactForm.get('full_name').setValue(data['full_name']);
          this.contactForm.get('sex').setValue(data['sex']);
          if (data["applicant_type"] == "behalf") {
            this.contactForm.get('relationship_with_applicant').setValue(data['relationship_with_applicant']);
          }
          if (data["applicant_type"] == "foreigner") {
            this.contactForm.get('valid_visa').setValue(data['valid_visa']);
            const valid_visa = data['valid_visa'];
            if(valid_visa){
              if(valid_visa == 'Yes')
                  this.valid_yes = true;
              else
                  this.valid_no = true; 
            }
            console.log(data['valid_visa'])
          }
          this.date_of_birth = data['date_of_birth'] //'2018-02-01'
          this.contactForm.get('nationality').setValue(data['nationality']);
          // this.contactForm.get('date_of_birth').setValue('2018-02-01');
          this.contactForm.get('father_name').setValue(data['father_name']);
          this.contactForm.get('mother_name').setValue(data['mother_name']);

          var MY_URL = data['personal_photo']
          var setUrl = this.imgURL = `${this.urlLink}/${MY_URL}`
          let getFile = await createFile();
          this.selectedFile = getFile
  
        }
        else {
          this.contactDetail()
        }

        async function createFile() {
          let response = await fetch(setUrl);
          let data = await response.blob();
          let metadata = {
            type: 'image/jpeg'
          };
          let file = new File([data], "img1.png", metadata);
          console.log("file", file);
          return file
        }

        // function urltoFile(url, filename, mimeType) {
        //   return (fetch(url)
        //     .then(function (res) { return res.arrayBuffer(); })
        //     .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
        //   );
        // }

      })
  }


  async onFileSelected(event) {

    this.selectedFile = <File>event.target.files[0];

    if (this.selectedFile) {
      this.image_message = this.lan.updated
      this.img_error = ""
    } else {
      this.image_message = ""
    }
  }

  preview(files) {
    console.log("files", files);

    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    console.log("mimeType", mimeType);

    if (mimeType.match(/image\/*/) == null) {
      let message = "Only images are supported.";
      this.image_message = ""
      this.selectedFile = null
      Swal.fire('', message)
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      sessionStorage.setItem('userImg', this.imgURL)
    }
    console.log("imgUrl", this.imgURL);

  }

  reset() {
    this.contactForm.get('applicant_type').setValue("");
    this.contactForm.get('full_name').setValue("");
    this.contactForm.get('sex').setValue("");
    this.contactForm.get('relationship_with_applicant').setValue("");
    this.contactForm.get('nationality').setValue("");
    this.contactForm.get('date_of_birth').setValue("");
    this.contactForm.get('father_name').setValue("");
    this.contactForm.get('mother_name').setValue("");
    this.contactForm.get('valid_visa').setValue("");
    // var MY_URL = ""
    // var setUrl =  this.imgURL = "" // `${this.urlLink}/${MY_URL}`
    // let getFile = await createFile();
    // this.selectedFile = getFile
    // console.log("this.selectFile", this.selectedFile);
    // this.img_error = "please upload the Image"
  }

  get f() {
    return this.contactForm.controls;
  }

  ageChk(date) {
    console.log("date", date)
    let day = new Date(date).getMonth()
    let month = new Date(date).getMonth()
    let year = new Date(date).getFullYear()
    this.ageStatus = new Date(year + 18, month - 1, day) <= new Date();
    console.log("ageStatus", this.ageStatus)
  }

  hello() {
    console.log("hello")
  }

  passportDetails() {

    this.submitted = true
    console.log("personal Details", this.contactForm.value);



    this.ageChk(this.contactForm.value.date_of_birth)

    if (this.contactForm.invalid || this.selectedFile == null) {

      if (this.selectedFile == null) {
        this.img_error = this.lan.img_error
      }
      return
    }

    if (!this.ageStatus) {
      return
    }

    if (this.contactForm.value.applicant_type != "behalf") {
      this.contactForm.get('relationship_with_applicant').setValue("_");
    }

    if (this.contactForm.value.applicant_type != "foreigner") {
      this.contactForm.get('valid_visa').setValue("_");
    }


    const formData = new FormData();
    localStorage.setItem('applicant_type', this.contactForm.value.applicant_type)
    formData.append('applicant_type', this.contactForm.value.applicant_type)
    formData.append('application_no', this.contactForm.value.application_no)
    formData.append('father_name', this.contactForm.value.father_name)
    formData.append('mother_name', this.contactForm.value.mother_name)
    formData.append('full_name', this.contactForm.value.full_name)
    formData.append('sex', this.contactForm.value.sex)
    formData.append('relationship_with_applicant', this.contactForm.value.relationship_with_applicant)
    formData.append('valid_visa', this.contactForm.value.valid_visa)
    formData.append('nationality', this.contactForm.value.nationality)
    formData.append('date_of_birth', this.contactForm.value.date_of_birth)
    console.log("personal details======>", this.contactForm.value);

    formData.append('personal_photo', this.selectedFile, this.selectedFile.name);
    // this.ngxService.start();
    console.log('form data ', formData)
    this.userservice.personaldetails(formData).subscribe(data => {

      let status = null
      try { status = data['message']['status'] } catch (e) { }

      console.log('status', status);
      if (this.userservice.home(status)) {
        var response = JSON.parse(JSON.stringify(data)).message;
        console.log("response of application form", response)
        localStorage.setItem(this.app_form_data, response);

        var response1 = localStorage.getItem(this.app_form_data)

        if (response === 'Oops something went wrong.') {
          // this.ngxService.stop();
          Swal.fire('', response)

        } else {
          // this.ngxService.stop();
          // Swal.fire('', "form has been submitted")
          sessionStorage.setItem('one', 'done')
          this.router.navigate(['user-passport-details'])
        }
        // this.ngxService.stop();
      }
    })


  }

  cancel() {
    this.router.navigate(['../user-dashboard'])
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
  
  toggle(e){
    console.log(e)
    this.contactForm.get('valid_visa').setValue(e);
    if(e == "yes"){
      this.valid_yes = true
    }else{
      this.valid_no = true
    }
  }





}
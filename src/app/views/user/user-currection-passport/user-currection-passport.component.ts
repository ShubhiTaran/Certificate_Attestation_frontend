import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../user.service';
import { DAMService } from '../../../dam.service';
import Swal from 'sweetalert2'
import { environment } from '../../../../environments/environment.prod'
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-user-currection-passport',
  templateUrl: './user-currection-passport.component.html',
  styleUrls: ['./user-currection-passport.component.scss']
})
export class UserCurrectionPassportComponent implements OnInit {


  urlLink = environment.apiURL
  toolTip: string = "Please provide the below information to complete the application form"
  selectedFile: File = null;
  dateStatus: boolean = false
  userName: String
  _id: any
  app_form_data: string;
  collegeList: any = [];
  passportForm: FormGroup;
  submitted = false;
  img_sucess: String
  img_error: String
  data: any;
  application_id: any
  imgURL: any = "assets/img/upload-logo.png"
  imagePath: any;
  message: string;
  setClass: any
  certificate_remark: string
  passport_remark: string
  public passport_expire_date: string

  bg: any;
  language: any;
  ft_sm: any;
  ft_md: any;
  bg_color: any;
  setTxt: any;
  continue: any;
  lan: any;


  constructor(private formBuilder: FormBuilder, private userservice: UserService,
    private ngxService: NgxUiLoaderService, private dService: DAMService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    $("input[type='image']").click(function () {
      $("input[id='my_file']").click();
    });

    var application_no = this.application_id = sessionStorage.getItem('application_no');
    this._id = this.route.snapshot.queryParamMap.get('_id');
    this.certificate_remark = sessionStorage.getItem('certificate_remark');
    this.passport_remark = sessionStorage.getItem('passport_remark');
    console.log("test", this.passport_remark);

    this.passportForm = this.formBuilder.group({

      passport_number: ['', Validators.required],
      passport_issue_place: ['', Validators.required],
      passport_expire_date: ['', Validators.required],
      application_no: application_no,

    });
    this.showData()
  }

  showData() {
    this.userservice.getPassportInfo({ 'application_no': this.application_id })
      .subscribe(async data => {
        console.log("getPassportInfo", data)
        let passport_details = data
        console.log('passport_details', passport_details);

        let getKey = Object.keys(passport_details)


        if (getKey.length > 0) {
          // alert()
          // this.passportForm.get('passport_expire_date').setValue(passport_details['passport_expire_date']);
          this.passportForm.get('passport_issue_place').setValue(passport_details['passport_issue_place']);
          this.passport_expire_date = passport_details['passport_expire_date']
          this.passportForm.get('passport_number').setValue(passport_details['passport_number']);
          var MY_URL = passport_details['passport_photo']

          var setUrl = this.imgURL = `${this.urlLink}/${MY_URL}`
          console.log("setUrl", setUrl);

          this.selectedFile = await createFile()
        }

        async function createFile() {
          let response = await fetch(setUrl);
          let data = await response.blob();
          let metadata = {
            type: 'image/jpeg'
          };
          let file = new File([data], "img1.jpg", metadata);
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

  remark() {
    let sendData = {
      "application_no": this.application_id,
      "passport_photo_remark": null
    }
    console.log("remarkApi", sendData)
    this.userservice.remark(sendData)
      .subscribe((result) => {
        let status = null
        try { status = result['message']['status'] } catch (e) { }

        console.log('status', status);
        if (this.userservice.home(status)) {
          console.log("remarkResult", result)
        }
      })
  }

  cancel() {
    this.router.navigate(['../user-dashboard'])
  }

  goToDocument() {
    //  this.router.navigate(['user-currection'],
    //  { queryParams: { "obj": this.application_id, certificate_remark: this.certificate_remark,
    //   passport_remark: this.passport_remark,
    //  "obja": this._id, si: true, "userName": this.userName } })
  }

  preview(files) {
    console.log("files", files);

    if (files.length === 0)
      return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      sessionStorage.setItem('passImg', this.imgURL)
    }
    console.log("imgUrl", this.imgURL);

  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];

    if (this.selectedFile) {
      this.img_sucess = "Image uploaded successfully..."
      this.img_error = ""
    } else {
      this.img_sucess = ""
    }
  }

  get f() { return this.passportForm.controls; }

  dateChk(date) {

    console.log("date", date)
    let day = new Date(date).getDate()
    let month = new Date(date).getMonth()
    let year = new Date(date).getFullYear()
    let fromDate = new Date(year, month, day)
    let now = new Date()
    let toDate = new Date(now.getFullYear() + 10, now.getMonth() - 1, now.getDate())

    console.log('from', fromDate, 'to', toDate, 'now', now)
    this.dateStatus = (fromDate > now && toDate > fromDate);
    // this.dateStatus = (fromDate > now );
    console.log("ageStatus", this.dateStatus)

  }

  onSubmit() {
    var data;
    var verifyObject
    this.submitted = true

    console.log("PassportDetails", this.passportForm.value);

    this.dateChk(this.passportForm.value.passport_expire_date)

    if (!this.dateStatus) {
      return
    }

    if (this.passportForm.invalid || this.selectedFile == null) {
      if (this.selectedFile == null) {
        this.img_error = "please upload the Image"
      }
      return
    }

    this.ngxService.start();
    const formdata = new FormData()
    formdata.append('passport_number', this.passportForm.value.passport_number)
    formdata.append('passport_issue_place', this.passportForm.value.passport_issue_place)
    formdata.append('passport_expire_date', this.passportForm.value.passport_expire_date)
    formdata.append('application_no', this.application_id)
    formdata.append('passport_photo', this.selectedFile, this.selectedFile.name)

    this.dService.sendform1(this.passportForm.value);
    console.log("policy======>", this.passportForm.value);
    this.userservice.passportdetails(formdata).subscribe(data => {

      this.ngxService.stop();
      console.log("passportdetailsData", data)
      var response = JSON.parse(JSON.stringify(data)).message;
      console.log("response of application form", response)

      if (!this.certificate_remark) {
        this.Submit()
        this.remark()
      }
      else {
        this.router.navigate(['user-currection'])
      }
    })
  }


  Submit() {

    this.userservice.uploaddoc(this.application_id).subscribe(data => {
      var response = JSON.parse(JSON.stringify(data)).message

      if (response === "Please provide application no." || response === "Please, upload mandatory documents." || response === "Oops something went wrong.") {
        //  alert(response)
        Swal.fire("", response)
      }
      else {
        Swal.fire('Thank You', 'The form was submitted successfully.', 'success')
        this.router.navigate(['user-dashboard'])
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
  }

  setLanguage(language) {
    this.lan = this.userservice.setLanguage(language)
  }


}

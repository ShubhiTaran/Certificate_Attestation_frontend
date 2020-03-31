import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { UserService } from '../../../user.service';
import { stringify } from '@angular/core/src/render3/util';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'
import { environment } from '../../../../environments/environment.prod'
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-user-upload-documents',
  templateUrl: './user-upload-documents.component.html',
  styleUrls: ['./user-upload-documents.component.scss']
})

export class UserUploadDocumentsComponent implements OnInit {

  toolTip: string = "Please provide the below information to complete the application form"
  other: boolean = false;

  btn_callLetter: string
  btn_afflict: string
  btn_visa: string

  bg: any;
  language: any;
  ft_sm: any;
  ft_md: any;
  bg_color: any;
  setTxt: any;
  continue: any;
  lan: any;

  selectedFile: File = null;
  app_form_data: string;
  public loading = false;
  uploadForm: FormGroup;
  submitted = false;
  data: any
  collegeList: any = [];
  test: any
  img_success: string
  img_error: string
  img_2: String
  img_3: String
  img_4: String
  userName: String
  _id: any
  application_id: any
  addData = false
  message: string;
  imagePath: any;
  imgURL: any;
  closeResult: string;
  imgName: string
  callLetterImg: any
  affidavitImg: any
  visaImg: any
  documentImg: any
  callLetterDisable: boolean = true
  affidavitDisable: boolean = true
  visaDisable: boolean = true
  urlLink = environment.apiURL
  format: string
  mandatory_date = {
    visa_upload_date: '',
    affidavit_upload_date: '',
    callletter_upload_date: ''
  }
  mandatory_img = {
    affidavit_photo: '',
    callletter_photo: '',
    visa_photo: ''
  }
  certificate_no: any;
  universitys: any;
  years: any
  diff: any;
  applicant_type: any;
  foreigner: boolean = false;
  behalf: boolean = false;
  call_letter: boolean = false;

  constructor(private formBuilder: FormBuilder, private userservice: UserService,
    private ngxService: NgxUiLoaderService, private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.pushYear()
    this.university()
    this.test = this.application_id = sessionStorage.getItem('application_no');
    this._id = sessionStorage.getItem('_id');
    this.setLanguage(null)
    this.btn_callLetter = this.btn_afflict = this.btn_visa = this.lan.select_file

    $("input[type='image']").click(function () {
      $("input[id='my_file']").click();
    });


    $(function () {
      var fileupload = $("#FileUpload1");

      var button = $("#btnFileUpload");
      button.click(function () {
        fileupload.click();
      });
    })
    $(function () {
      var fileupload = $("#FileUpload2");

      var button = $("#btnFileUpload1");
      button.click(function () {
        fileupload.click();
      });
    })

    $(function () {
      var fileupload = $("#FileUpload3");

      var button = $("#btnFileUpload2");
      button.click(function () {
        fileupload.click();
      });
    })

    this.uploadForm = this.formBuilder.group({
      Type_of_Document:['',Validators.required],
      certificate_no: [''],
      name_of_exam: ['', Validators.required],
      year: ['', Validators.required],
      name_of_institute: ['', Validators.required],
      Other: [""],
      application_no: this.test
    });
    this.personal_detail_showData()
    this.showData()
  }

  pushYear() {
    let years = []
    let i;
    for (i = 1991; i <= 2019; i++) {
      years.push(i)
    }
    this.years = years
  }

  personal_detail_showData() {
    this.userservice.getPersonalInfo({ 'application_no': this.application_id })
      .subscribe(async data => {
        console.log("personal detail", data)
        let status = null
        try { status = data['message']['status'] } catch (e) { }

        console.log('status', status);
        if (this.userservice.home(status)) {
        }
        let nationality = data['nationality']
        let applicant_type = data['applicant_type']

        if (applicant_type == "foreigner" || applicant_type == "nri") {
          this.foreigner = true
        }
        else if(nationality != "India" && applicant_type == "behalf"){
          this.foreigner = this.behalf = true
        }
        else if(nationality == "India" && applicant_type == "behalf"){
          this.call_letter = this.behalf = true
        }
        else{
          this.call_letter = true
        }
        console.log("applicant_type", applicant_type)
      })
  }

  showData() {
    this.userservice.getUploadDocs({ 'application_no': this.application_id })
      .subscribe(data => {
        console.log("data", data);
        let keys = Object.keys(data)

        if (data["attestation_docs"].length > 0) {
          this.addData = true
        }

        if (keys.length > 0) {
          // this.addData = true
          this.collegeList = this.sepetateImg(data['attestation_docs'])
          // console.log("collegeList")
          this.callLetterImg = data['callletter_photo']
          this.visaImg = data['visa_photo']
          this.affidavitImg = data['affidavit_photo']

          if (this.callLetterImg) {
            this.btn_callLetter = ""
          }
          if (this.affidavitImg) {
            this.btn_afflict = ""
          }
          if (this.visaImg) {
            this.btn_visa = ""
          }

          this.mandatory_date = {
            callletter_upload_date: data['callletter_upload_date'],
            visa_upload_date: data['visa_upload_date'],
            affidavit_upload_date: data['affidavit_upload_date']
          }

          let callletter_photo = ""
          let visa_photo = ""
          let affidavit_photo = ""

          if (data['callletter_photo']) {
            callletter_photo = data['callletter_photo'].split('-')
          }
          if (data['visa_photo']) {
            visa_photo = data['visa_photo'].split('-')
          }
          if (data['affidavit_photo']) {
            affidavit_photo = data['affidavit_photo'].split('-')
          }

          this.mandatory_img = {
            callletter_photo: callletter_photo[callletter_photo.length - 1],
            visa_photo: visa_photo[visa_photo.length - 1],
            affidavit_photo: affidavit_photo[affidavit_photo.length - 1],
          }

          console.log("mandatory_img", this.mandatory_img);


          if (this.callLetterImg) {
            this.callLetterDisable = false
          }
          if (this.visaImg) {
            this.visaDisable = false
          }
          if (this.affidavitImg) {
            this.affidavitDisable = false
          }

        }

      })
  }

  sepetateImg(data) {
    let retData = []
    data.map((obj) => {
      let Type_of_Document=obj.Type_of_Document
      let certificate_no = obj.certificate_no
      let certificate_photo = obj.certificate_photo
      let year = obj.year
      let name_of_exam = obj.name_of_exam
      let certificate_upload_date = obj.certificate_upload_date
      let name_of_institute = obj.name_of_institute
      let _id = obj._id
      let splitData = certificate_photo.split('-')
      let imgName = splitData[splitData.length - 1]

      retData.push({
        Type_of_Document,
        certificate_no,
        certificate_photo,
        certificate_upload_date,
        name_of_institute,
        _id, year, name_of_exam,
        imgName
      })
    })

    return retData
  }

  universityChange(univ) {
    this.other = false
    if (univ == "Other") {
      this.other = true
    }
  }

  onFileSelected(event, getNo) {
    this.selectedFile = <File>event.target.files[0];

    // console.log('selectedFile', this.selectedFile['type']);
    const mimeType = this.selectedFile['type']
    if (mimeType.match(/image\/*/) == null && mimeType.match(/pdf\/*/) == null) {
      Swal.fire('', 'Images or Pdf only supported.')
      return
    }
    this.img_2 = this.img_3 = this.img_4 = ""

    // return
    if (getNo == 1 && this.selectedFile) {
      this.img_success = this.lan.updated //"Image successfully Updated."
      this.img_error = ""
      return
    }
    else if (getNo == 2) {
      this.img_2 = this.lan.updated //"updated"
      this.affidavitDisable = false
      this.btn_afflict = ""
      this.affidavit()
    }
    else if (getNo == 3) {
      this.img_3 = this.lan.updated //'updated'
      this.callLetterDisable = false
      this.btn_callLetter = ""
      this.callletter()
    }
    else if (getNo == 4) {
      this.img_4 = this.lan.updated // "updated"
      this.visaDisable = false
      this.btn_visa = ""
      this.visa()
    }
  }

  deleteCallLetterImage(application_no) {

    this.userservice.deleteCallLetterImage({ application_no }).subscribe(data => {
      let status = null
      try { status = data['message']['status'] } catch (e) { }

      console.log('status', status);
      if (this.userservice.home(status)) {
        console.log('data', data)
        this.btn_callLetter = this.lan.select_file
        Swal.fire('', 'Call letter image successfully deleted')
        this.showData()
      }
    })
  }

  deleteVisaImage(application_no) {
    this.userservice.deleteVisaImage({ application_no }).subscribe(data => {
      let status = null
      try { status = data['message']['status'] } catch (e) { }

      console.log('status', status);
      if (this.userservice.home(status)) {
        console.log('data', data)
        this.btn_visa = this.lan.select_file
        Swal.fire('', 'Visa image successfully deleted')
        this.showData()
      }
    })
  }

  deleteAffidavitImage(application_no) {
    this.userservice.deleteAffidavitImage({ application_no }).subscribe(data => {
      let status = null
      try { status = data['message']['status'] } catch (e) { }

      console.log('status', status);
      if (this.userservice.home(status)) {
        console.log('data', data)
        this.btn_afflict = this.lan.select_file
        Swal.fire('', 'Afflidavit image successfully deleted')
        this.showData()
      }
    })
  }


  contactDetails() {
    this.submitted = true
    console.log("Added====>", this.uploadForm.value);

    if (!this.uploadForm.value.Type_of_Document||!this.uploadForm.value.year || !this.img_success ||
      !this.uploadForm.value.name_of_exam || !this.uploadForm.value.name_of_institute) {
      if (!this.img_success) {
        this.img_error = this.lan.img_error //"Please Upload the Image..!"
      }
      // Swal.fire('', 'please fill all the field!')

      return
    }

    this.loading = true;
    this.addData = true

    let name_of_institute = this.uploadForm.value.name_of_institute
    if (name_of_institute == "Other") {
      name_of_institute = this.uploadForm.value.Other
      if (!name_of_institute) {
        return
      }
    }

    const fd = new FormData()
    fd.append('Type_of_Document', this.uploadForm.value.Type_of_Document)
    fd.append('certificate_no', this.uploadForm.value.certificate_no)
    fd.append('year', this.uploadForm.value.year)
    fd.append('name_of_exam', this.uploadForm.value.name_of_exam)
    fd.append('name_of_institute', name_of_institute)
    fd.append('application_no', this.uploadForm.value.application_no)
    fd.append('certificate_photo', this.selectedFile, this.selectedFile.name);

    if (this.uploadForm.value.Type_of_Document||this.uploadForm.value.year || this.uploadForm.value.name_of_exam || name_of_institute) {
      // console.log(this.uploadForm.value);
      this.collegeList.push({
        Type_of_Document:this.uploadForm.value.Type_of_Document,
        certificate_no: this.uploadForm.value.certificate_no,
        year: this.uploadForm.value.year,
        name_of_exam: this.uploadForm.value.name_of_exam,
        name_of_institute: name_of_institute,
        certificate_photo_name: this.selectedFile.name,
        certificate_photo: this.documentImg
      });
      console.log("collegeList======>", this.collegeList);
    } else {
      console.log("error======>");
    }
    this.ngxService.start();
    console.log("fd", fd);

    this.userservice.certificate(fd).subscribe(data => {

      let status = null
      try { status = data['message']['status'] } catch (e) { }

      console.log('status', status);
      if (this.userservice.home(status)) {
        console.log("responsee----", fd)
        console.log("bdshbfghd", data)
        var response = JSON.parse(JSON.stringify(data)).message
        this.txtEmpty()
        this.loading = false;
        this.showData()
        this.ngxService.stop();
        Swal.fire("", "SuccessFully Added.")
        // alert(response)

      }
    })
  }

  txtEmpty() {
    this.submitted = false
    this.selectedFile = null
    this.img_success = null
    this.uploadForm.get('Type_of_Document').setValue('');
    this.uploadForm.get('certificate_no').setValue(null);
    this.uploadForm.get('year').setValue('');
    this.uploadForm.get('name_of_exam').setValue('');
    this.uploadForm.get('name_of_institute').setValue('');
    this.uploadForm.get('Other').setValue('');
    this.other = false;
  }


  year() {
    let getdata = this.uploadForm.value.year;
    (getdata == undefined) ? (getdata = "") :
      (getdata.length > 10) ? (this.uploadForm.get('year').setValue(getdata.substring(0, 10))) :
        this.uploadForm.get('year').setValue(getdata.replace(/\D/g, ""));
  }


  get f() { return this.uploadForm.controls; }

  onSubmit() {

    console.log("forgot password", this.test)
    this.userservice.uploaddoc(this.test).subscribe(data => {

      let status = null
      try { status = data['message']['status'] } catch (e) { }

      console.log('status', status);
      if (this.userservice.home(status)) {
        console.log("response of submit button", data)
        var response = JSON.parse(JSON.stringify(data)).message

        if (response === "Please provide application no." || response === "Please, upload mandatory documents." || response === "Oops something went wrong.") {
          //  alert(response)
          Swal.fire("", response)
        }
        else {
          Swal.fire('Thank You', 'The form was submitted successfully.', 'success')
          this.router.navigate(['user-dashboard'])
        }
      }
    })

  }

  cancel() {
    this.router.navigate(['../user-dashboard'])
  }

  popUpModel(content, img, imgName, certificate_no) {

    this.certificate_no = certificate_no;

    console.log('img', img, 'imgName', imgName, 'certificate_no', certificate_no)

    if (!img) {
      console.log("img", img);
      Swal.fire('', 'Please select the image')
      return
    }

    this.format = img.substring(img.length - 3, img.length)
    console.log("format", this.format);


    this.imgName = imgName
    if (img.length > 200) {
      this.imgURL = this.sanitizer.bypassSecurityTrustResourceUrl(img)
    }
    else {
      this.imgURL = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.urlLink}/${img}`)
    }
    // this.imgURL = `${this.urlLink}/${img}`
    console.log("imgUrl", this.imgURL);
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  preview(files, index) {
    console.log("mYindex", files);

    if (files.length === 0)
      return;
    var mimeType = files[0].type;
    console.log("mimeType", mimeType);

    if (mimeType.match(/image\/*/) == null && mimeType.match(/pdf\/*/) == null) {
      // this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {

      if (index == 1) {
        this.documentImg = reader.result
        // console.log("documentImg", this.documentImg);
      }
      else if (index == 2) {
        this.affidavitImg = reader.result;
      }
      else if (index == 3) {
        this.callLetterImg = reader.result;
      }
      else if (index == 4) {
        this.visaImg = reader.result;
        // console.log("visaImg", this.visaImg);
      }
    }
  }

  back() {
    this.router.navigate(['user-current-designation']);
  }

  reset() {
    this.txtEmpty()
  }

  callletter() {

    if (!this.img_3) {
      Swal.fire('', "Please Upload the Call letter Image!")
      return
    }

    const fd = new FormData()
    fd.append('application_no', this.uploadForm.value.application_no)
    fd.append('callletter_photo', this.selectedFile, this.selectedFile.name)
    this.ngxService.start();
    this.userservice.callletter(fd).subscribe(data => {

      let status = null
      try { status = data['message']['status'] } catch (e) { }

      console.log('status', status);
      if (this.userservice.home(status)) {
        console.log("callleter ", data)
        var response = JSON.parse(JSON.stringify(data)).message
        this.ngxService.stop();
        Swal.fire("", "Successfully Updated.")
        this.showData()
      }
    })

  }

  affidavit() {

    if (!this.img_2) {
      Swal.fire("", "Please Upload the Affidavit Image!")
      return
    }
    const fd = new FormData()
    fd.append('application_no', this.uploadForm.value.application_no)
    fd.append('affidavit_photo', this.selectedFile, this.selectedFile.name)
    this.ngxService.start();
    this.userservice.affidavit(fd).subscribe(data => {
      let status = null
      try { status = data['message']['status'] } catch (e) { }

      console.log('status', status);
      if (this.userservice.home(status)) {
        console.log("affidavit ", data)
        var response = JSON.parse(JSON.stringify(data)).message
        this.showData()
        this.ngxService.stop();
        Swal.fire('', 'Affidavit image suceesfully updated.')
      }
    })
  }

  visa() {
    if (!this.img_4) {
      Swal.fire("", "Please Upload the Visa Image!")
      return
    }
    const fd = new FormData()
    fd.append('application_no', this.uploadForm.value.application_no)
    fd.append('visa_photo', this.selectedFile, this.selectedFile.name)
    this.ngxService.start();
    this.userservice.visa(fd).subscribe(data => {

      let status = null
      try { status = data['message']['status'] } catch (e) { }

      console.log('status', status);
      if (this.userservice.home(status)) {

        console.log("visaa image ", data)
        var response = JSON.parse(JSON.stringify(data)).message
        this.showData()
        this.ngxService.stop();
        Swal.fire("", "Visa Image successfully updated")
      }
    })
  }


  university() {
    this.userservice.university().subscribe(data => {

      let status = null
      try { status = data['message']['status'] } catch (e) { }

      console.log('status', status);
      if (this.userservice.home(status)) {
        console.log("university", data);
        this.universitys = data['message']
      }
    })
  }

  deleteDocument() {

    if (this.certificate_no == 'deleteVisaImage') {
      this.deleteVisaImage(this.application_id)
    }
    else if (this.certificate_no == 'deleteAffidavitImage') {
      this.deleteAffidavitImage(this.application_id)
    }
    else if (this.certificate_no == 'deleteCallLetterImage') {
      this.deleteCallLetterImage(this.application_id)
    }
    else {

      let data = {
        application_no: this.application_id,
        certificate_no: this.certificate_no
      }
      this.userservice.deleteDocument(data).subscribe(data => {
        let status = null
        try { status = data['message']['status'] } catch (e) { }

        console.log('status', status);
        if (this.userservice.home(status)) {
          console.log("deleteDocument", data);
          Swal.fire('', 'Successfully Removed.')
          this.showData()
        }
      })
    }

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

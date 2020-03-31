import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment.prod'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-view-details',
  templateUrl: './admin-view-details.component.html',
  styleUrls: ['./admin-view-details.component.scss']
})
export class AdminViewDetailsComponent implements OnInit {

  format: any;
  message: any;
  bg: any;
  language: any;
  ft_sm: any;
  ft_md: any;
  ft_xl: any;
  bg_color: any;
  setTxt: any;
  continue: any;
  lan: any;

  constructor(public userService: UserService, private route: ActivatedRoute, 
    private sanitizer: DomSanitizer,private router: Router, ) { }

  urlLink = environment.apiURL
  public userName: String
  show: any
  setClass: any
  classArr: any
  application_no: any
  ApproveStatus: String
  primary_reason: String
  primary_reasonTxtShow: boolean = false

  personalDetails: any
  errorMsg = {
    userType: "",
    full_name_remark: "",
    sex_remark: "",
    date_of_birth_remark: "",
    father_name_remark: "",
    mother_name_remark: "",
    permanent_country_remark: "",
    permanent_state_remark: "",
    permanent_city_remark: "",
    permanent_house_no_remark: "",
    permanent_street_no_remark: "",
    permanent_pincode_remark: "",
    permanent_mobile_remark: "",
    permanent_email_id_remark: "",
    present_country_remark: "",
    present_state_remark: "",
    present_city_remark: "",
    present_house_no_remark: "",
    present_street_no_remark: "",
    present_pincode_remark: "",
    present_mobile_remark: "",
    present_email_id_remark: "",
    guarantor_name_remark: "",
    guarantor_state_remark: "",
    guarantor_house_no_remark: "",
    guarantor_contact_remark: "",
    guarantor_country_remark: "",
    guarantor_city_remark: "",
    guarantor_street_no_remark: "",
    name_of_organization_remark: "",
    organization_address_remark: "",
    pan_card_number_remark: "",
    purpose_for_authentication_remark: "",
    course_remark: "",
    name_of_college_remark: "",
    college_address_remark: "",
    passport_photo_remark: "",
    certificate_photo_remark: "",
    visa_photo_remark: ""
  }

  userType: String
  name: String
  sex: String
  dateOfBirth: any
  fathersName: String
  mothersName: String
  nationality:String
  profilePicURL: String
  popUpImg: any 

  passportDetail = []

  presentCountry: String
  presentState: String
  presentCity: String
  presentHouseNo: String
  presentStreetNo: String
  presentPincode: String
  presentMobileNo: String
  presentEmailId: String
  permanentCountry: String
  permanentState: String
  permanentCity: String
  permanentHouseNo: String
  permanentStreetNo: String
  permanentPincode: String
  permanentMobileNo: String
  permanentEmailId: String

  Gname: String
  Gstate: String
  GhouseNo: String
  GmobileNo: String
  Gcountry: String
  Gcity: String
  GstreetNo: String
  Gpincode: String

  designation:string
  nameOfOrganization: String
  pancard: String
  organizationAddress: String
  purpose: String
  course: String
  nameOfCollage: String
  collageAddress: String

  uplodedDocuments = []

  redBorder = "redBorder"

  country: String
  state: String
  city: String
  houseNo: String
  streetNo: String
  pincode: String
  mobileNo: String
  emailId: String

  userImg: String
  passportImg: String
  documentImg: String
  _id: any

  visa_photo:String
  affidavit_photo:String
  callletter_photo:string

  ngOnInit() {
    this.personalDetails = Array(50).fill(false)
    this.classArr = Array(50).fill(false)
    this.selectShow(1)
    this.parmas()
    // this.getDetails()
    // this.requestDetail()
  }

  parmas() {
    this.route.queryParams.subscribe(params => {
      this.application_no = params.application_no
      this._id = params.obj
      this.userName = params.userName
      this.requestDetail(this.application_no)

    });
  }

  home(){
    this.router.navigate(['../admin-dashboard'],
     { queryParams:{"userName": this.userName}, relativeTo: this.route });
  }

  selectShow(number) {

    this.personalDetails = Array(50).fill(false)
    let deselect = "back_Set deselect d-flex align-items-center justify-content-center";
    let select = "back_Set d-flex align-items-center justify-content-center";

    (number == 1) ? this.show = [true, false, false, false, false, false]
      : (number == 2) ? this.show = [false, true, false, false, false, false]
        : (number == 3) ? this.show = [false, false, true, false, false, false]
          : (number == 4) ? this.show = [false, false, false, true, false, false]
            : (number == 5) ? this.show = [false, false, false, false, true, false]
              : this.show = [false, false, false, false, false, true];

    (number == 1) ? this.setClass = [select, deselect, deselect, deselect, deselect, deselect]
      : (number == 2) ? this.setClass = [deselect, select, deselect, deselect, deselect, deselect]
        : (number == 3) ? this.setClass = [deselect, deselect, select, deselect, deselect, deselect]
          : (number == 4) ? this.setClass = [deselect, deselect, deselect, select, deselect, deselect]
            : (number == 5) ? this.setClass = [deselect, deselect, deselect, deselect, select, deselect]
              : this.setClass = [deselect, deselect, deselect, deselect, deselect, select];
  }

  getDetails(data) {
    this.userType = data.applicant_type;
    this.name = data.full_name;
    this.sex = data.sex;
    this.dateOfBirth = data.date_of_birth;
    this.fathersName = data.father_name;
    this.mothersName = data.mother_name;
    this.profilePicURL = "www.url.com";
    this.nationality = data.nationality;

    this.passportDetail = [{
      "passport_number": data.passport_number,
      "passport_issue_place": data.passport_issue_place,
      "passport_expire_date": data.passport_expire_date,
      "passport_photo": data.passport_photo
    }]

    this.presentCountry = data.present_country;
    this.presentState = data.present_state;
    this.presentCity = data.present_city;
    this.presentHouseNo = data.present_house_no;
    this.presentStreetNo = data.present_street_no;
    this.presentPincode = data.present_pincode;
    this.presentMobileNo = data.present_mobile;
    this.presentEmailId = data.present_email_id;
    this.permanentCountry = data.permanent_country;
    this.permanentState = data.permanent_state;
    this.permanentCity = data.permanent_city;
    this.permanentHouseNo = data.permanent_house_no;
    this.permanentStreetNo = data.permanent_street_no;
    this.permanentPincode = data.permanent_pincode;
    this.permanentMobileNo = data.permanent_mobile;
    this.permanentEmailId = data.permanent_email_id;


    this.Gname = data.guarantor_country;
    this.Gstate = data.guarantor_state;
    this.GhouseNo = data.guarantor_house_no;
    this.GmobileNo = data.guarantor_contact;
    this.Gcountry = data.guarantor_country;
    this.Gcity = data.guarantor_city;
    this.GstreetNo = data.guarantor_street_no;
    this.Gpincode = data.guarantor_pincode;

    this.designation = data.designation;
    this.nameOfOrganization = data.name_of_organization;
    this.pancard = data.pan_card_number;
    this.organizationAddress = data.organization_address;
    this.purpose = data.purpose_for_authentication;
    this.course = data.course;
    this.nameOfCollage = data.name_of_college;
    this.collageAddress = data.college_address;
    this.uplodedDocuments = data.attestation_docs;

    this.userImg = `${this.urlLink}/${data.personal_photo}`
    this.affidavit_photo = data.affidavit_photo
    this.visa_photo = data.visa_photo
    this.callletter_photo = data.callletter_photo

  }

  requestDetail(application_no) {
    this.userService.requestDetail({ "application_no": application_no })
      .subscribe((result) => {
        let status = null
        try{ status = result['message']['status']} catch(e){}
  
        console.log('status', status);
        if (this.userService.home(status)) {
        const data = result["message"]
        console.log("requestDetail", data)
        this.errorMessage(data)
        this.getDetails(data)
      }
      },
        error => {
          console.log("getDatesError", error);
        })
  }

  remark() {

    let keys = Object.keys(this.errorMsg)
    let sendData = {}
    keys.map((key) => {
      if (this.errorMsg[key]) {
        sendData[key] = this.errorMsg[key]
      }
    })
    let application_no = this.application_no
    sendData["application_no"] = application_no;
    console.log("sendData", sendData)
    this.userService.remark(sendData)
      .subscribe((result) => {
        let status = null
        try{ status = result['message']['status']} catch(e){}
  
        console.log('status', status);
        if (this.userService.home(status)) {
        console.log("remarkResult", result)
        }
      },
        error => {
          console.log("remarkError", error);
        })
  }

  currection(){
    let certificate_remark =  this.errorMsg.certificate_photo_remark
    let passport_remark = this.errorMsg.passport_photo_remark

    if(certificate_remark && passport_remark){
      this.router.navigate(['user-currection'],
      { queryParams: { "obj": this.application_no, certificate_remark, passport_remark,
      "obja": this._id, si: true, "userName": this.userName } })
    }
    else if(certificate_remark){
      this.router.navigate(['user-currection'],
      { queryParams: { "obj": this.application_no, certificate_remark, passport_remark,
      "obja": this._id, si: true, "userName": this.userName } })
    }
    else if(passport_remark){
      this.router.navigate(['user-currection-passport'],
      { queryParams: { "obj": this.application_no, certificate_remark, passport_remark,
      "obja": this._id, si: true, "userName": this.userName } })
    }
  }

  firstVerification() {
    let data = {
      "application_no": this.application_no,
      "primary_status": this.ApproveStatus,
      "primary_reason": this.primary_reason
    }
    this.userService.firstVerification(data).subscribe((result) => {
      let status = null
      try{ status = result['message']['status']} catch(e){}

      console.log('status', status);
      if (this.userService.home(status)) {
      console.log("firstVerificationResult", result)
      }
    },
      error => {
        console.log("firstVerificationError", error);
      })
  }

  errorMessage(data) {
    let keys = Object.keys(this.errorMsg)
    keys.map((key, index) => {

      if (data[key]) {
        this.errorMsg[key] = data[key]
        this.classArr[index] = true
      }
    })
  }

  popUpModel(img) {
    // this.popUpImg = `${this.urlLink}/${image}`
    // console.log("popUpImg", this.popUpImg);

    this.format = img.substring(img.length -3, img.length)
    console.log("format", this.format);
    
    if (img.length > 200) {
      this.popUpImg = this.sanitizer.bypassSecurityTrustResourceUrl(img)
    }
    else {
      this.popUpImg = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.urlLink}/${img}`)
    }
  }

  toggle(popover, index) {
    let count = 0
    if (popover.isOpen()) {
      popover.close();
      this.personalDetails[index] = false
    } else {
      this.personalDetails[index] = true
      this.personalDetails.map((val) => {
        if (val) {
          count++
        }
      })
      console.log("count", count)
      if (count > 1) {
        popover.close();
        this.personalDetails[index] = false
      }
      else {
        popover.open();
      }
    }
  }

  popUpClose(popover, value: string, key, index) {
    console.log("value", value)
    if (value) {
      this.classArr[index] = true
    }
    else {
      this.classArr[index] = false
    }
    this.personalDetails[index] = false
    popover.close();
    this.errorMsg[key] = value
  }

  status(status) {
    this.primary_reasonTxtShow = true
    this.ApproveStatus = status
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
    this.ft_xl = font.ft_xl
  }

  backGround(bg) {
    let bg_color = this.userService.backGround(bg)
    this.bg_color = bg_color['bg_color']
    this.setTxt = bg_color['setTxt']
    this.continue = bg_color['continue']
  }

  setLanguage(language) {
    this.lan = this.userService.setLanguage(language)
  }
  
}

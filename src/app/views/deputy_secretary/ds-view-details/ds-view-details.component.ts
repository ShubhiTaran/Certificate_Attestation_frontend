import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { UserService } from '../../../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment.prod'
import { DomSanitizer } from '@angular/platform-browser';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-ds-view-details',
  templateUrl: './ds-view-details.component.html',
  styleUrls: ['./ds-view-details.component.scss']
})
export class DSViewDetailsComponent implements OnInit {
  affidavit_photo: any;
  visa_photo: any;
  callletter_photo: any;
  format: any;
  nationality: any;

  foure: number = 4;
  five: number = 5;
  six: number = 6;

  message: any;
  bg: any;
  language: any;
  ft_sm: any;
  ft_md: any;
  bg_color: any;
  lan: any;
  setTxt: any;
  continue: any;
  _id: any;
  private_key: any;
  diff: any;


  constructor(public userService: UserService, private route: ActivatedRoute,
    private sanitizer: DomSanitizer, private ngxService: NgxUiLoaderService,
    private router: Router, ) { }

  toolTip: string = "Please click on text box to enter the remark."
  pageNumber: number = 2
  errorData: string
  doc_key: any;
  setIndex: number
  urlLink = environment.apiURL
  public userName: String
  imgIdentifier: string
  show: any
  setClass: any
  classArr: any
  application_no: any
  ApproveStatus: String
  primary_reason: String
  primary_reasonTxtShow: boolean = false
  personalDetails: any

  errorMsg = {
    userType: "", //1
    full_name_remark: "", //2
    sex_remark: "", //3
    date_of_birth_remark: "", //4
    father_name_remark: "", //5
    mother_name_remark: "", //6
    permanent_country_remark: "", //7
    permanent_state_remark: "", //8
    permanent_city_remark: "", //9
    permanent_house_no_remark: "", //10
    permanent_street_no_remark: "", //11
    permanent_pincode_remark: "", //12
    permanent_mobile_remark: "", //13
    permanent_email_id_remark: "", //14
    present_country_remark: "", //15
    present_state_remark: "", //16
    present_city_remark: "", //17
    present_house_no_remark: "", //18
    present_street_no_remark: "", //19
    present_pincode_remark: "", //20
    present_mobile_remark: "", //21
    present_email_id_remark: "", //22
    guarantor_name_remark: "", //23
    guarantor_state_remark: "", //24
    guarantor_house_no_remark: "", //25
    guarantor_contact_remark: "", //26
    guarantor_country_remark: "", //27
    guarantor_city_remark: "", //28
    guarantor_street_no_remark: "", //29
    name_of_organization_remark: "", //30
    organization_address_remark: "", //31
    pan_card_number_remark: "", //32
    purpose_for_authentication_remark: "", //33
    course_remark: "", //34
    name_of_college_remark: "", //35
    college_address_remark: "", //36
    passport_photo_remark: "", //37
    callletter_photo_remark: "", //38
    visa_photo_remark: "", //39
    affidavit_photo_remark: "", //40
    doc_remark: "", //41
    nationality_remark: "", //42
    year_of_passing_remark: "", //43
    certificate_photo_remark: [],
    attestation_docs_reark: []
  }

  userType: String
  name: String
  sex: String
  dateOfBirth: any
  fathersName: String
  mothersName: String
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

  designation: string
  nameOfOrganization: String
  pancard: String
  organizationAddress: String
  purpose: String
  course: String
  nameOfCollage: String
  collageAddress: String
  year_of_passing: String
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

  setHide: boolean

  ngOnInit() {

    this.personalDetails = Array(50).fill(false)
    this.classArr = Array(50).fill(false)
    this.selectShow(1)
    this.parmas()
    this.deputyDetail()

  }

  ngDoCheck() {
    this.font(this.message)
    this.backGround(this.bg)
    this.setLanguage(this.language)
  }

  parmas() {

    this.route.queryParams.subscribe(params => {
      this.application_no = sessionStorage.getItem('application_no');
      this._id = sessionStorage.getItem('_id');
      this.requestDetail(this.application_no);

      let primary_status = sessionStorage.getItem('primary_status');
      let final_status = sessionStorage.getItem('final_status');
      // console.log("chkStatus", chkStatus)
      if (primary_status == "Approved" && final_status == "Pending") {
        this.setHide = false
      }
      else {
        this.setHide = true
      }

    });
  }

  putRemark() {

    let doc_key = this.doc_key
    let doc_remark = this.errorMsg.doc_remark

    if (doc_key == 'attestation_docs_remark') {
      let index = this.setIndex;
      this.uplodedDocuments[index][doc_key] = doc_remark
      console.log('uplodedDocuments', this.uplodedDocuments)
    }
    else {

      this.errorMsg[doc_key] = doc_remark
      console.log("doc_remark", doc_remark);
    }
  }

  setWithRemark(data) {

    let certificate_photo_remark = this.errorMsg.certificate_photo_remark;
    let retData = []

    data.map((obj, index) => {
      let setObj = obj;
      setObj['attestation_docs_remark'] = certificate_photo_remark[index]
      retData.push(setObj)
    })

    return retData
  }

  errorData_(remarkTxtbox) {
    let remarkValue = remarkTxtbox.value
    console.log("errorData", remarkValue)
    if (remarkValue) {
      this.errorMsg[this.imgIdentifier] = remarkValue
    }
  }

  popUpModel(img, key) {
    this.errorMsg.doc_remark = null
    if (Number.isInteger(key)) {
      this.doc_key = "attestation_docs_remark"
      this.setIndex = key
      console.log("setIndex", this.setIndex);
    }
    else {
      this.doc_key = key
    }

    this.format = img.substring(img.length - 3, img.length)
    console.log("format", this.format);

    if (img.length > 200) {
      this.popUpImg = this.sanitizer.bypassSecurityTrustResourceUrl(img)
    }
    else {
      this.popUpImg = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.urlLink}/${img}`)
    }
  }

  home() {
    this.router.navigate(['/deputy-sec-dashboard']);
  }

  selectShow(number) {

    this.pageNumber = number + 1
    this.personalDetails = Array(50).fill(false)
    let deselect = "back_Set ft-md deselect d-flex align-items-center justify-content-center";
    let select = "back_Set ft-md d-flex align-items-center justify-content-center";

    if (!this.Gname) {
      if (this.pageNumber == 4) {
        this.pageNumber = 5
      }
    }

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

    this.passportDetail = this.passportDetail = [{
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
    if (!this.Gname) { this.five = 4; this.six = 5 }
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
    this.nameOfCollage = data.name_of_college
    this.collageAddress = data.college_address
    this.year_of_passing = data.year_of_passing

    this.uplodedDocuments = this.setWithRemark(data.attestation_docs)
    this.userImg = `${this.urlLink}/${data.personal_photo}`

    this.affidavit_photo = data.affidavit_photo
    this.visa_photo = data.visa_photo
    this.callletter_photo = data.callletter_photo

  }

  requestDetail(application_no) {
    this.userService.requestDetail({ "application_no": application_no })
      .subscribe((result) => {
        let status = null
        try { status = result['message']['status'] } catch (e) { }

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

    // this.errorMsg.certificate_photo_remark.map((val) =>{

    // })
    let certificate_photo_remark = []
    this.uplodedDocuments.map((obj) => {
      if (obj.attestation_docs_remark) {
        certificate_photo_remark.push(obj.attestation_docs_remark)
      }
      else {
        certificate_photo_remark.push(null)
      }
    })

    sendData['certificate_photo_remark'] = certificate_photo_remark;

    let application_no = this.application_no
    sendData["application_no"] = application_no;
    console.log("sendData for remark", sendData)
    this.userService.remark(sendData)
      .subscribe((result) => {
        let status = null
        try { status = result['message']['status'] } catch (e) { }

        console.log('status', status);
        if (this.userService.home(status)) {
          console.log("remarkResult", result)
        }
      },
        error => {
          console.log("remarkError", error);
        })
  }

  hashConvertion() {
    let data = {
      application_no: this.application_no,
      private_key: this.private_key
    }
    console.log("sendData", data)
    this.userService.hashConvertion(data).subscribe((result) => {
      let status = null
      try { status = result['message']['status'] } catch (e) { }
      console.log('status', status);
      if (this.userService.home(status)) {

        console.log('hashConvertion', result)
        this.ngxService.stop();

      }
    })
  }



  finalVerification() {
    this.ngxService.start();
    this.ngxService.stop();
    this.ngxService.start();
    let data = {
      "application_no": this.application_no,
      "final_status": this.ApproveStatus,
      "final_reason": this.primary_reason
    }
    console.log("reason", data);

    this.userService.finalVerification(data).subscribe((result) => {
      let status = null
      try { status = result['message']['status'] } catch (e) { }
      console.log('status', status);
      if (this.userService.home(status)) {
        console.log("finalVerificationResult", result)
        this.ngxService.stop();
        this.home()
      }
    },
      error => {
        this.ngxService.stop();
        console.log("finalVerificationError", error);
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
    console.log("key", this.classArr, this.errorMsg)
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

  async submit(primary_reason) {

    console.log("primary reson", this.primary_reason);


    if (!this.ApproveStatus) {
      let message = this.lan.select_status
      Swal.fire('', message)
      return
    }

    console.log("ApproveStatus", this.ApproveStatus);

    if (this.ApproveStatus == "Approved") {
      if (!this.primary_reason) {
        let message = this.lan.please_fill_the_reason
        Swal.fire('', message)
        return
      }

      this.ngxService.start();
      await this.hashConvertion()
      await this.remark()
      this.finalVerification()
      const msg = "Application have been approved";
      Swal.fire('', msg)


    }
    else if (this.ApproveStatus == "Rejected") {

      if (!this.primary_reason) {
        let message = this.lan.please_fill_the_reason
        Swal.fire('', message)
        return
      }
      this.ngxService.start();
      this.remark()
      this.finalVerification()
      const msg = "Rejected mail successfully sent to the applicant";
      Swal.fire('', msg)

    }
    else if (this.ApproveStatus == "Correction") {

      if (!this.primary_reason) {
        let message = this.lan.please_fill_the_reason
        Swal.fire('', message)
        return
      }

      let chk = false
      this.uplodedDocuments.map((obj) => {
        if (obj.attestation_docs_remark) {
          chk = true
        }
      })

      if (this.errorMsg.affidavit_photo_remark ||
        this.errorMsg.callletter_photo_remark ||
        this.errorMsg.affidavit_photo_remark) {
        chk = true
      }

      console.log(!this.errorMsg["passport_photo_remark"], !chk)
      if (!this.errorMsg["passport_photo_remark"] && !chk) {
        let message = this.lan.plese_give_any_correction_for_passport_detail_or_upload_documents
        Swal.fire("", message, "error")
        return
      }

      this.ngxService.start();
      this.remark()
      this.finalVerification()
      const msg = "Correction mail successfully sent to the applicant";
      Swal.fire('', msg)

    }

    // if (this.ApproveStatus && this.primary_reason) {
    //   this.remark()
    //   this.finalVerification()
    //   const msg = "Successfully" + this.ApproveStatus
    //   Swal.fire('', msg)
    //   this.router.navigate(['../deputy-sec-dashboard'],
    //     { queryParams: { "userName": this.userName }, relativeTo: this.route });
    // }

  }



  status(status) {
    if (status == "Rejected") {
      this.primary_reasonTxtShow = true
    }
    else {
      this.primary_reasonTxtShow = false
    }
    this.ApproveStatus = status
  }

  deputyDetail() {
    let data = { _id: this._id }
    this.userService.deputyDetail(data).subscribe((result) => {
      let status = null
      try { status = result['message']['status'] } catch (e) { }
      console.log('status', status);
      if (this.userService.home(status)) {
        console.log("result=>", result)
        this.private_key = result['message']['privateKey']
        if (!this.private_key) {
          Swal.fire('', 'You are not authorized for chage status, please contact admin')
          this.home()
        }

      }
    })
  }

  font(session) {
    let font = this.userService.fontSet(session)
    // console.log('font', font)
    this.ft_sm = font.ft_sm
    this.ft_md = font.ft_md
  }

  backGround(bg) {
    let bg_color = this.userService.backGround(bg)
    this.bg_color = bg_color['bg_color']
    this.setTxt = bg_color['setTxt']
    this.diff = bg_color['diff']
    this.continue = bg_color['continue']
  }

  setLanguage(language) {
    this.lan = this.userService.setLanguage(language)
  }

}
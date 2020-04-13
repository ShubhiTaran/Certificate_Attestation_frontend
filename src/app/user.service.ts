import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { User } from '../app/user'
// import { environment } from '../../src/environments/environment.prod'
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment.prod';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL: string = environment.apiURL 
  badgeCount: number;

  constructor(private http: HttpClient, public router: Router, ) { }

  public token: any
  public httpOptions = {

    headers: new HttpHeaders({
      // 'Content-Type': 'application/json',
      "Accept": "application/json",
      'Authorization':  document.cookie
    })
  };

  setToken() {

    // console.log("sessionStorage", sessionStorage.getItem('token'))
    if(!sessionStorage.getItem('token')){
      this.router.navigate(['dashboard'])
      return
    }
    
    let token = document.cookie;
    console.log('token', token);
   return  {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        "Accept": "application/json",
        'Authorization': token
      })
    };
  }

  home(status) {
    if (status == 400 || status == 403 || status == 404) {
      // sessionStorage.removeItem("token");
      document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });

      if (status == 400) {
        // Swal.fire('', 'Token is not valid');
        console.log('Token is not valid')
      }
      else if (status = 403) {
        console.log('Your Session is Expired')
      }
      else if( status = 404){
        console.log('User Not Found')
      }
      this.router.navigate(['dashboard'])
      return false;
    }
    return true
  }


  login(data) {
    return this.http.post(`${this.apiURL}/studentlogin`, data);
  }

  getDates() {
    return this.http.get(`${this.apiURL}/getDates`, this.setToken())
  }

  requestDetail(data) {
    return this.http.post(`${this.apiURL}/requestDetail`, data, this.setToken());
  }

  onBoard(data) {
    return this.http.post(`${this.apiURL}/onBoard`, data, this.setToken());
  }

  communication(data) {
    return this.http.post(`${this.apiURL}/communication`, data);
  }

  allRequests() {
    return this.http.get(`${this.apiURL}/allRequests`, this.setToken())
  }

  getDeputySecretary() {
    return this.http.get(`${this.apiURL}/getDeputySecretary`, this.setToken())
  }

  getDeskofficer() {
    return this.http.get(`${this.apiURL}/getDeskofficer`, this.setToken())
  }

  removeUser(data) {
    return this.http.post(`${this.apiURL}/removeUser`, data, this.setToken())
  }

  approvedRequests() {
    return this.http.get(`${this.apiURL}/approvedRequests`, this.setToken())

  }

  approvedRequests_admin() {
    return this.http.get(`${this.apiURL}/approvedRequests/admin`, this.setToken())
  }

  approvedRequests_ds() {
    return this.http.get(`${this.apiURL}/approvedRequests/ds`, this.setToken())

  }

  rejectedRequests() {
    return this.http.get(`${this.apiURL}/rejectedRequests`, this.setToken())
  }

  rejectedRequests_admin() {
    return this.http.get(`${this.apiURL}/rejectedRequests/admin`, this.setToken())
  }

  rejectedRequests_ds() {
    return this.http.get(`${this.apiURL}/rejectedRequests/ds`, this.setToken())
  }

  listOfRequests() {
    return this.http.get(`${this.apiURL}/listOfRequests`, this.setToken())
  }

  correctionRequests() {
    return this.http.get(`${this.apiURL}/correctionRequests`, this.setToken())

  }

  correctionRequests_ds() {
    return this.http.get(`${this.apiURL}/correctionRequests/ds`, this.setToken())
  }

  listOfRequests_admin() {
    return this.http.get(`${this.apiURL}/listOfRequests/admin`, this.setToken())
  }

  listOfRequests_ds() {
    return this.http.get(`${this.apiURL}/listOfRequests/ds`, this.setToken())
  }

  remark(data) {
    return this.http.post(`${this.apiURL}/remark`, data, this.setToken());
  }

  firstVerification(data) {
    return this.http.post(`${this.apiURL}/firstVerification`, data, this.setToken());
  }

  deputyDetail(data) {
    return this.http.post(`${this.apiURL}/deputyDetail`, data, this.setToken());
  }

  finalVerification(data) {
    return this.http.post(`${this.apiURL}/finalVerification`, data, this.setToken());
  }

  hashConvertion(data) {
    return this.http.post(`${this.apiURL}/hashConvertion`, data);
  }

  scheduling(data) {
    return this.http.post(`${this.apiURL}/scheduling`, data, this.setToken())
  }

  blockDate(data) {
    return this.http.post(`${this.apiURL}/blockDate`, data, this.setToken())
  }

  unblockDate(data) {
    return this.http.post(`${this.apiURL}/unblockDate`, data, this.setToken())
  }

  changePassword(data) {
    return this.http.post(`${this.apiURL}/changePassword`, data, this.setToken())
  }

  registration(user) {
    console.log(user);
    return this.http.post(`${this.apiURL}/registration`, user);
  }

  // setToken(token: string) {
  //   localStorage.setItem('token', token);
  // }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  forgotpass(user) {
    return this.http.post(`${this.apiURL}/forgotPassword`, user);
  }

  resetPassword(data) {
    return this.http.post(`${this.apiURL}/resetPassword`, data);
  }

  emailotp(email_otp) {
    return this.http.post(`${this.apiURL}/emailOtp`, email_otp);
  }

  verifygurantor(user) {
    return this.http.post(`${this.apiURL}/verifyGuarantor`, user, this.setToken());

  }

  userdashboard(data) {
    let retData = this.http.post(`${this.apiURL}/verifyOtp`, data, this.setToken())
    retData.subscribe(res => {
      try {
        let status = res['message']['status']
        console.log('status', status);
        this.home(status)
      } catch (e) { }
    })
    return retData
  }

  personal(data) {
    let retData = this.http.post(`${this.apiURL}/verifyOtp`, data, this.setToken())
    retData.subscribe(res => {
      try {
        let status = res['message']['status']
        console.log('status', status);
        this.home(status)
      } catch (e) { }
    })
    return retData
  }

  getContactInfo(data) {
    return this.http.post(`${this.apiURL}/getContactInfo`, data, this.setToken())
  }

  getUploadDocs(data) {
    return this.http.post(`${this.apiURL}/getUploadDocs`, data, this.setToken())
  }

  getPersonalInfo(data) {
    return this.http.post(`${this.apiURL}/getPersonalInfo`, data, this.setToken())

  }


  getGuarantorInfo(data) {
    return this.http.post(`${this.apiURL}/getGuarantorInfo`, data, this.setToken())

  }

  getPassportInfo(data) {
    return this.http.post(`${this.apiURL}/getPassportInfo`, data, this.setToken())
  }

  apiscountry() {
    return this.http.get(`${this.apiURL}/countries`)
  }

  university() {
    return this.http.get(`${this.apiURL}/university`)

  }

  apiscountry1() {
    let retData = this.http.get(`${this.apiURL}/countries`, this.setToken())
    retData.subscribe(res => {
      try {
        let status = res['message']['status']
        console.log('status', status);
        this.home(status)
      } catch (e) { }
    })
    return retData
  }

  apiscountrycode() {
    let retData = this.http.get(`${this.apiURL}/countryCode`, this.setToken())
    retData.subscribe(res => {
      try {
        let status = res['message']['status']
        console.log('status', status);
        this.home(status)
      } catch (e) { }
    })
    return retData
  }

  apistate(country_id, name) {
    // let data = {country_id: country_id,name:name};
    let data = {
      country_id, name
    }
    return this.http.post(`${this.apiURL}/states`, data, this.setToken())

  }

  apistate1(country_id) {
    let data = { country_id: country_id };
    let retData = this.http.post(`${this.apiURL}/states`, data, this.setToken())
    retData.subscribe(res => {
      try {
        let status = res['message']['status']
        console.log('status', status);
        this.home(status)
      } catch (e) { }
    })
    return retData
  }

  apicity(state_id) {
    return this.http.post(`${this.apiURL}/cities`, { "state_id": state_id }, this.setToken())

  }

  apicity1(state_id) {
    let retData = this.http.post(`${this.apiURL}/cities`, { "state_id": state_id }, this.setToken())
    retData.subscribe(res => {
      try {
        let status = res['message']['status']
        console.log('status', status);
        this.home(status)
      } catch (e) { }
    })
    return retData
  }

  getUserProfile(_id) {
    return this.http.post(`${this.apiURL}/userProfile`, { "_id": _id }, this.setToken())

  }

  viewDetails(obj) {
    let retData = this.http.post(`${this.apiURL}/requestDetail`, obj, this.setToken());
    retData.subscribe(res => {
      try {
        let status = res['message']['status']
        console.log('status', status);
        this.home(status)
      } catch (e) { }
    })
    return retData
  }

  getapplications(data) {
    return this.http.post(`${this.apiURL}/allRequests/user`, data, this.setToken());
  }

  sendotp(contact) {
    let retData = this.http.post(`${this.apiURL}/sendOtp`, { 'contact': contact }, this.setToken());
    retData.subscribe(res => {
      try {
        let status = res['message']['status']
        console.log('status', status);
        this.home(status)
      } catch (e) { }
    })
    return retData
  }

  newappli(data) {
    return this.http.post(`${this.apiURL}/newApplication`, data, this.setToken())
  }

  verifyotp(otp, request) {
    let retData = this.http.post(`${this.apiURL}/verifyOtp`, { 'otp': otp, 'request': request }, this.setToken());
    retData.subscribe(res => {
      try {
        let status = res['message']['status']
        console.log('status', status);
        this.home(status)
      } catch (e) { }
    })
    return retData
  }

  personaldetails(data) {
    return this.http.post(`${this.apiURL}/personalInfo`, data, this.setToken())
  }

  passportdetails(data) {
    return this.http.post(`${this.apiURL}/passportImage`, data, this.setToken())
  }

  // imgGet(url) {
  //   return this.http.get( url)
  // }

  univercityCheck(data) {
    return this.http.post(`${this.apiURL}/univercityCheck`, data)
  }

  // passportdetails(data) {
  //   return this.http.post(`${this.apiURL}/passportImage`, data, {
  //     headers: new HttpHeaders({ "Accept": "application/json",
  //     'Authorization': sessionStorage.getItem('token') })
  //   })
  // }

  contactdetails(data) {
    return this.http.post(`${this.apiURL}/contactInfo`, data, this.setToken())

  }

  currentinfo(data) {
    return this.http.post(`${this.apiURL}/currentDesignation`, data, this.setToken())

  }

  getCurrentDesignation(data) {
    return this.http.post(`${this.apiURL}/getCurrentDesignation`, data, this.setToken())

  }

  uploaddoc(application_no) {
    return this.http.post(`${this.apiURL}/submitApplication`, { 'application_no': application_no }, this.setToken())
  }

  certificate(data) {
    return this.http.post(`${this.apiURL}/certificateImage`, data, this.setToken())
  }


  deleteCallLetterImage(data) {
    return this.http.post(`${this.apiURL}/deleteCallLetterImage`, data, this.setToken())
  }

  deleteVisaImage(data) {
    return this.http.post(`${this.apiURL}/deleteVisaImage`, data, this.setToken())
  }

  deleteAffidavitImage(data) {
    return this.http.post(`${this.apiURL}/deleteAffidavitImage`, data, this.setToken())
  }

  gurantor(data) {
    return this.http.post(`${this.apiURL}/guarantorInfo`, data, this.setToken())
  }

  deleteDocument(data) {
    return this.http.post(`${this.apiURL}/deleteDocument`, data, this.setToken())

  }

  callletter(data) {
    return this.http.post(`${this.apiURL}/callletterImage`, data, this.setToken())
  }

  affidavit(data) {
    return this.http.post(`${this.apiURL}/affidavitImage`, data, this.setToken())
  }

  visa(data) {
    return this.http.post(`${this.apiURL}/visaImage`, data, this.setToken())
  }

  getAttestedDocs(data) {
    return this.http.post(`${this.apiURL}/getAttestedDocs`, data, this.setToken())
  }

  download(data) {
    return this.http.post(`${this.apiURL}/download`, data, this.setToken())
  }

  getReceipt(application_no) {
    console.log("application_no", application_no)
    return this.http.post(`${this.apiURL}/getReceipt`, { "application_no": application_no }, this.setToken())
  }

  public retFont: any
  fontSet(session) {
    if (!session) {
      session = sessionStorage.getItem('font')
    }
    if (!session) {
      session = 0
    }
    // console.log('session', session)

    if (session == -4) {
      this.retFont = { ft_sm: 'ft-sm-4', ft_md: 'ft-md-4', ft_xl: 'ft-xl-4' }
    }
    else if (session == -3) {
      this.retFont = { ft_sm: 'ft-sm-3', ft_md: 'ft-md-3', ft_xl: 'ft-xl-3' }
    }
    else if (session == -2) {
      this.retFont = { ft_sm: 'ft-sm-2', ft_md: 'ft-md-2', ft_xl: 'ft-xl-2' }
    }
    else if (session == -1) {
      this.retFont = { ft_sm: 'ft-sm-1', ft_md: 'ft-md-1', ft_xl: 'ft-xl-1' }
    }
    else if (session == 0) {
      this.retFont = { ft_sm: 'ft-sm', ft_md: 'ft-md', ft_xl: 'ft-xl' }
    }
    else if (session == 1) {
      this.retFont = { ft_sm: 'ft_sm_1', ft_md: 'ft_md_1', ft_xl: 'ft_xl_1' }
    }
    else if (session == 2) {
      this.retFont = { ft_sm: 'ft_sm_2', ft_md: 'ft_md_2', ft_xl: 'ft_xl_2' }
    }
    else if (session == 3) {
      this.retFont = { ft_sm: 'ft_sm_3', ft_md: 'ft_md_3', ft_xl: 'ft_xl_3' }
    }
    else if (session == 4) {
      this.retFont = { ft_sm: 'ft_sm_4', ft_md: 'ft_md_4', ft_xl: 'ft_xl_4' }
    }
    // console.log('retFont', this.retFont)
    return this.retFont
  }


  public send_color: any
  backGround(bg) {
    if (!bg) {
      bg = sessionStorage.getItem('bg')
    }

   
    let send_color = {}
    if (bg == "black") {
      send_color = {
        bg_color: "bg-blacks",
        // setTxt: 'txt-black',
        setTxt: 'txt-black',
        diff:'txt-white',
        bg_diff:'body-white',
        continue: 'continue_black'
      }
    }
    else {
      send_color = {
        bg_color: "bg-blues",
        // setTxt: 'txt-white',
        setTxt: 'txt-blue',
        diff:'txt-black',
        bg_diff:'bg-blues',
        continue: 'continue_blue'
      }
    }
    return this.send_color = send_color
  }

  public lan: any
  setLanguage(language) {
    // console.log('--->', language)
    if (!language) {
      language = sessionStorage.getItem('language')
    }
    if (!language) {
      language = 'english'
    }

    // console.log('language=>', language)
    let lan
    if (language == 'english') {
      lan = {
        application_no: 'Application Number',
        name: 'Name',
        first_name: 'First Name',
        middle_name: 'Middle Name',
        last_name: 'Last Name',

        date: 'Date',
        application_status: 'Application Status',
        primary_status: 'Primary Status',
        final_status: 'Final Status',
        details_of_applicants: 'Details of Applicants',
        schedule: 'Schedule',
        receipt: 'Receipt',
        document_attestation_system: 'Document Authentication Portal',
        home: 'Home',
        dashboard: 'Dashboard',
        new_application: 'New Application',
        profile: 'Profile',
        mandatory_documemnts: 'MANDATORY DOCUMENTS',
        logout: 'LOGOUT',
        view_details: 'View details',
        personal_details: 'Personal Details',
        passport_details: 'Passport Details',
        permanent_address: 'Permanent Address',
        present_address: "Present Address",
        contact_details: 'Contact Details',
        guarantor_details: 'Guarantor Details',
        current_designation: 'Employment Details',
        employee_self_employed: 'Employee/Self-Employed',
        upload_documents: 'Upload Documents',
        user_type: 'User Type',
        full_name: 'Full Name',
        sex: 'Sex',
        date_of_birth: 'Date of Birth',
        nationality: 'Nationality',
        fathers_name: "Father's Name",
        mothers_name: "Mother's Name",
        passport_no: 'Passport Number',
        place_of_issue: 'Place of Issue',
        successfully_registered:'Successfully registered, and OTP received to your registered mail ID',
        expiry_date: 'Expiry Date',
        view_document: 'View document',
        house_number: 'House Number',
        street_number: 'Street Name/ Number',
        country: 'Country',
        state: 'State',
        city: 'City',
        pincode: 'Pincode',
        mobile_number: 'Mobile Number',
        email_id: 'Email ID',
        student: 'Student',
        name_of_the_organization: "Name of The Organization",
        pancard: 'Pan Card',
        course: 'Course',
        name_of_the_college: 'Name of The College',
        complete_address: "Complete Address",
        purpose: 'Purpose for which Authentication is Sought Including Country of Designation',
        mandatory_document: 'Mandatory Document',
        certificate_number: "Certificate Number",
        year: 'Year',
        remark: 'Remark',
        name_of_the_university_txt: 'Name of the University/Board/Council/Institute',
        Examination: 'Examination',
        name_of_the_university_tbl: 'Name of the University',
        name_of_image: 'Name of Image',
        affidavit_: 'Affidavit(Only required if person applicant type is on behalf)',
        affidavit: 'Affidavit',
        call_letter: 'Call letter',
        visa_: 'Visa(Is only required nationality is Forigner of NRI)',
        visa: 'Visa',
        continue: 'Continue',
        cancel: 'Cancel',
        relationship: 'Relationship with user',
        add_photo: 'Add Photo',
        save_continue: 'Save & Continue',
        tooltip: 'Please provide the below information to complete the application form',
        updated: 'Updated',
        img_error: 'Please upload the image',
        total_applications: 'Total Applications',
        approved: 'Approved',
        remove: 'Remove',
        rejected: 'Rejected',
        pending: 'Pending',
        correction: 'Correction',
        no_data: 'No data is here..!!',
        name_of_the_applicant: 'Name of the Applicant',
        details_of_the_applicant: 'Details of the Applicant',
        submited_date: 'Submitted Date',
        desk_officer: 'Desk officer',
        deputy_secretary: 'Deputy Secretary',
        submit: 'Submit',
        select_status: 'Please select the status.',
        application_form: 'Application form',
        sitemap: 'Sitemap',
        contact_us: 'Contact us',
        officer: 'Officer',
        user: 'User',
        policy: 'By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. © 2019',
        higher_technical_education_department: 'Higher & Technical Education Department',
        government_of_maharashtra: 'Government of Maharashtra',
        welcome_to_H_TE_department: 'Welcome to H&TE Department',
        remember_me: 'Remember Me',
        forgot_password: 'Forgot Password?',
        otp_verification: 'OTP Verification',
        sing_in: 'SIGN IN',
        new_user: 'New User?',
        register: 'Register',
        about: 'About',
        mahait: 'MahaIT',
        faq: 'Guidelines for Attestation',
        help_center: 'Communication',
        field_required: 'Field required',
        attach_passport: 'Attach Passport',
        valid_date_of_birth: 'Enter valid date',
        only_image_support: 'Only images are supported.',
        back: 'Back',
        please_enter: 'Please Enter ',
        please_select: 'Please Select',
        not_valid: 'Not valid',
        upload_mandatory_document: 'Upload Mandatory Document',
        document_upload: 'Document Upload',
        passport_upload: 'Passport Upload',
        document_name: 'Document Name',
        upload_date: 'Upload date',
        upload_id_proof: 'Upload ID proof',
        add_certificate: 'Add Certificate',
        name_of_the_examination: 'Name of the Examination',
        select_file: 'Select File',
        Type_of_Document:'Type of Document',

        please_fill_the_reason:'Please fill the reason',
        plese_give_any_correction_for_passport_detail_or_upload_documents:'Please give any correction for passport detail or upload documents',

valid_visa:"Please choose one option",
        delete: 'Delete',
        use_a_mix_of_letters: 'Password at least 8 characters long and it should consist of Uppercase &amp; lowercase alphabets, special characters and numbers.',
        password: 'Password',
        confirm_password: 'Confirm Password',
        verify_attested_certificates: 'Verify Attested Certificates',
        please_upload_an_academic_certificate_for_verification: 'Please upload an academic certificate for verification',
        make_sure_your_document_id_clear_enough_in_the_image: 'Make sure your document id clear enough in the image',
        first: 'Computing secured hash key for the uploaded certificat',
        secound: 'Comparing local and blockchain hashes',
        third: 'Validating status of attestation',
        fourth: 'Checking the validity of the certificate',
        fifth: 'Success! The certificate has been verified.',
        pass: 'PASS',
        view_receipt: 'View Receipt',
        not_available: 'Not available',
        document_attested_by: 'Document Attested by',
        verify_certificate: 'Verify certificate',
        time_slot_available: 'Time Slot available',
        time_slot_unavailable: 'Time Slot unavailable',
        date_slot_available: 'Date Slot available',
        date_slot_unavailable: 'Date Slot unavailable',
        please_provide_otp:'Please, provide OTP.',
        the_applicant_can_select: 'The applicant can select the date and time slot that is available for attestation',
        choice_of_verification_slot: 'Choice of Verification Slot',
        your_contact_or_email_id_is_already_registered_with_us:'Your contact or email id is already registered with us.',
        please_verify_your_contact_first:'Please, verify your contact first',
        unblock_date: 'Unblock Date',
        block_date: 'Block Date',
        officer_name: 'Officer Name',
        designation: 'Designation',
        add_new_account: 'Add New Account',
        attested_on: 'Attested on',
        appointment_date: 'Appointment Date',
        meeting_address: 'Meeting Address',
        create_account:'Create Account',
        download_receipt: 'Download Receipt',
        print_copy:'Important: A printed copy of the receipt should be carried along on the scheduled date',
        make_sure: 'Please make sure is the original PDF or image that was issued on the blockchain and not just a scanned copy of the certificateFor manual verification at',
        web_link: '',
        welcome_to_government_of_maharashtra_please_create_your_account: 'Welcome to Government of Maharashtra please create your account',
        valid_period_content: 'Should remain valid for single applicant validity - 6 months. Can not apply as guarantor for other applicant. Keep only 1 guarantor. Applicant as Foreign National.',
        para1: 'MAHAIT is an private company entity and strives to bring in transformation in ensuring timely delivery of citizen services by way of undertaking IT transformation for the State.',
        para2: 'MAHAIT believes that the development in the field of Information and Communication Technology (ICT) can be effectively leveraged to deliver a variety of information and services to the citizens effectively and efficiently.',
        para3: 'The MAHAIT has developed one Common State Wide Online Examination Enrollment Portal and facilitate large number of applicants applying for various examinations covering Recruitment examinations.'
      }
    }
    else {
      lan = {
        application_no: 'आवेदन संख्या',
        name: 'नाम',
        first_name: 'पहला नाम',
        middle_name: 'मध्य नाम',
        last_name: 'अंतिम नाम',
        date: 'दिनांक',
        application_status: 'आवेदन की स्थिति',
        primary_status: 'प्राथमिक स्थिति',
        final_status: 'अंतिम स्थिति',
        details_of_applicants: 'आवेदकों का विवरण',
        schedule: 'अनुसूची',
        receipt: 'रसीद',
        document_attestation_system: 'दस्तावेज़ सत्यापन प्रणाली',
        home: 'होम',
        dashboard: 'डैशबोर्ड',
        new_application: 'नया आवेदन',
        profile: 'शख्सियत',
        mandatory_documemnts: 'MANDATORY DOCUMENTS',
        logout: 'लोग आउट',
        view_details: 'विवरण देखें',
        personal_details: 'व्यक्तिगत विवरण',
        passport_details: 'पासपोर्ट विवरण',
        permanent_address: 'स्थाई पता',
        present_address: "वर्तमान पता",
        contact_details: 'संपर्क विवरण',
        guarantor_details: 'गारंटी विवरण',
        current_designation: 'वर्तमान पदनाम',
        employee_self_employed: 'कर्मचारी / स्वरोजगार',
        upload_documents: 'दस्तावेज़ अपलोड करें',
        user_type: 'उपयोगकर्ता का प्रकार',
        full_name: 'पूरा नाम',
        sex: 'लिंग',
        date_of_birth: 'जन्म की तारीख',
        nationality: 'राष्ट्रीयता',
        fathers_name: 'पिता का नाम',
        mothers_name: 'मां का नाम',
        passport_no: 'पासपोर्ट संख्या',
        place_of_issue: 'मुद्दे की जगह',
        expiry_date: 'समाप्ति तिथि',
        view_document: 'दस्तावेज़ देखें',
        house_number: 'घर का नंबर',
        street_number: 'गली नंबर',
        country: 'देश',
        state: 'राज्य',
        city: 'शहर',
        pincode: 'पिन कोड',
        remove: 'हटाना',
        mobile_number: 'मोबाइल नंबर',
        email_id: 'ईमेल आईडी',
        student: 'छात्र',
        view_receipt: 'रसीद देखें',
        not_available: 'उपलब्ध नहीं है',
        name_of_the_organization: "संगठन का नाम",
        pancard: 'पैन कार्ड',
        course: 'कोर्स',
        name_of_the_college: 'कॉलेज का नाम',
        complete_address: "पूरा पता",
        purpose: 'प्रयोजन जिसके लिए प्रमाणीकरण शामिल है देश का नाम शामिल है',
        mandatory_document: 'अनिवार्य दस्तावेज',
        add_new_account: 'नया खाता जोड़ें',
        certificate_number: "प्रमाण पत्र संख्या",
        document_upload: 'दस्तावेज़ अपलोड करें',
        passport_upload: 'पासपोर्ट अपलोड',
        time_slot_available: 'समय स्लॉट उपलब्ध है',
        time_slot_unavailable: 'समय स्लॉट अनुपलब्ध है',
        please_provide_otp:'कृपया, ओटीपी प्रदान करें।',
        date_slot_available: 'दिनांक स्लॉट उपलब्ध है',
        date_slot_unavailable: 'दिनांक स्लॉट अनुपलब्ध है',
        the_applicant_can_select: 'आवेदक तिथि और समय स्लॉट का चयन कर सकता है जो सत्यापन के लिए उपलब्ध है',
        your_contact_or_email_id_is_already_registered_with_us:'आपका संपर्क या ईमेल आईडी पहले से ही हमारे साथ पंजीकृत है।',
        please_verify_your_contact_first:'कृपया, पहले अपने संपर्क को सत्यापित करें',
        choice_of_verification_slot: 'सत्यापन स्लॉट की पसंद',
        unblock_date: 'अनब्लॉक दिनांक',
        please_fill_the_reason:'कृपया कारण भरें',
        plese_give_any_correction_for_passport_detail_or_upload_documents:'पासपोर्ट के विवरण या अपलोड किए गए दस्तावेज़ों के लिए प्लिज़ कोई भी सुधार देता है',
        block_date: 'ब्लॉक की तारीख',
        appointment_date: 'मिलने की तारीख',
        meeting_address: 'बैठक का पता',
        successfully_registered:'पंजीकरण सफलतापूर्वक हो गया है।',
        download_receipt: 'रसीद डाउनलोड करें',
        print_copy:'महत्वपूर्ण: रसीद की एक मुद्रित प्रति निर्धारित तिथि पर साथ ले जानी चाहिए',
        year: 'साल',
        remark: 'टिप्पणी',
        name_of_the_university_txt: 'विश्वविद्यालय / बोर्ड / परिषद / संस्थान का नाम',
        Examination: 'इंतिहान',
        name_of_the_university_tbl: 'विश्वविद्यालय का नाम',
        name_of_image: 'छवि का नाम',
        affidavit_: 'शपथ पत्र (केवल आवेदक प्रकार की ओर से आवश्यक होने पर)',
        affidavit: 'शपथ पत्र',
        call_letter: 'बुलावा पत्र',
        visa_: 'वीजा (केवल आवश्यक राष्ट्रीयता अनिवासी भारतीय है)',
        visa: 'वीसा',
        continue: 'जारी रहना',
        cancel: 'रद्द करना',
        relationship: 'उपयोगकर्ता के साथ संबंध',
        add_photo: 'तस्वीर जोड़ो',
        save_continue: 'सहेजें जारी रखें',
        tooltip: 'आवेदन पत्र पूरा करने के लिए कृपया नीचे दी गई जानकारी प्रदान करें',
        updated: 'अपडेट किया गया',
        img_error: 'कृपया छवि अपलोड करें',
        total_applications: 'कुल आवेदन',
        approved: 'मंजूर की',
        rejected: 'अस्वीकृत',
        pending: 'अपूर्ण',
        correction: 'भूल सुधार',
        no_data: 'कोई डेटा यहाँ नहीं है .. !!',
        name_of_the_applicant: 'आवेदक का नाम',
        details_of_the_applicant: 'आवेदक का विवरण',
        submited_date: 'सबमिट करने की तिथि',
        desk_officer: 'डेस्क अधिकारी',
        deputy_secretary: 'उप सचिव',
        officer: 'अफ़सर',
        user: 'उपयोगकर्ता',
        submit: 'जमा करें',
        select_status: 'कृपया स्थिति चुनें।',
        application_form: 'आवेदन पत्र',
        sitemap: 'साइटमैप',
        contact_us: 'हमसे संपर्क करें',
        policy: 'इस पृष्ठ को जारी रखने से, आप हमारी सेवा की शर्तों, कुकी नीति, गोपनीयता नीति और सामग्री नीतियों से सहमत होते हैं। © 2019',
        higher_technical_education_department: 'उच्च और तकनीकी शिक्षा विभाग',
        government_of_maharashtra: 'महाराष्ट्र सरकार',
        welcome_to_H_TE_department: 'H & TE विभाग में आपका स्वागत है',
        otp_verification: 'OTP सत्यापन',
        remember_me: 'मुझे याद रखना',
        forgot_password: 'पासवर्ड भूल गए?',
        sing_in: 'दाखिल करना',
        new_user: 'नया उपयोगकर्ता?',
        register: 'रजिस्टर',
        about: 'के बारे में',
        mahait: 'MahaIT',
        faq: 'पूछे जाने वाले प्रश्न',
        help_center: 'सहायता केंद्र',
        field_required: 'आवश्यक क्षेत्र',
        attach_passport: 'पासपोर्ट संलग्न करें',
        valid_date_of_birth: 'जन्म तिथि मान्य करें',
        only_image_support: 'केवल चित्र समर्थित हैं।',
        back: 'वापस',
        not_valid: 'मान्य नहीं है',
        please_enter: 'कृपया दर्ज करें',
        please_select: 'कृपया चुने',
        upload_mandatory_document: 'अनिवार्य दस्तावेज़ अपलोड करें',
        document_name: 'दस्तावेज़ का नाम',
        upload_date: 'अपलोड की तारीख',
        upload_id_proof: 'आईडी प्रूफ अपलोड करें',
        add_certificate: 'प्रमाणपत्र जोड़ें',
        select_file: 'फ़ाइल का चयन करें',
        name_of_the_examination: 'परीक्षा का नाम',
        password: 'पारण शब्द',
        confirm_password: 'पासवर्ड की पुष्टि कीजिये',
        delete: 'हटाना',
        officer_name: 'अधिकारी का नाम',
        designation: 'पद',
        attested_on: 'पर प्रस्तुत किया गया',
        verify_attested_certificates: 'सत्यापित प्रमाण पत्र सत्यापित करें',
        use_a_mix_of_letters: 'एक मजबूत पासवर्ड बनाने के लिए अक्षरों, संख्याओं और प्रतीकों के मिश्रण का उपयोग करें',
        please_upload_an_academic_certificate_for_verification: 'कृपया सत्यापन के लिए एक शैक्षणिक प्रमाणपत्र अपलोड करें',
        make_sure_your_document_id_clear_enough_in_the_image: 'सुनिश्चित करें कि आपकी दस्तावेज़ आईडी छवि में पर्याप्त स्पष्ट है',
        make_sure: 'कृपया सुनिश्चित करें कि मूल पीडीएफ है जो ब्लॉकचेन पर जारी किया गया था और न केवल प्रमाण पत्र की स्कैन की हुई कॉपी पर मैनुअल सत्यापन',
        web_link: '',
        first: 'अपलोड किए गए प्रमाण पत्र के लिए कम्प्यूटिंग सेकेंड हैश कुंजी',
        pass: 'पास',
        secound: 'स्थानीय और ब्लॉकचेन हैश की तुलना',
        third: 'सत्यापन की स्थिति की पुष्टि',
        fourth: 'प्रमाण पत्र की वैधता की जाँच',
        fifth: 'सफलता! प्रमाणपत्र सत्यापित किया गया है।',
        document_attested_by: 'दस्तावेज़ द्वारा सत्यापित',
        verify_certificate: 'प्रमाणपत्र सत्यापित करें',
        create_account:'खाता बनाएं',
        welcome_to_government_of_maharashtra_please_create_your_account: 'महाराष्ट्र सरकार में आपका स्वागत है कृपया अपना खाता बनाएँ',
        valid_period_content: 'एकल आवेदक वैधता के लिए वैध रहना चाहिए - 6 महीने। अन्य आवेदक के लिए गारंटर के रूप में आवेदन नहीं कर सकते। केवल 1 गारंटर रखें। विदेशी राष्ट्रीय के रूप में आवेदक।',
        para1: 'MAHAIT एक निजी कंपनी इकाई है और राज्य के लिए IT परिवर्तन का उपक्रम करके नागरिक सेवाओं की समय पर डिलीवरी सुनिश्चित करने के लिए परिवर्तन लाने का प्रयास करती है।',
        para2: 'MAHAIT का मानना है कि सूचना और संचार प्रौद्योगिकी (ICT) के क्षेत्र में विकास को प्रभावी ढंग से और कुशलता से नागरिकों को विभिन्न प्रकार की सूचना और सेवाएं प्रदान करने के लिए प्रभावी ढंग से लाभ उठाया जा सकता है।',
        para3: 'MAHIT ने एक कॉमन स्टेट वाइड ऑनलाइन परीक्षा नामांकन पोर्टल विकसित किया है और बड़ी संख्या में आवेदकों को भर्ती परीक्षाओं को कवर करने के लिए विभिन्न परीक्षाओं के लिए आवेदन करने की सुविधा प्रदान की है।',
        Type_of_Document: 'दस्तावेज़ के प्रकार' 
      
      }
    }
    return this.lan = lan
  }


}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  search: string;
  notmach: boolean;
  userName: any;
  _id: any;
  url: string;

  constructor(private userservice: UserService, private router:Router, private route:ActivatedRoute) { }

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

  faq:boolean;
  terms_service:boolean;
  policy:boolean;
  contact_us:boolean;
  help_center:boolean;


  ngOnInit() {
  this.search =  localStorage.getItem("search")
  this.url = localStorage.getItem('url')
  // this.userName = localStorage.getItem("userName")
  // this._id = localStorage.getItem("_id")
  this.search_content()
  }

  search_content(){
    const terms_service = `Terms and Condition
    This Website owned by Minority Department, Maharashtra, India. The content for the website is provided by Minority Department and by accessing this website, you unconditionally accept to be legally bound by the terms and conditions. If you do not agree to the mentioned terms and conditions, please do not access the website. Efforts have been made to ensure the accuracy and currency of the content on this website; however, the same should not be interpreted as a statement of law or used for any legal purposes. In case of any ambiguity or doubts, users are advised to verify / check with the concerned Department(s) and / or other source(s), and obtain appropriate professional advice. Under no circumstances Minority Department will be liable for any expense, loss or damage including, without limitation, indirect or consequential loss or damage or any expense, loss or damage whatsoever arising from use, or loss of use, of data, arising out of or in connection with the use of this website. These terms and conditions shall be governed by and construed in accordance with the Indian Laws. Any dispute arising under these terms and conditions shall be subject to the jurisdiction of the courts of India.`

    const policy = `Disclaimer and Policies
    Links to External Websites/Portals
    At many places in this portal, you shall find links to other websites/portals created and maintained by other Government, non-Government / private organizations. These links have been placed for your convenience. When you select a link you are navigated to that website. Once on that website, you are subject to the privacy and security policies of the owners / sponsors of the website. Minority Department is not responsible for the contents and reliability of the linked websites and does not necessarily endorse the views expressed in them. Mere presence of the link or its listing on this portal should not be assumed as endorsement of any kind.
    Links to the Planning Department Website by Other Websites/Portals
    We do not object you for linking directly to the information that is hosted on our site and no prior permission is required for the same.We do not permit our pages to be loaded into frames on your site. Our Department's pages must load into a newly opened browser window of the user.
    Privacy Policy
    As a general rule, this portal does not automatically capture any specific personal information from you, (like name, phone number or e-mail address), that allows us to identify you individually. This portal records your visit and logs the following information for statistical purposes, such as Internet Protocol (IP) addresses, domain name, browser type, operating system, the date and time of the visit and the pages visited. We make no attempt to link these addresses with the identity of individuals visiting our site unless an attempt to damage the site has been detected We will not identify users or their browsing activities, except when a law enforcement agency may exercise a warrant to inspect the service provider's logs. If Minority Department requests you to provide personal information, you will be informed how it will be used if you choose to give it and adequate security measures will be taken to protect your personal information.
    Copyright Policy
    Material featured on this portal may be reproduced free of charge in any format or media without requiring specific permission. This is subject to the material being reproduced accurately and not being used in a derogatory manner or in a misleading context. Where the material is being published or issued to others, the source must be prominently acknowledged. However, the permission to reproduce this material does not extend to any material on this site which is identified as being the copyright of the third party. Authorization to reproduce such material is obtained from the copyright holders concerned.
    Disclaimer
    Although the information and contents in this website have been put with care and diligence, Minority Department does not take responsibility on how this information is used or the consequences of its use. In case of any inconsistency/confusion, the user should contact the concerned Section/Officer of Minority Department for further clarifications.`

    const help_center = `Help Center
    If you want to know anything about the grievance redressal system or if you are facing any techinical difficulty please call on below phone number.Our call centre representative will help you.
    24 X 7 Citizen Call Center : 1800 120 8040 (Toll Free)`

    const contact_us = `Contact us
    Registered office:
    MAHARASHTRA INFORMATION TECHNOLOGY CORPORATION LIMITED
    Room No 514, 5th Floor, Annex Building,
    Hutatma Rajaguru Chowk, Mantralaya,
    Mumbai City, Maharashtra, India, 400032
    TEL : +91 22 22026534 Fax : +91 22 2815087
    Email : info.mahait[at]mahait[dot]org
    Website : www.mahait.org
    Branch office:
    MAHARASHTRA INFORMATION TECHNOLOGY CORPORATION LIMITED
    World Trade Centre, 7th Floor,
    Centre 1, Cuffe Parade
    Mumbai City, Maharashtra, India, 400032
    TEL : +91 22 22174600 Fax : +91 22 2815087
    Website : www.mahait.org`

    let faq = `Disclaimer
    A.Disclaimer before Online application:
    Furnishing WRONG information or FAKE DOCUMENTS for authentication is a PUNISHABLE OFFENCE.
    Attestation of Academic Certificates for employment purpose is NOT done in this Department. For employment purpose attestation should be obtained from Department of Skill Development and Entrepreneurship (2nd floor, Mantralaya, Main Building).
    B. Guideline for Indian National:
    Only certificates related to ACADEMICS are attested in this department.
    The following certificates are attested:
    Mark sheet
    Passing certificate
    Degree certificate
    Transcript
    Provisional degree certificate
    Certificates not related to academics such as Birth certificate, certificate of Age, Nationality & Domicile, Leaving certificate, Bonafide certificate, marriage certificate etc. are NOT attested here.
    Academic certificates up to Std. 9th (School level) are NOT attested here.
    Academic certificates of Central Boards like CBSE, ICSE are NOT attested here. Attestation should be obtained from Central Government.
    Academic certificates obtained from private institutions which are not affiliated by any University or are not governed by any Act / Rules / Laws of Maharashtra State Government/ Central Government will NOT be attested.
    Attestation of Academic Certificates for employment purpose is NOT done in this Department. For employment purpose attestation should be obtained from Department of Skill Development and Entrepreneurship (2nd floor, Mantralaya, Main Building).
    Steps before online application for attestation
    1. Attestation by respective Board / University:
    * Limited to Boards/ Universities only in the State of Maharashtra
    Board Certificates
    - SSC Board Certificate
    - HSC Board Certificate
    Attestation should be obtained from Board officials only. Attestations by school/college principals, Head of Departments are not acceptable.
    University certificates attestation by Controller of Examination, Deputy Registrar/ Assistant Registrar of Exam Section of concerned university.
    
    2. Attestation by a Notary:
    
    The Certificates are to be attested by a Notary on Rs. 25 stamp paper.
    
    3. Attestation by Home Department (Government of Maharashtra):
    
    The certificates are to be attested in Home Department (9th floor, New Administrative Building, Opp. Mantralaya)
    
    Mandatory Support Documents:
    
    Students original passport
    Photocopy of student’s passport
    Offer letter from the Foreign University where admission is acquired.
    If the candidate is unable to come personally, the person visiting on behalf of the student should bring authority letter on Rs.100 stamp paper *.
    In such case photo identity proof of the authorized person (e.g. Passport, Aadhar card, PAN card) should also be submitted, and original should also be brought for verification.
    Passport size photographs of both the student and the authorized person should be affixed on the authority letter (if process carried out by the authorized person on behalf of the applicant).
    If the candidate is currently studying abroad, photo copy of VISA should also be submitted.
    A person can be authorized to get attestation for only one student.
    Checklist of Documents for Indian Students:
    Documents
    Board /University Attestation on all certificates
    Attestation on all certificates by Notary
    Home Department Attestation on all certificates
    Students Passport size color photograph
    Student’s Passport
    Student’s VISA / Declaration letter mentioning VISA to be obtained in future for Higher Education
    Offer letter by Foreign University
    Authority letter on Rs.100 stamp paper (with photograph of candidate and authority)
    Photo ID proof of authorized person
    Passport size color photograph of Authorized person
    Required only if process done by authorized person on behalf of candidate
    C. Guideline for Foreign National
    Only certificates related to ACADEMICS are attested in this department.
    The following certificates are attested:
    Mark sheet
    Passing certificate
    Degree certificate
    Transcript
    Provisional degree certificate
    Certificates not related to academics such as Birth certificate, certificate of Age, Nationality & Domicile, Leaving certificate, Bonafide certificate, marriage certificate etc. are NOT attested here.
    Academic certificates obtained from private institutions which are not affiliated by any University or are not governed by any Act / Rules / Laws of Maharashtra State Government/ Central Government will NOT be attested.
    Steps before Submission of application for attestation
    1. Attestation by respective Board / University:
    (Limited to Universities only in the State of Maharashtra) University certificates attestation by Controller of Examination, Deputy Registrar/ Assistant Registrar of Exam Section of concerned university.
    2. Attestation by a Notary:
    The Certificates are to be attested by a Notary on Rs. 25 stamp paper.
    3. Attestation by Home Department (Government of Maharashtra):
    The certificates are to be attested in Home Department (9th floor, New Administrative Building, Opp. Mantralaya)
    Mandatory Support Documents:
    Student’s original passport
    Photocopy of student’s passport.
    If the validity of the old Passport has expired (delayed application for attestation), photo copy of the old Passport and Stay VISA which was valid for the duration of the academic course should be submitted.
    Original document of Stay VISA / Stay VISA extension
    Photocopy of Stay VISA / Stay VISA extension
    If the candidate is unable to come personally, the person visiting on behalf of the student should bring authority letter on Rs.100 stamp paper.
    The authority letter should be sent back to the student for signature. The receipts of these postal/ courier transactions should be preserved and submitted along with other documents.
    In such case photo identity proof of the authorized person (e.g. Passport, Aadhar card, PAN card) should also be submitted and original should also be brought for verification.
    Passport size photographs of both the student and the authorized person should be affixed on the authority letter (if process carried out by the authorized person on behalf of the applicant).
    A person can be authorized to get attestation for only one student.
    Check list for necessary documents for Foreign Students:
    Documents
    University Attestation on all certificates
    Attestation on all certificates by Notary
    Home Department Attestation on all certificates
    Students Passport size color photograph
    Student’s Passport
    Student’s old passport (delayed application for attestation, if applicant comes for certificate attestation at a later stage after going back to his/her home country)
    Student’s Stay VISA/Stay VISA extension
    Student’s Old Stay VISA(delayed application for attestation, if applicant comes for certificate attestation at a later stage after going back to his/her home country)
    Authority letter on Rs. 100 Stamp Paper (with photograph of candidate and authority)
    Photo ID proof of authorized person
    Passport size color photograph of Authorized person
    Mail/ courier transaction proof
    Required only if process done by authorized person on behalf of candidate
    Online Attestation Process:
    Step 1 :
    Applicant fills complete application form online (Aadhar linking to auto fetch basic information, for Indian Students
    Step 2 :
    Applicant uploads scanned copy of original documents as per requirement and submits
    Step 3 :
    Concerned authority at department level verifies uploaded documents and approves / disapproves application
    Step 4 :
    (If Disapproved) Applicant to receive details online and has to re-submit accordingly back to Step 3
    Step 5 :
    (If Approved) Online date selection calendar to be activated, Applicant to select date from the available dates for original document verification and attestation. On selection the system generates a receipt with details to be carried to department
    Step 6 :
    The applicant visits the department on the selected date and provides the original documents for verification and attestation
    Step 7 :
    Deputy Secretary H&TE Department verifies the original documents against the online documents and provides the attested original copies to the applicant
    Step 8 :
    Deputy Secretary checks the documents attested on the system and takes the receiving on individual Xerox copies of documents attested
    Step 9 :
    Receiving copy is signed by applicant and handed over to department as a proof
    Date and Time Slot Booking:
    While Date booking Students has to choose two option from Monday, Tuesday, Thursday and Friday of the week of his choice.
    Time slot will be provided by online application approving official after online document verification.
    Remarks for rejection
    While rejecting and application all the documents uploaded by applicant will be checked and in remarks approval and rejection of each document will be provided. For every rejection Instruction for correction will be provided in remarks section. `

    this.terms_service = terms_service.includes(this.search)
    this.policy = policy.includes(this.search)
    this.faq = faq.includes(this.search)
    // this.help_center = help_center.includes(this.search)
    this.contact_us = contact_us.includes(this.search)
    // console.log( this.terms_service, this.policy, this.faq,  this.help_center,  this.contact_us)
    if(this.terms_service==false && this.policy==false && this.faq==false
       &&  this.contact_us==false){
      this.notmach = true
    }

  }

  navigate(nav_to){
    let navPage = "../" + nav_to;
    this.router.navigate([navPage]);
    // console.log(this.url)
    // let split = this.url.split('/')
    // split.map((val) => {
    //   if ( val == "help-center" || val == "contact-us" || val == "faq"  ||
    // val == "dashboard" || val == "forgot-pass" || val == "email-otp" || val == "register-here" ||
    //    val == "terms-condition" || val == "policies") {
    //      let navPage = "../" + nav_to;
    //     this.router.navigate([navPage]);
    //     return;
    //   }
    //   else if(val == ""){
        
    //   }

    // })
    
  }

  goPage(url_link){

  }

  ngDoCheck() {
    this.font(this.message)
    this.backGround(this.bg)
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
    this.diff = bg_color['diff']

  }
}

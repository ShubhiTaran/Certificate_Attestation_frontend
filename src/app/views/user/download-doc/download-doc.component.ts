import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../user.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { environment } from '../../../../environments/environment.prod'


@Component({
  selector: 'app-download-doc',
  templateUrl: './download-doc.component.html',
  styleUrls: ['./download-doc.component.scss']
})
export class DownloadDocComponent implements OnInit {

  urlLink = environment.apiURL
  language: string
  ft_md: string
  ft_sm: string
  bg_color: string
  lan: any
  public message: any
  format: any;
  popUpImg: any
  public bg: any
  setTxt: any;
  continue: any;
  diff: any;
  // appl_data: ['a', 'b', 'c']
  _id: any;
  userName: any;
  attested_docs: any = []
  doc_empty_status: String
  downLink = "http://165.22.216.70:3000/public/1566993479300-pjeew4fwks8-CERTIFICATE.png"
  fileUrl: any;
  constructor(private userservice: UserService, private sanitizer: DomSanitizer,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this._id = sessionStorage.getItem('_id')
    this.getAttestedDocs()
  }

  download(link) {
    let getLink = link.replace('public', 'download')

    let setlink = `${this.urlLink}/${getLink}}`
    console.log("setlink", setlink)
    this.downLink = setlink
    window.open(setlink)
  }

  view(img) {
    this.format = img.substring(img.length - 3, img.length)
    console.log("format", this.format);

    this.popUpImg = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.urlLink}/${img}`)

  }


  ngDoCheck() {
    this.font(this.message)
    this.backGround(this.bg)
    this.setLanguage(this.language)
  }

  font(session) {
    let font = this.userservice.fontSet(session)
    //  console.log('font', font)
    this.ft_sm = font.ft_sm
    this.ft_md = font.ft_md
  }

  backGround(bg) {
    let bg_color = this.userservice.backGround(bg)
    this.bg_color = bg_color['bg_color']
    this.setTxt = bg_color['setTxt']
    this.diff = bg_color['diff']
    this.continue = bg_color['continue']
  }

  getAttestedDocs() {
    let sendData = { _id: this._id }
    console.log("sendData", sendData)
    this.userservice.getAttestedDocs(sendData).subscribe((data) => {
      console.log('data', data)
      let attested_docs = data['attested_docs']
     
      if (attested_docs.length < 1) {
        this.doc_empty_status = "Not yet application approved"
      }
      else{
        this.attested_docs = this.addDownload(attested_docs)
        console.log("attested_docs", this.attested_docs)
      }
    })
  }


  addDownload(data) {
    let setData = data
    data.map((obj, index) => {
      let certificate_photo = obj.certificate_photo.replace('public', '/download')
      // console.log(certificate_photo)
      data[index]['downlaod'] = certificate_photo
    })
    return setData
  }



  setLanguage(language) {
    this.lan = this.userservice.setLanguage(language)
  }

}

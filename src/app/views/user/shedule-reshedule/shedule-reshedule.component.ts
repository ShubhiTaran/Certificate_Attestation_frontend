import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { NgbDateStruct, NgbCalendar, NgbDate, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
// import { FEB } from '@angular/material';
import { UserService } from '../../../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shedule-reshedule',
  templateUrl: './shedule-reshedule.component.html',
  styleUrls: ['./shedule-reshedule.component.scss']
})
export class SheduleResheduleComponent implements OnInit {

  public userName: String

  public isDisabled: any
  _id :any
  model: NgbDateStruct;
  date: { year: number, month: number };
  setClass = []
  shedule = []
  slot = []
  blockeddate = []
  timeSlot: any = []
  today: any
  minDate: any
  application_no:String

  bg: any;
  language: any;
  ft_sm: any;
  ft_md: any;
  bg_color: any;
  setTxt: any;
  continue: any;
  lan: any;
  message: any;
  ft_xl: any;
  diff: any;

  constructor(private calendar: NgbCalendar,private route:ActivatedRoute,private router:Router,
     config: NgbDatepickerConfig, public userService: UserService) {
    config.outsideDays = 'hidden';
  }

  ngOnInit() {
   
    // this.disableDate()
    if(sessionStorage.getItem('isAllow') != 'yes'){
      this.home();
      return;
    }
    this.getDates()
    this.parmas()
  }

  parmas() {
    this._id = sessionStorage.getItem('_id');
    this.application_no = sessionStorage.getItem('application_no');
    // this.route.queryParams.subscribe(params => {
    //   this.userName = params.userName
    //   this.application_no = params.application_no
    //   this._id = params._id
    // });
  }

  home(){
    this.router.navigate(['../user-dashboard']);
  }


  selectToday() {



    let getminDate = this.getMinDate().split("-")

    let minDate = {

      year: Number(getminDate[0]),

      month: Number(getminDate[1]),

      day: Number(getminDate[2])

    }

    this.model = minDate

    this.today = minDate

    // console.log("this.calendar.getToday()", this.calendar.getToday());



  }



  selectedDate() {

    console.log("selectedDate", this.model);

    this.setAvailability(this.model)

    // this.model = null

  }



  disableDate() {

    let blockedDate = this.blockeddate

    try {

      var month = this.date.month

      var year = this.date.year

    }

    catch{

      month = this.model.month

      year = this.model.year

    }



    console.log("month", month, "year", year)

    let yearArr = []

    let monthArr = []

    let dateArr = []



    blockedDate.map((val) => {

      let split = val.split("/")
      if (month == Number(split[1]) && (year == Number(split[2]))) {

        monthArr.push(month)
        yearArr.push(year)
        dateArr.push(Number(split[0]))

      }

    })



    console.log("monthArr", monthArr, "dateArr", dateArr, "yearArr", yearArr);

    this.isDisabled = (date: NgbDate) =>

      (this.calendar.getWeekday(date) <= 3 ||

        this.calendar.getWeekday(date) == 6 ||

        this.calendar.getWeekday(date) == 7

        || (date.year == yearArr[0] && date.month == monthArr[0] && date.day == dateArr[0])

        || (date.year == yearArr[1] && date.month == monthArr[1] && date.day == dateArr[1])

        || (date.year == yearArr[2] && date.month == monthArr[2] && date.day == dateArr[2])

        || (date.year == yearArr[3] && date.month == monthArr[3] && date.day == dateArr[3])

        || (date.year == yearArr[4] && date.month == monthArr[4] && date.day == dateArr[4])

        || (date.year == yearArr[5] && date.month == monthArr[5] && date.day == dateArr[5])

        || (date.year == yearArr[6] && date.month == monthArr[6] && date.day == dateArr[6])

        || (date.year == yearArr[7] && date.month == monthArr[7] && date.day == dateArr[7])

        || (date.year == yearArr[8] && date.month == monthArr[8] && date.day == dateArr[8])

        || (date.year == yearArr[9] && date.month == monthArr[9] && date.day == dateArr[9]));



    this.setClass[0] = "chk time freeSlot"

  }







  getDates() {

    this.userService.getDates().subscribe((result) => {
      let status = null
      try { status = result['message']['status'] } catch (e) { }

      console.log('status', status);
      if (this.userService.home(status)) {
      console.log("getDatesResult", result)

      this.shedule = this.slotModifi(result["message"])
      this.selectToday()
      this.setAvailability(this.model)
      }
    },
      error => {
        console.log("getDatesError", error);
      })

  }

  slotModifi(getResult) {
    let shedule = []
    getResult.map((obj, index) => {
      let slot = []
      let date = obj.date
      let day = obj.day
      let slot_remark = obj.slot_remark
      obj.slot.map((obj) => {
        slot.push(obj.slot_no)
      })

      shedule.push({ slot, date, day, slot_remark })
    })

    return shedule;
  }



  scheduling(data) {

    this.userService.scheduling(data).subscribe((result) => {
      console.log("schedulingResult", result)
      Swal.fire('', 'Sucessfully Added')

      this.router.navigate(['user-receipt'])

    },
      error => {
        console.log("schedulingError", error);
      })
   
  }





  timeSelected(index) {
    console.log("my index", index);
    let getClass = this.setClass[index]

    if (getClass.includes("timeDisable")) {
      console.log("this is disabled")
    }
    else {
      this.showAvailability(this.slot);
      this.setClass[index] = "time timeEnable"
      this.timeSlot = index
    }
  }







  setAvailability(date) {



    const selectedDate = new Date(date.month + "/" + date.day + "/" + date.year).toDateString()

    console.log("selectedDate", selectedDate)

    let shedule = this.shedule

    this.slot = []

    let blockeddate = []



    shedule.map((obj, index) => {

      let split = obj.date.split("/")

      const objDate = new Date(split[1] + "/" + split[0] + "/" + split[2]).toDateString()

      // console.log("obj", objDate, "selectedDate", selectedDate)

      if (selectedDate == objDate) {

        console.log("success", selectedDate)
        this.slot = obj.slot.map((val) => Number(val))
      }

      if (obj.slot.length >= 12) {

        blockeddate.push(obj.date)

      }

    })



    this.blockeddate = blockeddate

    this.showAvailability(this.slot)

    this.disableDate()

    console.log("blockedDate", this.blockeddate)

  }



  showAvailability(slot) {
    console.log("showAvailability", slot)
    let available = "time freeSlot"
    let booked = "time timeDisable"
    const dummy = Array(20).fill(0)
    // const arr = slot.concat(dummy)

    dummy.map((val, index) => {
      (slot.includes(index)) ? this.setClass[index] = booked
        : this.setClass[index] = available;
    })

    let getDate = this.model.day + '/' + this.model.month + '/' + this.model.year
    let schedule = this.shedule;
    let resetShecule = []
    let newDate = false
    schedule.map((obj) =>{

     let getSlot = obj.slot
      if(obj.date == getDate){
        getSlot = slot
        newDate = false
      }
      newDate = true
      var addData = {
        date: obj.date,
        date_remark: obj.date_remark,
        day: obj.day,
        slot: getSlot,
      }
      resetShecule.push(addData)
    })

    if(newDate){
      var addData = {
        date: getDate,
        date_remark: "remark",
        day: 'Saturday',
        slot: slot,
      }
      resetShecule.push(addData)
    }

    this.shedule = resetShecule
    console.log("this.shedule", this.shedule);
    

  }

  getMinDate() {

    let minDate = null
    let ShouldNot = []
    let canCome = []

    this.shedule.map((obj, index) => {
      let date = obj.date.split("/");
      let setDate = new Date(date[1] + "/" + date[0] + "/" + date[2]).toDateString();
      (obj.slot.length < 12) ?
        canCome.push(setDate)
        :
        ShouldNot.push(setDate);

    })



    console.log("canCome", canCome, "ShouldNot", ShouldNot);



    let today = new Date()

    let yesDay = new Date(today.setDate(today.getDate() - 1))

    // console.log(today);



    for (let i = 0; i <= 50; i++) {



      let addDay = new Date(yesDay.setDate(yesDay.getDate() + 1)).toDateString()

      let chkShoudNot = ShouldNot.includes(addDay)

      // console.log(chkShoudNot, addDay);

      let splitAddDay = addDay.split(" ")



      if (!chkShoudNot && (splitAddDay[0] == "Thu" || splitAddDay[0] == "Fri")) {

        today = new Date(addDay)

        // return date as YYYY-MM-DD

        let isoDate = new Date(today.setDate(today.getDate() + 1)).toISOString().substr(0, 10)

        minDate = isoDate

        console.log("isoDate", isoDate);

        return minDate

        break

      }

    }

  }



  onSubmit() {
    let date = this.model.day + "/" + this.model.month + "/" + this.model.year
    let timeSlot = this.timeSlot
    console.log("timeSlot", timeSlot);
    let weekday = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  
    if ( timeSlot < 1) {
      Swal.fire('', "Please select time slot")
    }
    else {
      let sednData = {
        "user_id": this._id,
        "date" : date,
        "slot" : timeSlot,
        "day" :weekday[new Date( this.model.year + "/" + this.model.month + "/" + this.model.day ).getDay()],
        "application_no": this.application_no

      }
      console.log("sendData", sednData)
      this.scheduling(sednData)
    }
    console.log("date", date, "timeSlot", timeSlot)
  }

  blockDate(data) {
    console.log("data", data)
    this.userService.blockDate(data).subscribe((result) => {
      console.log("blockDateResult", result)
      Swal.fire('', 'Sucessfully Added')
      // this.getDates()
      let slot = result['message']['slot'].map((val) =>  Number(val))
      this.showAvailability(slot)
    },
      error => {
        console.log("blockDateError", error);
      })
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
    this.diff = bg_color['diff']
  }

  setLanguage(language) {
    this.lan = this.userService.setLanguage(language)
  }

  //date month year
  getShedule() {

    this.shedule = [{
      "date": "28/06/2019",
      "day": "Monday",
      "slot": ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      "slot_remark": null

    },

      , {

      "date": "22/08/2019",

      "day": "Monday",
      "slot": ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      "slot_remark": "dontKnow"

    },

      , {

      "date": "18/07/2019",

      "day": "Monday",
      "slot": ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      "slot_remark": "dontKnow"

    },

    {
      "date": "27/06/2019",

      "day": "Monday",
      "slot": ["1"],
      "slot_remark": "dontKnow"

    }

      , {

      "date": "13/06/2019",

      "day": "Monday",
      "slot": ['11'],
      "slot_remark": "dontKnow"

    }

      , {

      "date": "15/08/2019",

      "day": "Monday",
      "slot": ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      "slot_remark": "dontKnow"

    }]

  }





}

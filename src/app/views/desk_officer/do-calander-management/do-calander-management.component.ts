import { Component, OnInit } from '@angular/core';

import swal from 'sweetalert2'

import Swal from 'sweetalert2/dist/sweetalert2.js'
import { NgbDateStruct, NgbCalendar, NgbDate, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

// import { FEB } from '@angular/material';

import { UserService } from '../../../user.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({

  selector: 'app-do-calander-management',

  templateUrl: './do-calander-management.component.html',

  styleUrls: ['./do-calander-management.component.scss']

})

export class DoCalanderManagementComponent implements OnInit {


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
  public userName: String
  primary_reason: String
  public isDisabled: any

  model: NgbDateStruct;

  date: { year: number, month: number };

  setClass = []

  shedule = []

  slot = []

  blockeddate = []

  timeSlot: any = []

  today: any

  minDate: any
  diff: any;

  constructor(private calendar: NgbCalendar, private route: ActivatedRoute, private router: Router,
    config: NgbDatepickerConfig, public userService: UserService) {
    config.outsideDays = 'hidden';

  }



  ngOnInit() {
    this.getDates()
    // this.disableDate()
  }

  home() {
    this.router.navigate(['../desk-officer-dashboard']);
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



  slotModifi(getResult) {
   
    let shedule = getResult.map((obj) => {
      let date = obj.date
      let day = obj.day
      let slot_remark = obj.slot_remark
      let slot = obj.slot.map((obj) => obj.slot_no)
      let seperation = obj.slot.map((obj) => !obj.email_id)      
      return { slot, date, day, slot_remark, seperation }
      // shedule.push({ slot, date, day, slot_remark })
    })

    console.log("shedule", shedule)
    return shedule;
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



  scheduling(data) {

    this.userService.scheduling(data).subscribe((result) => {
      let status = null
      try { status = result['message']['status'] } catch (e) { }

      console.log('status', status);
      if (this.userService.home(status)) {
      console.log("schedulingResult", result)
      Swal.fire('', 'Sucessfully Added')
    }
    },
      error => {
        console.log("schedulingError", error);
      })
  }

  timeSelected(index) {

    console.log("myindex", index);
    let getClass = this.setClass[index]
      console.log('getClass', getClass)
      let getIndex = this.timeSlot.indexOf(index)
      if (getIndex >= 0) {
        console.log(getIndex);
        this.timeSlot.splice(getIndex, 1)
        this.setClass[index] = "time freeSlot"
      }
      else {
        console.log("inside else")
        this.timeSlot.push(index)
        this.setClass[index] = "time timeEnable"
      }
    console.log("this.setClass", this.setClass);
  }







  setAvailability(date) {
    const selectedDate = new Date(date.month + "/" + date.day + "/" + date.year).toDateString()
    console.log("selectedDate", selectedDate)
    let shedule = this.shedule
    this.slot = []
    let blockeddate = []
    let seperation = [];
    shedule.map((obj) => {
      let split = obj.date.split("/")
      const objDate = new Date(split[1] + "/" + split[0] + "/" + split[2]).toDateString()
      if (selectedDate == objDate) {
        console.log("success", selectedDate, obj)
        this.slot = obj.slot.map((val) => Number(val))
        seperation = obj.seperation;
      }
      if (obj.slot.length >= 12) {
        blockeddate.push(obj.date)
      }
    })

    this.blockeddate = blockeddate
    console.log("seperationF", seperation);
    this.showAvailability(this.slot, seperation)

    this.disableDate()

    console.log("blockedDate", this.blockeddate)

  }



  showAvailability(slot, seperation) {
    console.log("showAvailability", slot);   //[12, 7, 11, 10, 1, 2, 9, 5]
    console.log("seperation", seperation); //[true, false, false, true, false, false, true, false]
    let available = "time freeSlot";
    let booked = "time timeDisable";
    let desk_booked = "time deskBlock";
    const dummy = Array(20).fill(0)
    this.setClass = Array(20).fill(available);
    slot.forEach((val, index) =>{
      if(seperation[index]){
        this.setClass[val] = desk_booked;
      }
      else{
        this.setClass[val] = booked;
      }
    })

    // dummy.forEach((_, index) => {
    //   if(slot.includes(index)){
    //     if(seperation[index]){
    //       this.setClass[index] = booked;
    //     }
    //     else{
    //       this.setClass[index] = desk_booked;
    //     }
    //   }
    //   else
    //     this.setClass[index] = available;
    // })
    console.log("this.setClass", this.setClass)

    let getDate = this.model.day + '/' + this.model.month + '/' + this.model.year
    let schedule = this.shedule;
    let resetShecule = []
    let newDate = false
    console.log("schedule", schedule)

    schedule.forEach((obj) => {
      let getSlot = obj.slot
      let getSeperation = obj.seperation;
      // console.log("getSlot", obj);

      if (obj.date == getDate) {
        getSlot = slot;
        getSeperation = seperation;
      }
      newDate = true
      var addData = {
        date: obj.date,
        date_remark: obj.date_remark,
        day: obj.day,
        slot: getSlot,
        seperation: getSeperation
      }
      resetShecule.push(addData)
    })

    if (newDate) {
      var addData = {
        date: getDate,
        date_remark: "remark",
        day: 'Saturday',
        slot: slot,
        seperation:seperation
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



  onSubmit(status) {

    if(!this.primary_reason){
      Swal.fire('','Please fill the reason');
      return
    }

    let weekday = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let date = this.model.day + "/" + this.model.month + "/" + this.model.year

    let timeSlot = this.timeSlot
    let slot = timeSlot //timeSlot.map((val) => val + 1)
    let remark = ""
    console.log("date", date, "timeSlot", slot)
    let sendData = {
      "date": date,
      "day": weekday[new Date( this.model.year + "/" + this.model.month + "/" + this.model.day ).getDay()],
      "slot": slot,
      "remark": this.primary_reason,
      "date_remark": this.primary_reason
    }

    console.log("stauts", status)
    console.log("sendData", sendData)

    if (slot.length < 1) {
      Swal.fire('', "Please select time slot.")
    } else {
      if(status == 'block'){
      this.blockDate(sendData)
      }
      else if(status == 'unblock'){
        this.unblockDate(sendData)
      }
      this.timeSlot = []
    }
  }

  blockDate(data) {
    console.log("data", data)
    this.userService.blockDate(data).subscribe((result) => {
      let status = null
      try { status = result['message']['status'] } catch (e) { }

      console.log('status', status);
      if (this.userService.home(status)) {
      console.log("blockDateResult", result)
      Swal.fire('', 'Sucessfully Blocked the date')
      this.home()
      }
    },
      error => {
        console.log("blockDateError", error);
      })
  }

  unblockDate(data){

    this.userService.unblockDate(data).subscribe((result) => {
      let status = null
      try { status = result['message']['status'] } catch (e) { }

      console.log('status', status);
      if (this.userService.home(status)) {
      console.log("blockDateResult", result)
      Swal.fire('', 'Sucessfully UnBlocked the date')
      this.home()
    }
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
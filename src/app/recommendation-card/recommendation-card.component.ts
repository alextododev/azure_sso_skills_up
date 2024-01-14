import {Component, Input, OnInit, Output} from '@angular/core';
import {RecoService} from "../reco.service";
import Swal from 'sweetalert2';
import EventEmitter from "node:events";

@Component({
  selector: 'app-recommendation-card',
  templateUrl: './recommendation-card.component.html',
  styleUrl: './recommendation-card.component.css'
})
export class RecommendationCardComponent implements OnInit{
  constructor(private recosService: RecoService) { }
  @Input() courseId: string = "none";
  @Input() courseTitle: string = 'Course Title';
  @Input() course: string = 'my course';
  @Input() type: string = 'inf';
  @Input() score: number = 10;
  @Input() link: string = 'https://www.google.com';
  @Input() ImageUrl: string = '';
  @Input() ifRemoveBtn: boolean = true
  @Input() preference: string = 'general'

  public rate: string = "none";

  // @Output() messageEvent = new EventEmitter<string>();
  ngOnInit(): void {
  }
    /*delivers link to image depends on the course type*/
  public getImage(course: String, type:String) {
    if (course != null) {
      /*console.log(course)*/
       // check for generic img url
       if (this.ImageUrl == "https://static-na2intel.sabacloud.com/assets/s/1jetsrdbrulv9/spf/skin/wireframe/media/images/Course_280x140.png") {

         console.log("General Img to change:", course)
         let asciiCodeLastNum = this.courseTitle.slice(1).charCodeAt(0);
          if (0 < asciiCodeLastNum && asciiCodeLastNum < 127){
            let oldRange = 127 - 1
            let newRange = 11 - 1
            let newValue = (((asciiCodeLastNum - 1) * newRange) / oldRange) + 1
          // console.log("On random:" + newValue)
          console.log("returned:",Math.round(newValue), ":",asciiCodeLastNum,":",this.courseTitle.slice(-1))
          return './assets/images/fab28_random_imgs/'+Math.round(newValue)+'.jpg'
        }
        else{
          return './assets/images/fab28_random_imgs/'+1+'.jpg'
        }

      }
      if (this.ImageUrl != null) {
        return this.ImageUrl
      }

      if (course.includes('Fab')) {
        return './assets/images/Fab.jpg'
      }

      if (course.includes('Ergonomic')) {
        return './assets/images/images_Ergonomic.jpg'
      }

      if (course.includes('Hazcom')) {
        return './assets/images/images_HAZCOM.jpg'
      }

      if (course.includes('HoloLens')) {
        return './assets/images/growPro hp new2_Virtual.jpg'
      }

      if (course.includes('tools')) {
        return './assets/images/growPro hp new2_Equipment.jpg'
      }

      if (course.includes('Schematics')) {
        return './assets/images/growPro hp new2_Architecture.jpg'
      }

      if (course.includes('Privacy')) {
        return './assets/images/links-05.jpg'
      }
      if (course.includes('System')) {
        return './assets/images/system.jpg'
      }

      if (course.includes('EXPORT')) {
        return './assets/images/links-06.jpg'
      }

      if (course.includes('Process')) {
        return './assets/images/images_Process.jpg'
      }

      if (course.includes('Quality')) {
        return './assets/images/images_Quality.jpg'
      }

      if (course.includes('Safety')) {
        return './assets/images/images_Safety.jpg'
      }

      if (course.includes('Security')) {
        return './assets/images/images_Security.jpg'
      }

      if (course.includes('WAFER')) {
        return './assets/images/images_WAFER.jpg'
      }

      if (course.includes('LOT')) {
        return './assets/images/LOT.png'
      }

      if (course.includes('Robot')) {
        return './assets/images/images_Robot.jpg'
      }

      if (course.includes('Augmented')) {
        return './assets/images/images_Augmented.jpg'
      }

      if (course.includes('Innovation')) {
        return './assets/images/images_Innovation.jpg'
      }

      if (course.includes('L1')) {
        return './assets/images/images_L1.jpg'
      }

      if (course.includes('L2')) {
        return './assets/images/images_L2.jpg'
      }

      if (course.includes('L3')) {
        return './assets/images/images_L3.jpg'
      }
      // random image from assets random
      if (type.includes('FAB28')){
        // console.log("text length",this.courseTitle.slice(-1));
        // console.log(this.courseTitle.slice(-1).charCodeAt(0));
        let asciiCodeLastNum = this.courseTitle.slice(-1).charCodeAt(0);
        if (0 < asciiCodeLastNum && asciiCodeLastNum < 127){
          let oldRange = 127 - 1
          let newRange = 11 - 1
          let newValue = (((asciiCodeLastNum - 1) * newRange) / oldRange) + 1
          // console.log("On random:" + newValue)
          return './assets/images/fab28_random_imgs/'+Math.round(newValue)+'.jpg'
        }
        else{
          return './assets/images/fab28_random_imgs/'+1+'.jpg'
        }
      }

      else {
        return './assets/images/links-03.jpg'
      }
    }
    else {
      return './assets/images/links-08.jpg'
    }
  }

   goToLink() {
    let body = {
      'Course': this.courseTitle,
      'CourseId': this.courseId,
      'Link': this.link,
      'ImageUrl': this.ImageUrl
    }
     this.recosService.logCourseVisitLink(body).subscribe(
      (data: any) => {
        console.log(data)
      }
    );
    window.open(this.link, "_blank");
  }

    public lograting(rate: String) {
    /*Log obejct body to bakcend*/
    let body = {
      'Course': this.courseTitle,
      'CourseId': this.courseId,
      'Link': this.link,
      'ImageUrl': this.ImageUrl,
      'Rating': rate,
      'Source': this.type,
      'preference' : this.preference
    }
    /**Dislike - logs data to Mongo DB*/
    if (rate == 'dislike') {
      /**Sweet alert pop up for remove confirmation*/
      Swal.fire({
        title: 'Do you want to remove that course recommendation?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Remove',
        denyButtonText: `Don't remove`,
      }).then((result) => {
        /**User has confirmed the removal*/
        if (result.isConfirmed) {
          /*start request to be*/
          this.recosService.lograteing(body).subscribe(
            (data: any) => {
              console.log(data);
              this.getrating();
            }
          );
          /**Logs DISLIKE to mongo DB*/
          Swal.fire('Removed', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })

    }
    /**Liked clicked - logs data to Mongo DB*/
    else {
      console.log("clicked like")
      /** subcase . case when class is already liked*/
      if (this.rate=="like"){
        console.log("Course is already liked and will be unliked")
        /**Updating the body with None value */
        body.Rating = 'like_canceled'
        console.log(body)
      }
      /**subcase when class was not liked before - FIRST TIME LIKE*/
       /*start request to be*/
        this.recosService.lograteing(body).subscribe(
          (data: any) => {
            console.log(data);
            this.getrating();
          }
        );

    }

    }
      public getrating() {
    let body = { 'Course': this.courseTitle }
    this.recosService.checkrate(body).subscribe(
      (data: any) => {
        // console.log("rate body:", body)
        this.rate = data.status;
        /**If rating is dislike removes course card from the list*/
        if (this.rate == 'dislike') {
          // Need to complete !!!!!!!!!!!!!!!!!!!
          // this.messageEvent.emit(this.courseTitle);
        }
      }

    );
  }


}

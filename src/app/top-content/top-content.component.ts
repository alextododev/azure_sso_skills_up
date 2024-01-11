import {Component, OnInit} from '@angular/core';
import {RecoService} from "../reco.service";

@Component({
  selector: 'app-top-content',
  templateUrl: './top-content.component.html',
  styleUrl: './top-content.component.css'
})
export class TopContentComponent implements OnInit{
  constructor(private recosService: RecoService) { }
  public course: String = 'Course name is Course name';
  public whatsHotUrl = 'https://apps.powerapps.com/play/e/default-46c98d88-e344-4ed4-8496-4ed7712e255d/a/ee51e042-ce6d-4683-aac2-50c68ab2172a?tenantId=46c98d88-e344-4ed4-8496-4ed7712e255d?hidenavbar=true&screen=whats_new';
  public whatsHotImage = "assets/images/placeholder.jpg";
  /*Fake multiplay likes*/
  public repeated_count = 10;
  /*current date and work week number*/
  public workWeekNumber = 0;

  ngOnInit(): void {
    this.getWhatsHot();
    this.calcWorkWeek();
    console.log('whats hot');
  }

   goToLink() {
    window.open("https://apps.powerapps.com/play/e/default-46c98d88-e344-4ed4-8496-4ed7712e255d/a/ee51e042-ce6d-4683-aac2-50c68ab2172a?tenantId=46c98d88-e344-4ed4-8496-4ed7712e255d?hidenavbar=true&screen=whats_new", "_blank");
  }

    calcWorkWeek() {
    let currentDate: any = new Date();
    let startDate: any = new Date(currentDate.getFullYear(), 0, 1);
    var days: number = Math.floor((currentDate - startDate) /
      (24 * 60 * 60 * 1000));

    var weekNumber = Math.ceil(days / 7);

    // Display the calculated result
    this.workWeekNumber = weekNumber;
    console.log("Week number of " + currentDate +
      " is :   " + weekNumber)

  }

  getWhatsHot() {
    this.recosService.get_whats_hot().subscribe(
      (data: any) => {
        console.log(data);
        this.course = data.Course
        this.whatsHotUrl = data.Link
        this.whatsHotImage = data.ImageUrl
        this.repeated_count = Number(data.count)
      }
    );
  }

  whatsHotGoToLink() {
    window.open(this.whatsHotUrl)
  }

}

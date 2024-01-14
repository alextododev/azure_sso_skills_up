import {Component, OnInit} from '@angular/core';
import {RecoService} from "../reco.service";
import { UserProfileService} from "../user-profile.service";



@Component({
  selector: 'app-ee-class-data',
  templateUrl: './ee-class-data.component.html',
  styleUrl: './ee-class-data.component.css'
})
export class EeClassDataComponent implements OnInit{
  public completedClasses : any =[];
  public mngRecommended:any = [];
  public completedClassesColumns:string[] = ['Title','CompletedAt','Provider']
  private user:any;
  ngOnInit(): void {
    this.getCompletedClasses();
    this.getMngRecommendedClasses();

  }
  constructor(
    private recoService: RecoService,
    private userProfileService: UserProfileService
  ) {
    this.userProfileService.current_user.subscribe(user_profile =>this.user = user_profile)
  }
  getCompletedClasses(){
    this.recoService.getCompletedClasses(this.user['jobTitle']).subscribe(
      resp=>{
        this.completedClasses = resp
        this.completedClasses.reverse();
        // console.log("Length:",this.completedClasses)
      },
      error => {

      }
    )
  }

    getMngRecommendedClasses(){
    this.recoService.getMngRecommendedClasses(this.user['mail']).subscribe(
      resp=>{
        // console.log(resp)
        this.mngRecommended = resp
        console.log("Mng recommended:", this.mngRecommended)
      },
      error => {
        console.log(error)
      }
    )
  }

}

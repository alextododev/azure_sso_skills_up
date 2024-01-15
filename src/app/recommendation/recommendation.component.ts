import {Component, OnInit} from '@angular/core';
import { RecoService} from "../reco.service";
import { RecoRefreshService} from "../reco-refresh.service";
import { UserProfileService} from "../user-profile.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrl: './recommendation.component.css'
})
export class RecommendationComponent implements OnInit{
  private user:any;
  constructor(private recoService: RecoService,private recoRefresh: RecoRefreshService, private userProfileService: UserProfileService) {
    this.userProfileService.current_user.subscribe(user_profile =>{
      this.user = user_profile;
      if (this.user!='no user'){
        this.getReco("");
      }
      });
    this.recoRefresh.currentMessage.subscribe(message =>{
      // Reloads the recos only if user is signed and check if reloads comes from preference update
      if (message!="default message" && this.user!='no user'){
        this.getReco("");
      }
    })
  }
  ngOnInit(): void {

  }

  public recommendations: any = ""
  public cards_count: number = 20;
  public results_choice : any = null;

  /*Ger reco function - request to backend */
  getReco(msgNewChoices:string) {
    this.recoService.get_recommendation(this.user['jobTitle']).subscribe(
      (resp: any) => {
        this.recommendations = resp
        console.log("DATA",this.recommendations);
      },
      /*Request failed*/
      (error) => {
        console.log("Error reco:",error.error)
         // Swal.fire(error.error, '', 'error');

      }
    )
  }
  public remove_course($event: any) {
    console.log("remove:", $event)
    let index = this.recommendations.findIndex((obj: any) => {
      return obj.recommendation_description === $event
    });
    if (index !== -1) {
      this.recommendations.splice(index, 1);
    }
    console.log(this.recommendations);

  }


}

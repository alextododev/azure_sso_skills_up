import {Component, OnInit} from '@angular/core';
import { RecoService} from "../reco.service";


@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrl: './recommendation.component.css'
})
export class RecommendationComponent implements OnInit{
  constructor(private recoService: RecoService) {
  }
  ngOnInit(): void {
  }
  public extend: boolean = false;
  public data: any = ""
  public recommendations: any = ""
  public cards_count: number = 20;
  public results_choice : any = null;

  /*Ger reco function - request to backend */
  getreco(msgNewChoices:string) {
    this.recoService.get_recommendation().subscribe(
      (resp: any) => {
        this.data = resp
        this.recommendations = this.data.data['ndarray']
        console.log("DATA",this.recommendations);
      },
      /*Request failed*/
      (error) => {
        console.log("Error reco:",error.error)
         // Swal.fire(error.error, '', 'error');

      }
    )
  }

}

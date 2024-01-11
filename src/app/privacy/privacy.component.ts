import { Component } from '@angular/core';
import { RecoService} from "../reco.service";
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {PreferenceComponent} from "../preference/preference.component";

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.css'
})
export class PrivacyComponent {
  constructor(private reco_service: RecoService,public dialog: MatDialog) {
  }
   logvistorsign() {
    this.reco_service.new_user_sign().subscribe(
      (resp: any) => {
        console.log("Response from log", resp);
        /*after privacy dialog closed -> goes to preference window*/
       this.openPrefDialog();
      },
      (error) => {
        console.log(error)
        this.openPrefDialog();
      }
    )
  }

  /*Open prefernce dialog after close privacy notice*/
  public openPrefDialog() {
    /*Check if user already has submitted the pref form*/
    this.reco_service.ifPerenceSummited().subscribe(
      (resp: any) => {
        console.log('If submitted', resp.status)
        /*User has never submitted the preferences before*/
        if (resp.status == false) {
          const prefRef = this.dialog.open(PreferenceComponent, {
            height: '1130px',
            width: '640px',
          });
          prefRef.afterClosed().subscribe((result: any) => {
            console.log('preference done')
          })
        }
      }
    )
  }

}

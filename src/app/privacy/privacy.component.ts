import { Component } from '@angular/core';
import { RecoService} from "../reco.service";
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {PreferenceComponent} from "../preference/preference.component";
import {UserProfileService} from "../user-profile.service";
import {UserPreferenceService} from "../user-preference.service";

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.css'
})
export class PrivacyComponent {
  private user:any;
  constructor(private recoService: RecoService,public dialog: MatDialog,private userProfileService: UserProfileService) {
    this.userProfileService.current_user.subscribe(user_profile =>this.user = user_profile)

  }
   logVisitorSign() {
    this.recoService.new_user_sign(this.user['jobTitle'],this.user['displayName']).subscribe(
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

  /*Open preference dialog after close privacy notice*/
  public openPrefDialog() {
    /*Check if user already has submitted the pref form*/
    this.recoService.ifPreferenceSummited(this.user['jobTitle']).subscribe(
      (resp: any) => {
        console.log('If submitted', resp.status)
        /*User has never submitted the preferences before*/
        if (resp.status == false) {
          const prefRef = this.dialog.open(PreferenceComponent, {
            height: '800px',
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

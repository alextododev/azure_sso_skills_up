import {Component, Inject, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {AboutComponent} from "../about/about.component";
import {EeClassDataComponent} from "../ee-class-data/ee-class-data.component";
import { HttpClient } from '@angular/common/http';
import {AuthenticationResult, AuthError, InteractionType, PopupRequest, RedirectRequest} from "@azure/msal-browser";
import {MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService} from "@azure/msal-angular";
import {UserProfileService} from "../user-profile.service";
import {RecoService} from "../reco.service";
import {PrivacyComponent} from "../privacy/privacy.component";
import {PreferenceComponent} from "../preference/preference.component";
import {UserPreferenceService} from "../user-preference.service";

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';


  type ProfileType = {
  displayName? : string,
  givenName?: string ,
  surname?: string,
  userPrincipalName?: string,
  id?: string,
  jobTitle?: string
}
@Component({
  selector: 'app-top-banner',
  templateUrl: './top-banner.component.html',
  styleUrl: './top-banner.component.css'
})
export class TopBannerComponent implements OnInit{
  public profile_user!: ProfileType;
  @Input() if_logged : boolean = false;

  constructor(public dialog: MatDialog,
              private http: HttpClient,
              @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
              private authService: MsalService,
              private msalBroadcastService: MsalBroadcastService,
              private userProfileService: UserProfileService,
              private recoService: RecoService,
              private userPreferencesService : UserPreferenceService) {}

    ngOnInit(): void {
    this.getProfile();
  }
  openAbout() {
    const noticeRef = this.dialog.open(AboutComponent, {
      height: '1020px',
      width: '680px',
    });
    noticeRef.afterClosed().subscribe(result => {
    })
  }

  openNotice() {
    const noticeRef = this.dialog.open(PrivacyComponent, {
      height: '640px',
      width: '640px',
    });
    noticeRef.afterClosed().subscribe(result => {
      console.log('noticeRead')
    })
  }
    openEeClassData(){
    const noticeRef = this.dialog.open(EeClassDataComponent, {
      height: '800px',
      width: '740px',
    });
    noticeRef.afterClosed().subscribe(result => {
    })
  }
  getProfile() {
    console.log("Getting profile")
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile_user = profile;
        console.log("profile:", this.profile_user)
        this.userProfileService.update_user(profile)
      //   After user was recognized logs user visit in Mongo DB
        this.logVisitor();
      },
        error => {
          console.log("Getting profile error")
        });
  }

  login() {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      if (this.msalGuardConfig.authRequest) {
        this.authService.loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      } else {
        this.authService.loginPopup()
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      }
    } else {
      if (this.msalGuardConfig.authRequest) {
        this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
      } else {
        this.authService.loginRedirect();
      }
    }
  }

  logout() {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      this.authService.logoutPopup({
        postLogoutRedirectUri: "/",
        mainWindowRedirectUri: "/"
      });
    } else {
      this.authService.logoutRedirect({
        postLogoutRedirectUri: "/",
      });
    }
  }

  logVisitor() {
    // Logs the user visit
    console.log("STEP 1 : Logging the user to mongo DB")
    this.recoService.log_user_visit(this.profile_user.jobTitle,this.profile_user.displayName).subscribe(
      (resp: any) => {
        console.log("Response from log", resp)
        this.ifSigned();
      },
      (error) => {
        console.log(error)
      }
    )
  }

    ifSigned() {
    // Check if User already signed the privacy policy
    console.log("STEP 2 : ID SIGNED REQUEST:")
    this.recoService.if_user_privacy_sign(this.profile_user.jobTitle).subscribe(
      (resp: any) => {
        /*If user not singed the policy -> opens dialog privacy*/
        if (resp.status === false) {
          console.log("Response false, first time visit", resp);
          this.openNotice();
        }
        else {
          console.log("User already signed the privacy", resp);
          /*Opens preferences dialog if */
          this.openPreferences('func');
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  openPreferences(event: any) {
    if (event == 'button') {
      const prefRef = this.dialog.open(PreferenceComponent, {
        height: '1130px',
        width: '640px',
      });
      prefRef.afterClosed().subscribe(result => {
        console.log('preference done')
      })
    }
    /*Else cases when function is called from other function and does API call*/
    else {
      /*Check if user already has submitted the pref form*/
      this.recoService.ifPreferenceSummited(this.profile_user.jobTitle).subscribe(
        (resp: any) => {
          /*console.log('If submitted', resp.status)*/
          /*User has never submitted the preferences before*/
          if (resp.status == false) {
            const prefRef = this.dialog.open(PreferenceComponent, {
              height: '1130px',
              width: '640px',
            });
            prefRef.afterClosed().subscribe(result => {
              console.log('preference done')
            })
          }
          else {
            this.userPreferencesService.userPreferences(resp.status)
          }
        }
      )
    }
  }



}

import {Component, Inject, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {AboutComponent} from "../about/about.component";
import {EeClassDataComponent} from "../ee-class-data/ee-class-data.component";
import { HttpClient } from '@angular/common/http';
import {AuthenticationResult, AuthError, InteractionType, PopupRequest, RedirectRequest} from "@azure/msal-browser";
import {MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService} from "@azure/msal-angular";
const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

  type ProfileType = {
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
  profile_user!: ProfileType;
  @Input() if_logged : boolean = false;

  constructor(public dialog: MatDialog,
              private http: HttpClient,
              @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
              private authService: MsalService,
              private msalBroadcastService: MsalBroadcastService) {}

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
        console.log(profile)
        console.log("Getting profile done")
        console.log("profile:", this.profile_user)
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



}

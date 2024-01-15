import {Component, OnInit} from '@angular/core';
import {MsalBroadcastService, MsalService} from "@azure/msal-angular";
import {filter} from "rxjs";
import {AuthenticationResult, EventMessage,EventType} from "@azure/msal-browser";
import { HttpClient } from '@angular/common/http';
import {UserProfileService} from "../user-profile.service";

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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  public profile_user!: ProfileType;
  loginDisplay = false;

   constructor(private authService: MsalService,
               private msalBroadcastService: MsalBroadcastService,
               private http: HttpClient,
               private userService: UserProfileService) { }

  ngOnInit(): void {
      this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      )
      .subscribe((result: EventMessage) => {
        console.log(result);
        const payload = result.payload as AuthenticationResult;
        this.authService.instance.setActiveAccount(payload.account);
      });
      this.getProfile();
      this.setLoginDisplay();

  }
  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  getProfile() {
    console.log("Getting profile")
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile_user = profile;
        console.log("profile:", this.profile_user)
        this.userService.update_user(profile)

      },
        error => {
          console.log("Getting profile error")
        });
  }

}

import {Component, OnInit} from '@angular/core';
import {MsalBroadcastService, MsalService} from "@azure/msal-angular";
import {filter} from "rxjs";
import {AuthenticationResult, EventMessage,EventType} from "@azure/msal-browser";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  loginDisplay = false;

   constructor(private authService: MsalService, private msalBroadcastService: MsalBroadcastService, private http: HttpClient) { }

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
      this.setLoginDisplay();
  }
  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;


  }

}

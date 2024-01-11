import { Component } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {AboutComponent} from "../about/about.component";
import {EeClassDataComponent} from "../ee-class-data/ee-class-data.component";
import { HttpClient } from '@angular/common/http';
const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

  type ProfileType = {
  givenName?: string,
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
export class TopBannerComponent {
  profile!: ProfileType;
  constructor(public dialog: MatDialog, private http: HttpClient) {}
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
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile;
        console.log("profile:", this.profile)
      });
  }

}

import { Component } from '@angular/core';
import {PrivacyComponent} from "../privacy/privacy.component";
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(
    public dialog: MatDialog
  ) {
  }
   openNotice() {
    const noticeRef = this.dialog.open(PrivacyComponent, {
      height: '900px',
      width: '680px',
    });
    noticeRef.afterClosed().subscribe(result => {
    })
  }

}

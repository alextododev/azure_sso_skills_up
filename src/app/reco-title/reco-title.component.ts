import { Component } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {PreferenceComponent} from "../preference/preference.component";

@Component({
  selector: 'app-reco-title',
  templateUrl: './reco-title.component.html',
  styleUrl: './reco-title.component.css'
})
export class RecoTitleComponent {
  constructor(
    public dialog: MatDialog
  ) {
  }
  openPreferences() {
    const prefRef = this.dialog.open(PreferenceComponent, {
      height: '1130px',
      width: '640px',
    });
    prefRef.afterClosed().subscribe(result => {
      console.log('prefernce done')
    })

  }

}

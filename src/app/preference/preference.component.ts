import {Component, OnInit} from '@angular/core';
import { RecoService} from "../reco.service";
import { UserProfileService} from "../user-profile.service";
import { RecoRefreshService} from "../reco-refresh.service";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrl: './preference.component.css'
})
export class PreferenceComponent implements OnInit{
  private user:any;
  public countChecked: number = 0;
  private chekcedIds: number[] = [];
  private checkedIds_cur : number[] = [];
  public prefernces_items_db: any = []
  private prefs_count: number = 5;
  private newChoices: string[] = []
  constructor(private recoServices: RecoService,
              private recoRefresh: RecoRefreshService,
              private userProfileService: UserProfileService
              ) {
    this.userProfileService.current_user.subscribe(user_profile =>this.user = user_profile)
  }

  ngOnInit(): void {
    this.getPreferences();
  }

  public getPreferences() {
    this.recoServices.get_prefernces(this.user['jobTitle']).subscribe(
      (data: any) => {
        console.log("Null pres are:",data);
        this.prefernces_items_db = data;
        /*Loop over received data and updates the view*/
        this.prefernces_items_db.forEach((item: any, index:any) => {
          if (item['status'] == true) {
            this.countChecked += 1;
            this.chekcedIds.push(index);

          }
        })
        this.checkedIds_cur = Object.values(this.chekcedIds);
        console.log("User preferences:",this.prefernces_items_db);
        console.log("Checked items numbers:", this.chekcedIds);
      })
  }

  public onChange(ob: MatCheckboxChange, id: number) {
    if (ob.checked) {
      this.prefernces_items_db[id].status = true;
      this.countChecked += 1;
      this.chekcedIds.push(id);
      console.log(this.chekcedIds)
      console.log(this.countChecked)
    }
    else {
      this.prefernces_items_db[id].status = false;
      console.log("Item to remove", id)
      this.countChecked -= 1;
      /*remove item from array of checked items*/
      const index = this.chekcedIds.indexOf(id);
      console.log("Index to remove", index)
      if (index > -1) {
        this.chekcedIds.splice(index, 1);
      }
      console.log("Array length", this.chekcedIds.length)
      console.log(this.chekcedIds)
      console.log(this.countChecked)
    }

  }

  public ifCheckBoxDisable(id: number) {
    if (this.countChecked >= this.prefs_count && !this.chekcedIds.includes(id)) {
      return true
    }
    else {
      return false
    }
  }

    public storepref() {
    // console.log( this.prefernces_items_db)
    /*1. Old to new Compare*/
    // console.log("OLD", this.checkedIds_cur);
    // console.log("New", this.chekcedIds)
    // Checks for unique id after user has checked new preference
    let unique2 = this.chekcedIds.filter(
      (o) => this.checkedIds_cur.indexOf(o) === -1);

    let unique1 = this.checkedIds_cur.filter(
      (o) => this.chekcedIds.indexOf(o) === -1);

    console.log("New choices 1 ids:", unique1);
    console.log("New choices 2 ids:", unique2);
    this.newChoices = unique2.map((item) => this.prefernces_items_db[item].subject)

    // updated the time for last pref changes
    unique2.forEach((item) => {
      this.prefernces_items_db[item]['last_cng_time'] = new Date().toLocaleString()
      this.prefernces_items_db[item]['new_choice'] = true

    });

    //update the cancel items last time
     unique1.forEach((item) => {
      this.prefernces_items_db[item]['last_cng_time'] = new Date().toLocaleString()
      this.prefernces_items_db[item]['new_choice'] = false

    });

    console.log(this.newChoices)
    console.log(this.prefernces_items_db)


        /*2. API call bring new choice*/
        /*3. Connect new classes to current package*/

    this.recoServices.store_pref(this.prefernces_items_db,this.user["jobTitle"]).subscribe(
      (resp: any) => {
        console.log(resp)
        this.checkedIds_cur = [];

        /*after preferences were stored reloads recos*/
        this.recoRefresh.changeMessage("reload data")

      })


  }



}

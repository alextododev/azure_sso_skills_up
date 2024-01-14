import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private  user_profile  = new BehaviorSubject('no user')
  current_user = this.user_profile.asObservable()
  constructor() { }
  update_user(user:any){
    this.user_profile.next(user);
  }
}

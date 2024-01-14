import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserPreferenceService {
  userPreferences: any;
  constructor() { }
  public updatePreferences(preferences:any){
    this.userPreferences = preferences;
  }
}

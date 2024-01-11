import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {



  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  constructor(private httpClient:HttpClient) { }

  search(user:string ,userInput:string){
    return this.httpClient.get("https://el-search-skills-up.apps1-lc-int.icloud.intel.com/" + user +"/" + userInput)
  }

   changeMessage(message: string) {
    this.messageSource.next(message)
  }
}

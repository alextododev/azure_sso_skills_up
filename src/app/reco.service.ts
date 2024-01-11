import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RecoService {




  //private url = "https://todorova-mobl.ger.corp.intel.com";

  private url = "https://skillsup.apps1-lc-int.icloud.intel.com";
  constructor(private http: HttpClient) { }

  public get_recommendation() {
    return this.http.get(this.url + '/reco/');
    /**return this.http.get('/reco')*/
  }
  public get_user_name() {
    return this.http.get(this.url + '/getdetails');
    /**return this.http.get('/getdetails')*/
  }
  public log_user_visit() {
    return this.http.get(this.url + '/logvisit/');
  }

  public new_user_sign() {
    return this.http.get(this.url + '/logsign/');
  }

  public if_user_privacy_sign() {
    return this.http.get(this.url + '/logifsign/');
  }

  public lograteing(body: any) {
    return this.http.post(this.url + '/rateing/', body);
  }

  public checkrate(body: any) {
    return this.http.post(this.url + '/getrate/', body);
  }

  public get_prefernces() {
    return this.http.get(this.url + '/getpreferences/');
  }

  public get_whats_hot() {
    return this.http.get(this.url + '/whatshot/');
  }

  public get_about() {
    return this.http.get(this.url + '/getpabout/');
  }

  public store_pref(body: any) {
    return this.http.post(this.url + '/storepref/', body);
  }

  public ifPerenceSummited() {
    return this.http.get(this.url + '/ifprefsubmitted/');
  }

  public logCourseVisitLink (body: any) {
    return this.http.post(this.url + '/courselinkvisit/', body);
  }

  public getF28Classes(){
    return this.http.get("https://saba-cal.apps1-lc-int.icloud.intel.com/getclasses")
  }

  public getCompletedClasses(){
    return this.http.get(this.url+ "/complclasses/")
  }

  public getMngRecommendedClasses(){
    return this.http.get(this.url +"/mngrecommended/")
  }
}

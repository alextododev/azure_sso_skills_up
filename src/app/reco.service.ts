import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RecoService {




  //private url = "https://todorova-mobl.ger.corp.intel.com";

  // private url = "https://skillsup.apps1-lc-int.icloud.intel.com";
  private url = "http://10.245.180.106:8000"
  constructor(private http: HttpClient) { }

  public get_recommendation() {
    return this.http.get(this.url + '/reco/');
    /**return this.http.get('/reco')*/
  }
  public get_user_name() {
    return this.http.get(this.url + '/getdetails');
    /**return this.http.get('/getdetails')*/
  }
  public log_user_visit(user_wwid:any, user_name:any) {
    return this.http.get(this.url + '/logvisit/'+user_wwid+"/"+user_name+"/");
  }

  public new_user_sign(user_wwid:any, user_name:any) {
    return this.http.get(this.url + '/logsign/'+user_wwid+"/"+user_name+"/");
  }

  public if_user_privacy_sign(user_wwid: any) {
    return this.http.get(this.url + '/logifsign/'+user_wwid+"/");
  }

  public lograteing(body: any) {
    return this.http.post(this.url + '/rateing/', body);
  }

  public checkrate(body: any) {
    return this.http.post(this.url + '/getrate/', body);
  }

  public get_prefernces(user_wwid:any) {
    return this.http.get(this.url + '/getpreferences/'+user_wwid+"/");
  }

  public get_whats_hot() {
    return this.http.get(this.url + '/whatshot/');
  }

  public get_about() {
    return this.http.get(this.url + '/getpabout/');
  }

  public store_pref(body: any, user_wwid:any) {
    return this.http.post(this.url + '/storepref/'+user_wwid+"/", body);
  }

  public ifPreferenceSummited(user_wwid:any) {
    return this.http.get(this.url + '/ifprefsubmitted/'+user_wwid+"/");
  }

  public logCourseVisitLink (body: any) {
    return this.http.post(this.url + '/courselinkvisit/', body);
  }

  public getF28Classes(){
    return this.http.get("https://saba-cal.apps1-lc-int.icloud.intel.com/getclasses")
  }

  public getCompletedClasses(user_wwid:any){
    return this.http.get(this.url+ "/complclasses/"+ user_wwid)
  }

  public getMngRecommendedClasses(user_email:string){
    return this.http.get(this.url +"/mngrecommended/"+user_email)
  }
}

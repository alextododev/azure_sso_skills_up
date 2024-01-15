import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RecoService {




  //private url = "https://todorova-mobl.ger.corp.intel.com";

  // private url = "https://skillsup.apps1-lc-int.icloud.intel.com";
  private url = "http://10.187.4.162:8000"
  constructor(private http: HttpClient) { }

  public get_recommendation(user_wwid:any) {
    return this.http.get(this.url + '/reco/'+ user_wwid+"/");
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


  // public logRating(body: any, user_wwid:any) {
  //   console.log("body rate",body)
  //   return this.http.post<any>(this.url + '/rateing/'+ user_wwid+"/", null);
  // }

  public logRate(body:any, user_wwid:any){
    return this.http.post(this.url + '/lograte/' + user_wwid, body)
  }
  public store_pref(body: any, user_wwid:any) {
    console.log("body",body)
    return this.http.post(this.url + '/storepref/'+user_wwid+"/", body);
  }

  public checkRate(body: any,user_wwid:any) {
    return this.http.post(this.url + '/getrate/'+user_wwid+"/", body);
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



  public ifPreferenceSummited(user_wwid:any) {
    return this.http.get(this.url + '/ifprefsubmitted/'+user_wwid+"/");
  }

  public logCourseVisitLink (body: any, user_wwid: any) {
    return this.http.post(this.url + '/courselinkvisit/'+ user_wwid + "/", body);
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

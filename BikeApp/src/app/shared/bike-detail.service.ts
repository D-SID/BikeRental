import { Injectable } from '@angular/core';
import { BikeDetail } from './bike-detail.model';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class BikeDetailService {

  constructor(private http:HttpClient) { }
  formData:BikeDetail = new BikeDetail();
  readonly baseURL = 'http://localhost:59001/api/BikeDetails'
  list : BikeDetail[];

  postBikeDetail(){
    return this.http.post(this.baseURL,this.formData);
  }
  putBikeDetail(){
    return this.http.put(`${this.baseURL}/${this.formData.bikeId}`,this.formData);
  }
  deleteBikeDetail(id:number){
    return this.http.delete(`${this.baseURL}/${id}`);
  }
  rentBikeDetail(rent:BikeDetail){
    rent.avalible = false;
    return this.http.put(`${this.baseURL}/${rent.bikeId}`,rent);
  }
  unRentBikeDetail(rent:BikeDetail){
    rent.avalible = true;
    return this.http.put(`${this.baseURL}/${rent.bikeId}`,rent);
  }
  refreshList(){
    this.http.get(this.baseURL)
      .toPromise()
      .then(res => this.list = res as BikeDetail[]);
  }
}

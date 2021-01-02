import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BikeDetail } from '../shared/bike-detail.model';
import { BikeDetailService } from '../shared/bike-detail.service';

@Component({
  selector: 'app-bike-details',
  templateUrl: './bike-details.component.html',
  styles: [
  ]
})
export class BikeDetailsComponent implements OnInit {

  constructor(public service: BikeDetailService,
    private toast:ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }
  countAvailableBike(){
    let avaliblebike = 0;
    this.service.list?.forEach(cost =>
      {
      if (cost.avalible == true) 
        avaliblebike++;
      });
      return avaliblebike;
  }
  costRent(){
    let finalprice = 0;
    this.service.list?.forEach(cost =>
      {
      if (cost.avalible == false) 
        finalprice += cost.price
      });
      return finalprice;
  }
  onRent(rent:BikeDetail) {
    this.service.rentBikeDetail(rent)
    .subscribe(
      res=>{
        this.service.refreshList();
        this.toast.success("Rent successfully", 'Bike Rental');
      },
      err =>{console.log(err)}
      
    );
  }
  onUnRent(rent:BikeDetail) {
    this.service.unRentBikeDetail(rent)
    .subscribe(
      res=>{
        this.service.refreshList();
        this.toast.error("Cancel rent successfully", 'Bike Rental');
      },
      err =>{console.log(err)}
    );
  }
  onDelete(id:number) {
    //if(confirm('Are you shure to delete this Bike?')){
    this.service.deleteBikeDetail(id)
    .subscribe(
      res=>{
        this.service.refreshList();
        this.toast.error("Delete successfully", 'Bike Detail Register');
      },
      err =>{console.log(err)}
    );
    //}
  }
  
}

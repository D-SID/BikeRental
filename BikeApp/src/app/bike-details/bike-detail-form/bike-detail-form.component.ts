import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { BikeDetail } from 'src/app/shared/bike-detail.model';
import { BikeDetailService } from 'src/app/shared/bike-detail.service';

@Component({
  selector: 'app-bike-detail-form',
  templateUrl: './bike-detail-form.component.html',
  styles: [
    
  ]
})
export class BikeDetailFormComponent implements OnInit {

  constructor(public service:BikeDetailService, private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    this.insertRecord(form);
  }
  insertRecord(form:NgForm){
    this.service.postBikeDetail().subscribe( res =>{
      this.resetForm(form);
      this.service.refreshList();
      this.toastr.success('Submitted successfully', 'BikeRental')
    },
    err => {console.log(err);}
    );
  }
  resetForm(form: NgForm){
    form.form.reset();
    this.service.formData = new BikeDetail();
  }
}

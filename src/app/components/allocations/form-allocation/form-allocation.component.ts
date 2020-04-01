import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Allocation } from 'src/app/models/allocation';
import { AllocationService } from 'src/app/services/allocation.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-allocation',
  templateUrl: './form-allocation.component.html',
  styleUrls: ['./form-allocation.component.css']
})
export class FormAllocationComponent implements OnInit {
  form: FormGroup;
  distributeur: Allocation;
  @Input() id: any;
  @Output() displayChange = new EventEmitter();
  errorMsg: any;
  
  constructor(private allocationService: AllocationService, private fb: FormBuilder) { }

  ngOnInit(): void {
    if(this.id){
      this.onGetAllocation(this.id);
    } else {
      this.distributeur = new Allocation();
    }
  }

  onGetAllocation(id: string){
    this.allocationService.getAllocation(id).then(
      (distributeur: Allocation)=>{
        this.distributeur=distributeur;
      }
    ).catch(
      (error: any)=>{
        this.errorMsg=error;
      }
    )
  }

  onDialogHide() {
    this.distributeur = null;
    this.displayChange.emit(false);
  }
  
  ngOnDestroy() {
    this.displayChange.unsubscribe();
  }
}

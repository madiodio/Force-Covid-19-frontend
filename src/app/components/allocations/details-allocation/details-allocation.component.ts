import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AllocationService } from 'src/app/services/allocation.service';
import { Allocation } from 'src/app/models/allocation';

@Component({
  selector: 'app-details-allocation',
  templateUrl: './details-allocation.component.html',
  styleUrls: ['./details-allocation.component.css']
})
export class DetailsAllocationComponent implements OnInit {
  distributeur: Allocation;
  @Input() id: any;
  @Output() displayChange = new EventEmitter();
  errorMsg: any;
  
  constructor(private allocationService: AllocationService) { }

  ngOnInit(): void {
    if(this.id){
      this.onGetAllocation(this.id);
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

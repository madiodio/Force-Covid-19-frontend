import { Component, OnInit } from '@angular/core';
import { Allocation } from 'src/app/models/allocation';
import { SearchCriteria } from 'src/app/models/search-critaria';
import { AllocationService } from 'src/app/services/allocation.service';
import { Subject, Subscription } from 'rxjs';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-list-allocation',
  templateUrl: './list-allocation.component.html',
  styleUrls: ['./list-allocation.component.css']
})
export class ListAllocationComponent implements OnInit {
  
  listItems: Allocation[];
  cols: any[];

  selectedItems: Allocation[];
  totalRecords: number=0;
  searchCriteriaSubject=new Subject<SearchCriteria>();
  searchCriteria: SearchCriteria= new SearchCriteria();
  itemSubscription: Subscription;
  searchCriteriaSubscription: Subscription;
  totalRecordsSubscription: Subscription;

  loading: boolean = true;

  errorMsg: any;

  constructor(private allocationService: AllocationService, private global: GlobalService) { }

  ngOnInit(): void {

    this.cols = [
      { field: 'welfare', header: 'Bien' },
      { field: 'beneficiary', header: 'Bénéficiaire' },
      { field: 'confirmationCode', header: 'Code de confirmation' },
      { field: 'confirmationCode', header: 'Stock' },
      { field: 'deliverer', header: 'Livreur' },
      { field: 'status', header: 'Status' },
      { field: 'updated', header: 'Date mise à jour' }
    ];
   
    this.itemSubscription=this.allocationService.allocationsSubject.subscribe(
      (results: Allocation[])=>{
        this.listItems=results;
        this.loading=false;
      }
    );
    this.totalRecordsSubscription=this.allocationService.totalRecordsSubject.subscribe(
      (totalRecords: number)=>{
        this.totalRecords=totalRecords;
      }
    );
    //pipe(debounceTime(500),distinctUntilChanged()).
    this.searchCriteriaSubscription=this.searchCriteriaSubject.subscribe(
      (searchCriteria: SearchCriteria)=>{
        console.log(this.searchCriteria)
        this.allocationService.getAllocations(searchCriteria);
      }
    );
    this.allocationService.getAllocations(this.searchCriteria);
  
  }


  ngOnDestroy(){
    if(this.itemSubscription){
      this.itemSubscription.unsubscribe();
    }
    if(this.searchCriteriaSubscription){
      this.searchCriteriaSubscription.unsubscribe();
    }
    if(this.totalRecordsSubscription){
      this.totalRecordsSubscription.unsubscribe();
    }
  }

  //Call this method in form filter template
  onSetSearchCriteria(){
    this.searchCriteriaSubject.next(this.searchCriteria);
  }

  loadItemLazy(event: any){
    this.searchCriteriaSubject.next(this.global.prepareSearchCriteria(event,this.searchCriteria));
  }

  removeItme(id: number){
    this.allocationService.deleteAllocation(id).then(
      (response: any)=>{
        //continued!!!
      }
    ).catch(
      (error: any)=>{
        this.errorMsg=error;
      }
    )
  }
}

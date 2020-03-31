import { Component, OnInit } from '@angular/core';
import { Bien } from 'src/app/models/bien';
import { SearchCriteria } from 'src/app/models/search-critaria';
import { BienService } from 'src/app/services/bien.service';
import { Subject, Subscription } from 'rxjs';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-list-bien',
  templateUrl: './list-bien.component.html',
  styleUrls: ['./list-bien.component.css']
})
export class ListBienComponent implements OnInit {
  listItems: Bien[];
  cols: any[];

  selectedItems: Bien[];
  totalRecords: number=0;
  searchCriteriaSubject=new Subject<SearchCriteria>();
  searchCriteria: SearchCriteria= new SearchCriteria();
  itemSubscription: Subscription;
  searchCriteriaSubscription: Subscription;
  totalRecordsSubscription: Subscription;

  loading: boolean = true;

  errorMsg: any;

  constructor(private bienService: BienService, private global: GlobalService) { }

  ngOnInit(): void {

    this.cols = [
      { field: 'name', header: 'Nom' },
      { field: 'description', header: 'Description' },
      { field: 'category', header: 'Categorie' },
      { field: 'unit', header: 'Unité' },
      { field: 'weight', header: 'Poids' }
    ];

    this.itemSubscription=this.bienService.biensSubject.subscribe(
      (results: Bien[])=>{
        this.listItems=results;
        this.loading=false;
      }
    );
    this.totalRecordsSubscription=this.bienService.totalRecordsSubject.subscribe(
      (totalRecords: number)=>{
        this.totalRecords=totalRecords;
      }
    );
    //pipe(debounceTime(500),distinctUntilChanged()).
    this.searchCriteriaSubscription=this.searchCriteriaSubject.subscribe(
      (searchCriteria: SearchCriteria)=>{
        console.log(this.searchCriteria)
        this.bienService.getBiens(searchCriteria);
      }
    );
    this.bienService.getBiens(this.searchCriteria);
  
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
    this.bienService.deleteBien(id).then(
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
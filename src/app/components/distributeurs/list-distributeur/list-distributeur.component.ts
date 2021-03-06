import { GlobalService } from 'src/app/global.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { Distributeur } from 'src/app/models/distributeur';
import { DistributeurService } from 'src/app/services/distributeur.service';
import { SearchCriteria } from 'src/app/models/search-critaria';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {SelectItem} from 'primeng/api';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-list-distributeur',
  templateUrl: './list-distributeur.component.html',
  styleUrls: ['./list-distributeur.component.css']
})
export class ListDistributeurComponent implements OnInit, OnDestroy {
  
  listItems: Distributeur[];
  cols: any[];
  selectedItems: Distributeur[];
  searchCriteria: SearchCriteria= new SearchCriteria();
  totalRecords: number=0;
  searchCriteriaSubject=new Subject<SearchCriteria>();
  distributeurSubscription: Subscription;
  searchCriteriaSubscription: Subscription;
  totalRecordsSubscription: Subscription;

  loading: boolean = true;

  displayDialog: any;
  selectedData: any;
  displayDetailsDialog: boolean;
  modalTitle: string;

  errorMsg: any;

  cities1: SelectItem[];
  cities2: SelectItem[];
  selectedCity1: City;
  selectedCity2: City;

  constructor(private distributeurService: DistributeurService, private global: GlobalService) {
    this.cities1 = [
      {label:'Select City', value:null},
      {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
      {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
      {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
      {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
      {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
    ];

    this.cities2 = [
      {label:'Select City', value:null},
      {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
      {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
      {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
      {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
      {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
    ];
  }

  ngOnInit(): void {  
    this.cols = [
      { field: 'address', header: 'Adresse' },
      { field: 'geographicalArea', header: 'Zone geographique' },
      { field: 'storageCapacity', header: 'Capacité de stockage' },
      { field: 'latitude', header: 'Latitude' },
      { field: 'longitude', header: 'Longitude' }
    ];

    this.distributeurSubscription=this.distributeurService.distributeursSubject.subscribe(
      (distributeurs: Distributeur[])=>{
        this.listItems=distributeurs;
        this.loading=false;
      }
    );
    this.totalRecordsSubscription=this.distributeurService.totalRecordsSubject.subscribe(
      (totalRecords: number)=>{
        this.totalRecords=totalRecords;
      }
    );
    //pipe(debounceTime(500),distinctUntilChanged()).
    this.searchCriteriaSubscription=this.searchCriteriaSubject.subscribe(
      (searchCriteria: SearchCriteria)=>{
        console.log(this.searchCriteria)
        this.distributeurService.getDistributeurs(searchCriteria);
      }
    );
    this.distributeurService.getDistributeurs(this.searchCriteria);
  }

  ngOnDestroy(){
    if(this.distributeurSubscription){
      this.distributeurSubscription.unsubscribe();
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
    this.distributeurService.deleteDistributeur(id).then(
      (response: any)=>{
        //continued!!!
      }
    ).catch(
      (error: any)=>{
        this.errorMsg=error;
      }
    )
  }
  
  showFormDialog(oldData = null) {
    this.displayDetailsDialog = false;
    this.selectedData = oldData;
    this.displayDialog = true;
    this.modalTitle = 'Ajout un distributeur';
  }

  showDetailsDialog(data) {
    this.displayDialog = false;
    this.selectedData = data;
    this.displayDetailsDialog = true;
    this.modalTitle = 'Détails du distributeur';
  }

  onDialogHide(event) {
    this.displayDialog = event;
    this.displayDetailsDialog = event;
    this.selectedData = null;
  }

}
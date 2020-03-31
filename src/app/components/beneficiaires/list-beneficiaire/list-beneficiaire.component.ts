import { GlobalService } from 'src/app/global.service';
import { Subscription, Subject } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Table } from 'primeng/table';
import { Beneficiaire } from 'src/app/models/beneficiaire';
import { BeneficiaireService } from 'src/app/services/beneficiaire.service';
import { SearchCriteria } from 'src/app/models/search-critaria';

@Component({
  selector: 'app-list-beneficiaire',
  templateUrl: './list-beneficiaire.component.html',
  styleUrls: ['./list-beneficiaire.component.css']
})
export class ListBeneficiaireComponent implements OnInit, OnDestroy {
  listItems: Beneficiaire[];
  cols: any[];
  selectedItems: Beneficiaire[];
  searchCriteria: SearchCriteria= new SearchCriteria();
  totalRecords: number=0;
  searchCriteriaSubject=new Subject<SearchCriteria>();
  beneficiairesSubscription: Subscription;
  searchCriteriaSubscription: Subscription;
  totalRecordsSubscription: Subscription;

  loading: boolean = true;

  errorMsg: any;

  constructor(private beneficiaireService: BeneficiaireService, private global: GlobalService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'firstName', header: 'Prénom' },
      { field: 'lastName', header: 'Nom' },
      { field: 'monthlyIncome', header: 'Salaire mensuel' },
      { field: 'numberOfChildren', header: "Nombre d'enfants" },
      { field: 'numberOfPeopleInCharge', header: 'Nombre de personnes en charge' },
      { field: 'mobileNumber', header: 'Contact' },
      { field: 'address', header: 'Adresse' }
    ];

    this.beneficiairesSubscription=this.beneficiaireService.beneficiairessSubject.subscribe(
      (beneficiaires: Beneficiaire[])=>{
        this.listItems=beneficiaires;
        this.loading=false;
      }
    );
    this.totalRecordsSubscription=this.beneficiaireService.totalRecordsSubject.subscribe(
      (totalRecords: number)=>{
        this.totalRecords=totalRecords;
      }
    );
    //pipe(debounceTime(500),distinctUntilChanged()).
    this.searchCriteriaSubscription=this.searchCriteriaSubject.subscribe(
      (searchCriteria: SearchCriteria)=>{
        console.log(this.searchCriteria)
        this.beneficiaireService.getBeneficiaires(searchCriteria);
      }
    );
    this.beneficiaireService.getBeneficiaires(this.searchCriteria);
  }

  ngOnDestroy(){
    if(this.beneficiairesSubscription){
      this.beneficiairesSubscription.unsubscribe();
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
    this.beneficiaireService.deleteBeneficiaire(id).then(
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

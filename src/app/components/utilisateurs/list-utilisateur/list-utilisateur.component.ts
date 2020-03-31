import { GlobalService } from './../../../global.service';
import { Subject, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { SearchCriteria } from 'src/app/models/search-critaria';

@Component({
  selector: 'app-list-utilisateur',
  templateUrl: './list-utilisateur.component.html',
  styleUrls: ['./list-utilisateur.component.css']
})
export class ListUtilisateurComponent implements OnInit , OnDestroy {
  listItems: User[];
  cols: any[];
  selectedItems: User[];
  searchCriteria: SearchCriteria= new SearchCriteria();
  totalRecords: number=0;
  searchCriteriaSubject=new Subject<SearchCriteria>();
  utilisateursSubscription: Subscription;
  searchCriteriaSubscription: Subscription;
  totalRecordsSubscription: Subscription;

  loading: boolean = true;

  errorMsg: any;
  constructor(private utilisateurService: UtilisateurService, private global: GlobalService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'firstName', header: 'Prénom' },
      { field: 'lastName', header: 'Nom' },
      { field: 'username', header: 'Identifiant' },
      { field: 'mobileNumber', header: 'Contact' },
      { field: 'address', header: 'Adresse' },
      { field: 'email', header: 'E-mail' },
      { field: 'identityNumber', header: 'N° CNI' },
      { field: 'isActive', header: 'Active' }
    ];

    this.utilisateursSubscription=this.utilisateurService.utilisateursSubject.subscribe(
      (utilisateurs: User[])=>{
        this.listItems=utilisateurs;
        this.loading=false;
      }
    );
    this.totalRecordsSubscription=this.utilisateurService.totalRecordsSubject.subscribe(
      (totalRecords: number)=>{
        this.totalRecords=totalRecords;
      }
    );
    //pipe(debounceTime(500),distinctUntilChanged()).
    this.searchCriteriaSubscription=this.searchCriteriaSubject.subscribe(
      (searchCriteria: SearchCriteria)=>{
        console.log(this.searchCriteria)
        this.utilisateurService.getUtilisateurs(searchCriteria);
      }
    );
    this.utilisateurService.getUtilisateurs(this.searchCriteria);
  }

  ngOnDestroy(){
    if(this.utilisateursSubscription){
      this.utilisateursSubscription.unsubscribe();
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
    this.utilisateurService.deleteUtilisateur(id).then(
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

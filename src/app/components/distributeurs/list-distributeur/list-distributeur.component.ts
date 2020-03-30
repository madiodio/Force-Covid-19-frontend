import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { Distributeur } from 'src/app/models/distributeur';
import { DistributeurService } from 'src/app/services/distributeur.service';
import { SearchCriteria } from 'src/app/models/search-critaria';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-list-distributeur',
  templateUrl: './list-distributeur.component.html',
  styleUrls: ['./list-distributeur.component.css']
})
export class ListDistributeurComponent implements OnInit, OnDestroy {

  distributeurs: Distributeur[];
  searchCriteria: SearchCriteria= new SearchCriteria();
  searchCriteriaSubject: Subject<SearchCriteria>= new Subject<SearchCriteria>();
  distributeurSubscription: Subscription;
  searchCriteriaSubscription: Subscription;
  constructor(private distributeurService: DistributeurService) { }

  ngOnInit(): void {
    this.distributeurSubscription=this.distributeurService.distributeursSubject.subscribe(
      (distributeurs: Distributeur[])=>{
        this.distributeurs=distributeurs;
      }
    );
    this.searchCriteria.page=1;
    this.searchCriteria.size=10;
    this.distributeurService.getDistributeurs(this.searchCriteria);
    this.searchCriteriaSubscription=this.searchCriteriaSubject.pipe(debounceTime(500),distinctUntilChanged()).subscribe(
      (searchCriteria: SearchCriteria)=>{
        this.distributeurService.getDistributeurs(searchCriteria);
      }
    )
  }

  ngOnDestroy(){
    if(this.distributeurSubscription){
      this.distributeurSubscription.unsubscribe();
    }
    if(this.searchCriteriaSubscription){
      this.searchCriteriaSubscription.unsubscribe();
    }
  }

  //Call this method in form filter template
  onSetSearchCriteria(){
    this.searchCriteriaSubject.next(this.searchCriteria);
  }

}

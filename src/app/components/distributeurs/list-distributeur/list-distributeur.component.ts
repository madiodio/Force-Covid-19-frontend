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
export class ListDistributeurComponent implements OnInit {
  
  listItems: Distributeur[];
  cols: any[];

  selectedItems: Distributeur[];

  loading: boolean = true;

  query = new SearchCriteria();

  constructor(private distributeurService: DistributeurService) { }

  ngOnInit(): void {

    this.cols = [
      { field: 'manager', header: 'Nom' },
      { field: 'address', header: 'Adresse' },
      { field: 'coverage', header: 'Zone geographique' },
      { field: 'storage', header: 'Stock' },
      { field: 'address', header: 'Commune' },
      { field: 'address', header: 'Ville' },
      { field: 'address', header: 'Région' }
    ];
    this.distributeurService.getDistributeurs(this.query);
    this.listItems = this.distributeurService.distributeurs;
    this.loadFakeData();
  }

  removeItme(id){
    console.log(id);
  }

  loadFakeData() {
    this.listItems = [];
    for (let i = 1; i <= 20; i++) {
      let bene = new Distributeur();
      bene.id = '' + i;
      bene.manager = 'Nom ' + i;
      bene.address = 'Adresse ' + i;
      bene.coverage = 'Zone geographique' + i;
      bene.storage = 'stock ' + i;
      this.listItems.push(bene);
    }

  }
}
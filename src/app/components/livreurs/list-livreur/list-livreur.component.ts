import { Component, OnInit } from '@angular/core';
import { Livreur } from 'src/app/models/livreur';
import { LivreurService } from 'src/app/services/livreur.service';
import { SearchCriteria } from 'src/app/models/search-critaria';

@Component({
  selector: 'app-list-livreur',
  templateUrl: './list-livreur.component.html',
  styleUrls: ['./list-livreur.component.css']
})
export class ListLivreurComponent implements OnInit {

  listItems: Livreur[];
  cols: any[];

  selectedItems: Livreur[];

  loading: boolean = true;
  
  query = new SearchCriteria();

  constructor(private livreurService: LivreurService) { }

  ngOnInit(): void {

    this.cols = [
      { field: 'name', header: 'Nom' },
      { field: 'manager', header: 'Gestionnaire' },
      { field: 'numberOfDeliverer', header: 'Nombre de livreur' },
      { field: 'phoneNumber', header: 'Téléphone' }
    ];
    this.livreurService.getLivreurs(this.query);
    this.listItems = this.livreurService.livreurs;
    this.loadFakeData();
  }

  removeItme(id){
    console.log(id);
  }

  loadFakeData() {
    this.listItems = [];
    for (let i = 1; i <= 20; i++) {
      let item = new Livreur();
      item.id = '' + i;
      item .name= 'Nom ' + i;
      item.manager = 'Gestionnaire ' + i;
      item.numberOfDeliverer = '' + i;
      item.phoneNumber = 'telephone ' + i;
      this.listItems.push(item);
    }

  }

}

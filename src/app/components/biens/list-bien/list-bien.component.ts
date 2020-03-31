import { Component, OnInit } from '@angular/core';
import { Bien } from 'src/app/models/bien';
import { SearchCriteria } from 'src/app/models/search-critaria';
import { BienService } from 'src/app/services/bien.service';

@Component({
  selector: 'app-list-bien',
  templateUrl: './list-bien.component.html',
  styleUrls: ['./list-bien.component.css']
})
export class ListBienComponent implements OnInit {
  listItems: Bien[];
  cols: any[];

  selectedItems: Bien[];

  loading: boolean = true;

  query = new SearchCriteria();

  constructor(private bienService: BienService) { }

  ngOnInit(): void {

    this.cols = [
      { field: 'name', header: 'Nom' },
      { field: 'description', header: 'Description' },
      { field: 'category', header: 'Categorie' },
      { field: 'unit', header: 'Unité' },
      { field: 'weight', header: 'Poids' }
    ];
    this.bienService.getBiens(this.query);
    this.listItems = this.bienService.biens;
    this.loadFakeData();
  }

  removeItme(id){
    console.log(id);
  }

  loadFakeData() {
    this.listItems = [];
    for (let i = 1; i <= 20; i++) {
      let item = new Bien();
      item.id = '' + i;
      item.name = 'Nom ' + i;
      item.description = 'description ' + i;
      item.category = 'category' + i;
      item.unit = 'unit ' + i;
      item.weight = 'poids ' + i;
      this.listItems.push(item);
    }

  }
}
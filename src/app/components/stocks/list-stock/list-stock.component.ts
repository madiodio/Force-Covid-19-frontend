import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/models/stock';
import { StockService } from 'src/app/services/stock.service';
import { SearchCriteria } from 'src/app/models/search-critaria';

@Component({
  selector: 'app-list-stock',
  templateUrl: './list-stock.component.html',
  styleUrls: ['./list-stock.component.css']
})
export class ListStockComponent implements OnInit {
  listItems: Stock[];
  cols: any[];

  selectedItems: Stock[];

  loading: boolean = true;

  query = new SearchCriteria();

  constructor(private stockService: StockService) { }

  ngOnInit(): void {

    this.cols = [
      { field: 'welfare', header: 'Nom' },
      { field: 'quantity', header: 'Quantité' },
      { field: 'created', header: 'Date creation' },
      { field: 'updated', header: 'Date mise à jour' },
      { field: 'userId', header: 'Utilisateur' }
    ];
    this.stockService.getStocks(this.query);
    this.listItems = this.stockService.stocks;
    this.loadFakeData();
  }

  removeItme(id){
    console.log(id);
  }

  loadFakeData() {
    this.listItems = [];
    for (let i = 1; i <= 20; i++) {
      let item = new Stock();
      item.id = '' + i;
      item.welfare = 'Nom ' + i;
      item.quantity = '' + i;
      item.created = 'created' + i;
      item.updated = 'updated ' + i;
      item.userId = 'User ' + i;
      this.listItems.push(item);
    }

  }
}

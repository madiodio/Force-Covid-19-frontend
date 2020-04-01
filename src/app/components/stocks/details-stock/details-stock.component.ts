import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Stock } from 'src/app/models/stock';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-details-stock',
  templateUrl: './details-stock.component.html',
  styleUrls: ['./details-stock.component.css']
})
export class DetailsStockComponent implements OnInit {
  stock: Stock;
  @Input() id: any;
  @Output() displayChange = new EventEmitter();
  errorMsg: any;
  
  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    if(this.id){
      this.onGetStock(this.id);
    }
  }

  onGetStock(id: string){
    this.stockService.getStock(id).then(
      (restult: Stock)=>{
        this.stock=restult;
      }
    ).catch(
      (error: any)=>{
        this.errorMsg=error;
      }
    )
  }

  onDialogHide() {
    this.stock = null;
    this.displayChange.emit(false);
  }
  
  ngOnDestroy() {
    this.displayChange.unsubscribe();
  }
}

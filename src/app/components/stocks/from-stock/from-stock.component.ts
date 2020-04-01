import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Stock } from 'src/app/models/stock';
import { StockService } from 'src/app/services/stock.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-from-stock',
  templateUrl: './from-stock.component.html',
  styleUrls: ['./from-stock.component.css']
})
export class FromStockComponent implements OnInit {
  form: FormGroup;
  stock: Stock;
  @Input() id: any;
  @Output() displayChange = new EventEmitter();
  errorMsg: any;
  
  constructor(private stockService: StockService, private fb: FormBuilder) { }

  ngOnInit(): void {
    if(this.id){
      this.onGetStock(this.id);
    } else {
      this.stock = new Stock();
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

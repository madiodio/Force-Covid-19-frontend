import { Component, OnInit } from '@angular/core';
import { Allocation } from 'src/app/models/allocation';
import { SearchCriteria } from 'src/app/models/search-critaria';
import { AllocationService } from 'src/app/services/allocation.service';

@Component({
  selector: 'app-list-allocation',
  templateUrl: './list-allocation.component.html',
  styleUrls: ['./list-allocation.component.css']
})
export class ListAllocationComponent implements OnInit {
  
  listItems: Allocation[];
  cols: any[];

  selectedItems: Allocation[];

  loading: boolean = true;

  query = new SearchCriteria();

  constructor(private allocationService: AllocationService) { }

  ngOnInit(): void {

    this.cols = [
      { field: 'welfare', header: 'Bien' },
      { field: 'beneficiary', header: 'Bénéficiaire' },
      { field: 'confirmationCode', header: 'Code de confirmation' },
      { field: 'confirmationCode', header: 'Stock' },
      { field: 'deliverer', header: 'Livreur' },
      { field: 'status', header: 'Status' },
      { field: 'updated', header: 'Date mise à jour' }
    ];
    this.allocationService.getAllocations(this.query);
    this.listItems = this.allocationService.allocations;
    this.loadFakeData();
  }

  removeItme(id){
    console.log(id);
  }

  loadFakeData() {
    this.listItems = [];
    for (let i = 1; i <= 20; i++) {
      let item = new Allocation();
      item.id = '' + i;
      item.welfare = 'Bien ' + i;
      item.beneficiary = 'Bénéficiaire ' + i;
      item.confirmationCode = 'code-' + i;
      item.deliverer = 'livreur ' + i;
      item.status = 'status ' + i;
      item.updated = 'updated ' + i;
      this.listItems.push(item);
    }
  }
}

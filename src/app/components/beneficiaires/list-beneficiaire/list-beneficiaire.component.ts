import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Beneficiaire } from 'src/app/models/beneficiaire';
import { BeneficiaireService } from 'src/app/services/beneficiaire.service';
import { SearchCriteria } from 'src/app/models/search-critaria';


@Component({
  selector: 'app-list-beneficiaire',
  templateUrl: './list-beneficiaire.component.html',
  styleUrls: ['./list-beneficiaire.component.css']
})
export class ListBeneficiaireComponent implements OnInit {
  listItems: Beneficiaire[];
  cols: any[];

  selectedItems: Beneficiaire[];

  loading: boolean = true;

  query = new SearchCriteria();

  displayDialog: boolean = false;
  displayDetailsDialog: boolean = false;
  selectedData;



  constructor(private beneficierService: BeneficiaireService) { }

  ngOnInit(): void {

    this.cols = [
      { field: 'lastName', header: 'Nom' },
      { field: 'firstName', header: 'Prenom' },
      { field: 'mobileNumber', header: 'Piece d\'identite' },
      { field: 'mobileNumber', header: 'Téléphone' },
      { field: 'mobileNumber', header: 'Commune' },
      { field: 'mobileNumber', header: 'Ville' },
      { field: 'mobileNumber', header: 'Région' }
    ];
    this.beneficierService.getBeneficiaires(this.query);
    this.listItems = this.beneficierService.beneficiaires;
    this.loadFakeData();
  }

  removeItme(id) {
    console.log(id);
  }

  loadFakeData() {
    this.listItems = [];
    for (let i = 1; i <= 20; i++) {
      let bene = new Beneficiaire();
      bene.id =  i;
      bene.firstName = 'Nom ' + i;
      bene.lastName = 'Prenom ' + i;
      bene.mobileNumber = 'piece D Identite' + i;
      bene.mobileNumber = 'telephone ' + i;
      this.listItems.push(bene);
    }

  }

  showFormDialog(oldData = null) {
    this.selectedData = oldData;
    this.displayDialog = true;
  }

  showDetailsDialog(data) {
    this.selectedData = data;
    this.displayDetailsDialog = true;
  }

  onDialogHide(event) {
    this.displayDialog = event;
    this.selectedData = null;
  }

  onDetailsDialogHide(event) {
    this.displayDetailsDialog = event;
    this.selectedData = null;
  }
}

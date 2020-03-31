import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { SearchCriteria } from 'src/app/models/search-critaria';
import { UtilisateurModel } from 'src/app/models/utilisateurs.model';

@Component({
  selector: 'app-list-utilisateur',
  templateUrl: './list-utilisateur.component.html',
  styleUrls: ['./list-utilisateur.component.css']
})
export class ListUtilisateurComponent implements OnInit {
  listItems: UtilisateurModel[];
  cols: any[];

  selectedItems: UtilisateurModel[];

  loading: boolean = true;
  
  query = new SearchCriteria();

  constructor(private userService: UtilisateurService) { }

  ngOnInit(): void {

    this.cols = [
      { field: 'lastname', header: 'Nom' },
      { field: 'firstname', header: 'Prenom' },
      { field: 'role', header: 'Role' },
      { field: 'email', header: 'Email' }
    ];
    this.userService.getUtilisateurs(this.query);
    this.listItems = this.userService.utilisateurs;
    this.loadFakeData();
  }

  removeItme(id){
    console.log(id);
  }

  loadFakeData() {
    this.listItems = [];
    for (let i = 1; i <= 20; i++) {
      let itme = new UtilisateurModel();
      itme.id = '' + i;
      itme.lastname = 'Nom ' + i;
      itme.firstname = 'Prenom ' + i;
      itme.role = 'Role' + i;
      itme.email = 'Email ' + i;
      this.listItems.push(itme);
    }

  }

}

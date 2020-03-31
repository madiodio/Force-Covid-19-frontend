import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { SearchCriteria } from 'src/app/models/search-critaria';

@Component({
  selector: 'app-list-utilisateur',
  templateUrl: './list-utilisateur.component.html',
  styleUrls: ['./list-utilisateur.component.css']
})
export class ListUtilisateurComponent implements OnInit {
  listItems: User[];
  cols: any[];

  selectedItems: User[];

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
      let itme = new User();
      itme.id = i;
      itme.lastName = 'Nom ' + i;
      itme.firstName = 'Prenom ' + i;
      itme.type = 'Role' + i;
      itme.username = 'Email ' + i;
      this.listItems.push(itme);
    }

  }

}

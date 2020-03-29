import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Accueil',
        icon: 'pi pi-fw pi-file',
       
      },
      {
        label: 'Stock',
        icon: 'pi pi-fw pi-pencil',
       
      },
      {
        label: 'Distributeurs',
        icon: 'pi pi-fw pi-question',
  
      },
      {
        label: 'Bénéficiaires',
        icon: 'pi pi-fw pi-cog',
        
      },
      {
        label: 'Statistiques',
        icon: 'pi pi-fw pi-cog',
        
      },
      { separator: true },
      {
        label: 'Quit', icon: 'pi pi-fw pi-times'
      }
    ];
  }
}

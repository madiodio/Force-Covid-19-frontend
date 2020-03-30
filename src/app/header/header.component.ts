import { Component, OnInit } from '@angular/core';
import { customItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  items: customItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Accueil',
        icon: 'pi pi-home',
        routerLink: [''],
            routerLinkActiveOptions: {
              exact: true
            },
        styleClass: 'customItem',
      },
      {
        label: 'Stock',
        icon: 'pi pi-images',
        routerLink: ['stocks'],
            routerLinkActiveOptions: {
              exact: true
            },
        styleClass: 'customItem'
      },
      {
        label: 'Distributeurs',
        icon: 'pi pi-users',
        routerLink: ['distributeurs'],
            routerLinkActiveOptions: {
              exact: true
            },
        styleClass: 'customItem'
      },
      {
        label: 'Bénéficiaires',
        icon: 'pi pi-id-card',
        routerLink: ['beneficiaires'],
            routerLinkActiveOptions: {
              exact: true
            },
        styleClass: 'customItem'
      },
      {
        label: 'Statistiques',
        icon: 'pi pi-chart-bar',
        styleClass: 'customItem'
      },
      { separator: true },
    ];
  }
}

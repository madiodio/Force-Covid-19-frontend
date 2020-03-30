import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SearchCriteria } from './models/search-critaria';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  BASE_API_URL = `${environment.apiUrl}`;

  ADMINISTRATOR = 'administrator';
  ROOT = 'ROOT';
  USERS_URL = this.BASE_API_URL + '/users';
  USER_REGISTER_URL = this.BASE_API_URL + '/auth/register';
  USER_LOGIN_URL = this.BASE_API_URL + '/auth/login';
  USER_LOGOUT_URL = this.BASE_API_URL + '/users/logout';
  ALLOCATION_URL=this.BASE_API_URL+'/allocations';
  BENEFICIAIRE_URL=this.BASE_API_URL+'/beneficiaires';
  BIEN_URL=this.BASE_API_URL+'/biens';
  CATEGORY_URL=this.BASE_API_URL+'/biens';
  DEPARTEMENT_URL=this.BASE_API_URL+'/departements';
  DISTRIBUTEUR_URL=this.BASE_API_URL+'/distributeurs';
  LINE_ALLOCATION_URL=this.BASE_API_URL+'/line-allocations';
  LIVREUR_URL=this.BASE_API_URL+'/livreurs';
  REGION_URL=this.BASE_API_URL+'/regions';
  STOCK_URL=this.BASE_API_URL+'/stocks';
  SUBDIVISION_URL=this.BASE_API_URL+'/subdivisions';
  UTILISATEUR_URL=this.BASE_API_URL+'/utilisateurs';


  UPLOAD_FILE = '/upload/images';
  DOWNLOAD_FILE = this.BASE_API_URL + '/files/download/images';
  FILE = this.BASE_API_URL + '/files';
  
  constructor() { }

  public prepareUrlWithSearchCriteria(url: string, filter: SearchCriteria): string {
    url = url + '?page=' + filter.page + '&size=' + filter.size;
    if(filter.key && filter.key.length){
      url = url + '&key=' + filter.key.trim() +'&operator=' + filter.operation.trim()+ '&value=' + filter.value;
    }
    if(filter.orderBy && filter.orderBy.length){
      url = url + '&orderBy=' + filter.orderBy.trim()+ '&orderDirection=' + filter.orderDirection.trim(); 
    }
    if(filter.searchKey && filter.searchKey.length){
      url = url + '&searchKey=' + filter.searchKey.trim(); 
    }
    if(filter.categories && filter.categories.length > 0){
      url = url + '&categories=' + filter.categories;
    }
    return url;
  } 

  
}
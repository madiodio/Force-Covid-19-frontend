import { GlobalService } from 'src/app/global.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Distributeur } from './../models/distributeur';
import { Injectable } from '@angular/core';
import { SearchCriteria } from '../models/search-critaria';

@Injectable({
  providedIn: 'root'
})
export class DistributeurService {
  baseUrl: string;
  distributeurs: Distributeur[];
  searchCriteria: any;
  distributeursSubject = new Subject<Distributeur[]>();

  constructor(private http: HttpClient, private global: GlobalService) {
    this.baseUrl = this.global.DISTRIBUTEUR_URL;
  }

  emitDistributeurs() {
    this.distributeursSubject.next(this.distributeurs);
  }

  getDistributeurs(searchCriteria?: SearchCriteria) {
    let url: string=this.baseUrl;
    if(searchCriteria){
      url=this.global.prepareUrlWithSearchCriteria(this.baseUrl,searchCriteria);
      this.searchCriteria=searchCriteria;
    }else{
      this.searchCriteria=null;
    }
    this.http.get<any>(url).subscribe(
      (distributeurs: any) => {
        this.distributeurs=distributeurs
        this.emitDistributeurs();
      }, (error: any) => {
        console.log(error);
      },
      () => {
      }
    )
  }

  async getDistributeur(id: string) {
    return new Promise(
      (resolve, reject) => {
        this.http.get<any>(this.baseUrl  + id).subscribe(
          (distributeur: any) => {
            resolve(distributeur);
          }, (error: any) => {
            reject(error);
          }
        )

      }

    );
  }

  async addDistributeur(distributeur: Distributeur) {
    return new Promise(
      (resolve, reject) => {
        this.http.post<any>(this.baseUrl, JSON.stringify(distributeur)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getDistributeurs(this.searchCriteria);
            }else{
              this.getDistributeurs();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }


  async updateDistributeur(distributeur: Distributeur) {
    return new Promise(
      (resolve, reject) => {
        this.http.put<any>(this.baseUrl + distributeur.id, JSON.stringify(distributeur)).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getDistributeurs(this.searchCriteria);
            }else{
              this.getDistributeurs();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }

  async deleteDistributeur(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.http.delete<any>(this.baseUrl + id).subscribe(
          (response: any) => {
            resolve(response);
            if(this.searchCriteria){
              this.getDistributeurs(this.searchCriteria);
            }else{
              this.getDistributeurs();
            }
          }, (error: any) => {
            reject(error);
          }
        )
      }

    );
  }
}

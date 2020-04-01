import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Distributeur } from 'src/app/models/distributeur';
import { DistributeurService } from 'src/app/services/distributeur.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-from-distributeur',
  templateUrl: './from-distributeur.component.html',
  styleUrls: ['./from-distributeur.component.css']
})
export class FromDistributeurComponent implements OnInit {
  //form: FormGroup;
  distributeur: Distributeur;
  @Input() id: any;
  @Output() displayChange = new EventEmitter();
  errorMsg: any;
  successMsg: any;
  
  constructor(private distributeurService: DistributeurService, private fb: FormBuilder) { }

  ngOnInit(): void {
    if(this.id){
      this.onGetDistributeur(this.id);
    } else {
      /* this.form = this.fb.group({
        storageCapacity: '',
        geographicalArea: '',
        address: '',
        latitude: '',
        longitude: '',
        manager: ''
      }); */
      this.distributeur = new Distributeur();
    }
  }

  onGetDistributeur(id: string){
    this.distributeurService.getDistributeur(id).then(
      (distributeur: Distributeur)=>{
        this.distributeur=distributeur;
        /* this.form = this.fb.group({
          storageCapacity: this.distributeur.storageCapacity,
          geographicalArea: this.distributeur.geographicalArea,
          address: this.distributeur.address,
          latitude: this.distributeur.latitude,
          longitude: this.distributeur.longitude,
          manager: this.distributeur.manager
        }); */
      }
    ).catch(
      (error: any)=>{
        this.errorMsg=error;
      }
    )
  }

  onAddDistributeur(){
    this.distributeurService.addDistributeur(this.distributeur).then(
      (response: any)=>{
        this.successMsg= response;
      }
    ).catch(
      (error: any)=>{
        this.errorMsg=error;
      }
    )
  }

  onUpdateDistributeur(){
    this.distributeurService.updateDistributeur(this.distributeur).then(
      (response: any)=>{
        this.successMsg= response;
      }
    ).catch(
      (error: any)=>{
        this.errorMsg=error;
      }
    )
  }

  onSubmit() {
    if (this.id) {
      this.onUpdateDistributeur();
    } else {
      this.onAddDistributeur();
    }
  }

  onDialogHide() {
    this.distributeur = null;
    this.displayChange.emit(false);
  }
  
  ngOnDestroy() {
    this.displayChange.unsubscribe();
  }
}

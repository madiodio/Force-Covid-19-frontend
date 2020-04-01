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
  form: FormGroup;
  distributeur: Distributeur;
  @Input() id: any;
  @Output() displayChange = new EventEmitter();
  errorMsg: any;
  
  constructor(private distributeurService: DistributeurService, private fb: FormBuilder) { }

  ngOnInit(): void {
    if(this.id){
      this.onGetDistributeur(this.id);
    } else {
      this.distributeur = new Distributeur();
    }
  }

  onGetDistributeur(id: string){
    this.distributeurService.getDistributeur(id).then(
      (distributeur: Distributeur)=>{
        this.distributeur=distributeur;
      }
    ).catch(
      (error: any)=>{
        this.errorMsg=error;
      }
    )
  }

  onDialogHide() {
    this.distributeur = null;
    this.displayChange.emit(false);
  }
  
  ngOnDestroy() {
    this.displayChange.unsubscribe();
  }
}

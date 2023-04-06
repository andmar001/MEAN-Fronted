import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { CrudService } from 'src/app/services/crud.service';


@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.css']
})
export class GenericFormComponent implements OnInit {

  @Input()
  modelProduct: Product;

  @Output()
  submitValues:EventEmitter<Product> = new EventEmitter<Product>();

  constructor(
    private _formBuilder: FormBuilder,
    private _crudService: CrudService,
    private _router: Router
  ) { }

  formProduct : FormGroup;

  ngOnInit(): void {
    this.formProduct =  this._formBuilder.group({
      description:['', Validators.required],
      price:['', Validators.required],
      stock:['', Validators.required],
    })

    if(this.modelProduct !== undefined){
      this.formProduct.patchValue(this.modelProduct);
    }

  }

  onSubmit(){
    this.submitValues.emit(this.formProduct.value);
  }

}

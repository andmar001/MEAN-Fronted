import { Component, OnInit } from '@angular/core';
import { faPlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/models/product.model';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private _crudService : CrudService
  ) { }

  faPlus = faPlus;
  faPen = faPen;
  faTrash = faTrash;

  ngOnInit(): void {
    this._crudService.getProducts()
      .subscribe((resp:Product[]) =>{
        this.products = resp;
      })
  }

  delete(id:any, index:any){
    console.log(id);
  }

}

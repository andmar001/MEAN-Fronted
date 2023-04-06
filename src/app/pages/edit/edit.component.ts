import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id!:any;
  model:Product

  constructor(
    private _crudService: CrudService,
    private _alertifyService: AlertifyService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute // to get the id from the url
  ) { }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.paramMap.get('id');

    this._crudService.getProduct(this.id)
      .subscribe((res) => {
        this.model = {
          _id: res._id,
          description: res.description,
          price: res.price,
          stock: res.stock
        }
      })
  }


  onSubmit(product:Product ){
    this._crudService.updateProduct(this.id, product)
      .subscribe({
        next:() =>{
          this._alertifyService.success('Product successfully updated');
          this._router.navigateByUrl('/');
        },
        error: (error) => {
          this._alertifyService.error( error );
        }
      })
  }

}

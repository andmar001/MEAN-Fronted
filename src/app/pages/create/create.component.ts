import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  constructor(
    private _router: Router,
    private _crudService: CrudService,
    private _alertifyService: AlertifyService
  ) { }


  onSubmit( product:Product ){
    this._crudService.createProduct(product)
      .subscribe({
        next: (data) => {
          this._alertifyService.success('Product successfully created');
          this._router.navigate(['/']);
        },
        error: (error) => {
          this._alertifyService.error( error );
        },
      })

    }

}

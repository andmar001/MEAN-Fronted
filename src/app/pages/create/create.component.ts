import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  constructor(
    private _router: Router,
    private _crudService: CrudService
  ) { }


  onSubmit( product:Product ){
    this._crudService.createProduct(product)
      .subscribe({
        next: (data) => {
          this._router.navigate(['/']);
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      })

    }

}

import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CrudService {
  data: Product;

  REST_API: string = environment.REST_API;

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _httpClient: HttpClient) {}

  getProducts() :Observable<any> {
    return this._httpClient.get(this.REST_API, { headers: this.httpHeaders });
  }

  getProduct(id: any) :Observable<any> {
    return this._httpClient
      .get(`${this.REST_API}/${id}`, { headers: this.httpHeaders })
      .pipe(
        map((res: any) => {
          return res || {};
        })
      );
  }

  createProduct(data: Product) :Observable<any> {
    return this._httpClient
      .post(this.REST_API, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  updateProduct(id: any, data: Product) :Observable<any> {
    return this._httpClient
      .put(`${this.REST_API}/${id}`, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  deleteProduct(id: any) :Observable<any> {
    return this._httpClient
      .delete(`${this.REST_API}/${id}`, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  // manejo de errores
  handleError(error: HttpErrorResponse) {
    let errorMsg = '';
    if (error.error instanceof ErrorEvent) {
      // error del lado del cliente
      errorMsg = error.error.message;
    } else {
      // error del lado del servidor
      errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => {
      errorMsg;
    });
  }
}

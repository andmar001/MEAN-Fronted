import { Component, OnInit } from '@angular/core';
import { CrudService } from './services/crud.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Frontend';
  info:any[]

  constructor(
    private _crudService: CrudService
  ) { }

  ngOnInit(): void {
    this._crudService.getProducts()
      .subscribe((res:any) =>{
        this.info = res
        console.log(this.info)
      })
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-detalle-orden',
  templateUrl: './detalle-orden.component.html',
  styleUrls: ['./detalle-orden.component.css']
})
export class DetalleOrdenComponent implements OnInit{

  public url;
  public token;
  public orden: any={};
  public detalles: Array<any>=[];
  public load_data = true;
  public id:any;

  constructor(
    private _clienteService: ClienteService,
    private _route: ActivatedRoute
  ){
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        this._clienteService.obtener_detalles_ordenes_cliente(this.id, this.token).subscribe(
          response=>{
            console.log(response)
            if (response.data != undefined) {
              this.orden = response.data;
              this.detalles = response.detalles;
              this.load_data = false;
            }else{
              this.orden = undefined;
            }
            
          }
        )
      }
    )

  }

  ngOnInit(): void {
    
  }

}

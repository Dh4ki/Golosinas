import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{

  public id_cliente;
  public token;
  public carrito_arr : Array<any> = [];
  public url;
  public subtotal = 0;
  public total_pagar = 0;

  constructor(
    private _clienteService: ClienteService,
  ){
    this.url = GLOBAL.url;
    this.token = localStorage.getItem('token');
    this.id_cliente = localStorage.getItem('_id');
    this._clienteService.obtener_carrito_cliente(this.id_cliente, this.token).subscribe(
      response=>{
        this.carrito_arr = response.data;
        this.calcular_carrito();
      }
    );
  }

  ngOnInit(): void {
    
  }

  calcular_carrito(){
    this.carrito_arr.forEach(element =>{
      this.subtotal = this.subtotal + parseFloat(element.producto.precio);
    });
    this.total_pagar = this.subtotal;
  }

}

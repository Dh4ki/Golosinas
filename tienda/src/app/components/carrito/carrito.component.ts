import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ClienteService } from 'src/app/services/cliente.service';
import { io } from "socket.io-client";
import { GuestService } from 'src/app/services/guest.service';

declare var iziToast:any;
declare var Cleave:any;
declare var StickySidebar:any;

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
  public total_pagar: any = 0;
  public socket = io('http://localhost:4201');
  public direccion_principal : any = {};
  public envios: Array<any> = [];
  public precio_envio: any = "0";

  constructor(
    private _clienteService: ClienteService,
    private _guestService: GuestService
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
      this._guestService.get_Envios().subscribe(
        response =>{
          this.envios = response;
        }
      );
  }

  ngOnInit(): void {
    setTimeout(()=>{
      new Cleave('#cc-number',{
        creditCard: true,
        onCreditCardTypeChanged: function(type:any){
        }
      });

      new Cleave('#cc-exp-date',{
        date: true,
        datePattern: ['m','y']
      });

      var sidebar = new StickySidebar('.sidebar-sticky', {topSpacing: 20});
    });
    this.get_direccion_principal();
  }

  get_direccion_principal(){
    this._clienteService.obtener_direccion_principal_cliente(localStorage.getItem('_id'),this.token).subscribe(
      response=>{
        if (response.data == undefined) {
          this.direccion_principal = undefined;
        }else{
          this.direccion_principal = response.data;
        }
      }
    );
  }

  calcular_carrito(){
    this.carrito_arr.forEach(element =>{
      this.subtotal = this.subtotal + parseFloat(element.producto.precio);
    });
    this.total_pagar = this.subtotal;
  }

  eliminar_item(id:any){
    this._clienteService.eliminar_carrito_cliente(id, this.token).subscribe(
      response =>{
        iziToast.show({
          title: 'ÉXITO',
          titleColor: '#FFD700',
          theme: 'dark',
          class: 'text-success',
          position: 'topRight',
          message: 'Se eliminó el producto correctamente'
        });
        this.socket.emit('delete-carrito',{data:response.data});
        this._clienteService.obtener_carrito_cliente(this.id_cliente, this.token).subscribe(
          response=>{
            this.carrito_arr = response.data;
            this.calcular_carrito();
          }
        );
      }
    )
  }

  calcular_total(){
    this.total_pagar = parseFloat(this.subtotal.toString()) + parseFloat(this.precio_envio);
  }

}

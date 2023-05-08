import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { ClienteService } from 'src/app/service/cliente.service';


declare var iziToast:any;

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit{

  public cliente : any = {
    genero: ''
  };

  public token;

  constructor(
    private _clienteService:ClienteService,
    private _adminService:AdminService,
    private _router:Router
  ){
    this.token = this._adminService.getToken();
  }
  
  ngOnInit():void{
  }

  registro(registroForm:any){
    if (registroForm.valid) {
      console.log(this.cliente);
      this._clienteService.registro_cliente_admin(this.token,this.cliente).subscribe(
        response=>{
          console.log(response);
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#FFD700',
            theme: 'dark',
            class: 'text-success',
            position: 'topRight',
            message: 'Se registró correctamente el nuevo cliente.'
          });
          this.cliente={
            genero: '',
            nombres: '',
            apellidos: '',
            f_nacimiento: '',
            telefono: '',
            dni: '',
            email: '',
          }
          this._router.navigate(['/panel/clientes']);
        },error=>{
          console.log(error);
        }
      );
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FFA500',
        theme: 'dark',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son válidos'
      });
    }
  }
}

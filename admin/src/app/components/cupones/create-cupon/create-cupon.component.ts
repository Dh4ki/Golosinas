import { Component, OnInit } from '@angular/core';
import { CuponService } from 'src/app/services/cupon.service';

declare var iziToast:any;

@Component({
  selector: 'app-create-cupon',
  templateUrl: './create-cupon.component.html',
  styleUrls: ['./create-cupon.component.css']
})
export class CreateCuponComponent implements OnInit{
  
  public cupon: any = {
    tipo: ''
  };
  public load_btn = false;
  public token;

  constructor(
    private _cuponService : CuponService
  ){
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void{

  }

  registro(registroForm:any){
    if (registroForm.valid) {
      this._cuponService.registro_cupon_admin(this.cupon,this.token).subscribe(
        response=>{
          console.log(response);
        },error=>{
          console.log(error);
        }
      )
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

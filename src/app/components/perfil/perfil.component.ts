import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioRequest } from '../cadastro/cadastro.component';
import { SnackBarService } from '../shared/snack-bar.service';
import { HeaderService } from '../header/header.service';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuarioLogado = new Usuario();
  usuarioRequest = new UsuarioRequest();
  nome = new FormControl(this.usuarioLogado.nome, [Validators.required]);
  email = new FormControl(this.usuarioLogado.email, [Validators.required, Validators.email]);

 
  constructor(
    private usuarioService: UsuarioService,
    public headerService: HeaderService,
    private alert: SnackBarService,
  ) { }
  
  ngOnInit(): void {
    this.getUsuario();
  }

  getUsuario() {
    this.usuarioService.getUsuarioLogado()
      .then((usuario: Usuario) => {
        this.headerService.setUsuarioLogado(usuario);
        this.usuarioLogado = usuario;
        this.nome.setValue(usuario.nome);
        this.email.setValue(usuario.email);
      }).catch((error: any) => {
        console.log('Erro ao consultar usuário logado');
      })
  }

  editar(form: NgForm): void {
    if (this.isValid()) {
      
      this.usuarioRequest.nome = this.nome.value?.toString();
      this.usuarioRequest.email = this.email.value?.toString();
      
      this.usuarioService.editar(this.usuarioRequest, this.usuarioLogado.id!)
        .then((usuario: Usuario) => {
          this.headerService.setUsuarioLogado(usuario);
          this.usuarioLogado = usuario;
          this.alert.abrirSnackBar('Usuário editado com sucesso.', 'success');

        }).catch((error: any) => {
          console.log('Erro ao editar usuário');
          console.log(error);
          this.alert.abrirSnackBar('Usuário editado com sucesso.', 'success');          
        })
    }
  }

  isValid() {
    return this.nome.valid 
      && this.email.valid
      && (this.usuarioLogado.nome != this.nome.value || this.usuarioLogado.email != this.email.value) 
  }

}

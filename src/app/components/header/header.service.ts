import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from '../perfil/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  usuarioLogado = new Usuario();

  constructor(
    private usuarioService: UsuarioService
  ) { }

  carregarUsuario() {
    this.getUsuarioLogado();
  }
  
  getUsuarioLogado() {
    this.usuarioService.getUsuarioLogado()
    .then((usuario: Usuario) => {
      this.setUsuarioLogado(usuario);      
    })  
  }

  setUsuarioLogado(usuario: Usuario) {
    this.usuarioLogado = usuario;    
  } 

}


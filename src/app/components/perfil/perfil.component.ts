import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuarioLogado = new Usuario();

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarioLogado()
      .then((usuario: Usuario) => {
        this.usuarioLogado = usuario;
      }).catch((error: any) => {
        console.log('Erro ao buscar usuário Logado');
      });
  }

}

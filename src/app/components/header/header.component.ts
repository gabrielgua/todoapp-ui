import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Usuario } from 'src/app/models/usuario';
import { DialogComponent } from '../dialog/dialog.component';
import { UsuarioService } from '../perfil/usuario.service';
import { HeaderService } from './header.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    public headerService: HeaderService,
    ) {}

  ngOnInit(): void {
    if (this.logado()) {
      this.getUsuarioLogado();
    }
  }

  logado(): boolean {
    if (this.auth.jwtPayload) {
      return true;
    }

    return false;
  }

  getUsuarioLogado(): void {
    this.headerService.carregarUsuario()
  }

  abrirDialogAddTarefa(id: any) {
    this.dialog.open(DialogComponent, {
      data: {
        id: id
      },
      width: '50rem',
      autoFocus: true,
    })
  }

  logout() {
    this.auth.logout();
  }

 

}

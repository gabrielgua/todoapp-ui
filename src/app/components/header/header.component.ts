import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  randomGradient: string = '';
  borderGradient: string = '';
  usuarioLogado = {
    primeiroNome: '',
    nomeCompleto: '',
    email: '',
  }
  
  constructor(
    private dialog: MatDialog,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.randomGradient = this.gerarCorDePerfil();
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
    this.usuarioLogado.nomeCompleto = this.auth.jwtPayload.usuario_nome;
    this.usuarioLogado.primeiroNome = this.usuarioLogado.nomeCompleto.substring(0, this.usuarioLogado.nomeCompleto.indexOf(' '));
    this.usuarioLogado.email = this.auth.jwtPayload.sub;
  }

  gerarCorDePerfil(): string {
    var cor = this.gerarCor();
    this.borderGradient = `2px solid ${cor}`
    return `linear-gradient(150deg, var(--accent-dark), ${cor})`;
  }

  gerarCor(): string {    
    var randomColor = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + randomColor).slice(-6);
  }

  gerarAngulo(): any {
    return Math.floor(Math.random() * 360);
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

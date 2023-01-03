import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from '../perfil/usuario.service';
import { SnackBarService } from '../shared/snack-bar.service';

export class UsuarioRequest {
  nome?: string;
  email?: string;
  senha?: string;
}

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  esconder: boolean = true;
  usuario = new UsuarioRequest();
  
  nome = new FormControl('', [Validators.required, Validators.minLength(5)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  senha = new FormControl('', [Validators.required, Validators.minLength(6)]);

  constructor(
    private usuarioService: UsuarioService,
    private alertService: SnackBarService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  cadastrar(form: NgForm): void {
    if (this.isValido()) {

      this.usuario.nome = this.nome.value?.toString();
      this.usuario.email = this.email.value?.toString();
      this.usuario.senha = this.senha.value?.toString();

      this.usuarioService.salvar(this.usuario)
        .then((usuarioSalvo: Usuario) => {
          this.router.navigate(['login']);
          this.alertService.abrirSnackBar('Usuário salvo com sucesso.', 'success');
        }).catch((error: any) => {
          console.log('Erro ao cadastrar usuário');
          this.alertService.abrirSnackBar('Erro ao cadastrar usuário.', 'error');
        })
    }
  }

  isValido(): boolean {
    return this.nome.valid && this.email.valid && this.senha.valid;
  }

  getNomeErrorMessage(): string {
    if (this.nome.hasError('minlength')) {
      return 'Nome precisa ter no mínimo 5 caractéres.';
    } 

    return this.nome.hasError('required') ? 'Nome é obrigatório.' : '';    
  }

  getEmailErrorMessage(): string {
    if (this.email.hasError('email')) {
      return 'E-mail precisa ser válido.'
    }

    return this.email.hasError('required') ? 'E-mail é obrigatório.' : '';
  }

  getSenhaErrorMessage(): string {
    if (this.email.hasError('minlength')) {
      return 'Senha precisa ter no mínimo 6 caractéres.'
    }

    return this.senha.hasError('required') ? 'Senha é obrigatória.' : '';
  }

}

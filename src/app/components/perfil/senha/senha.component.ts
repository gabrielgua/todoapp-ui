import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { SenhaNovaErrorStateMatcher, ErrorStateMatcherGenerico, SenhaConfirmacaoErrorStateMatcher } from 'src/app/models/error-state-matchers';
import { SenhaRequest } from 'src/app/models/senha-request';
import { SnackBarService } from '../../shared/snack-bar.service';
import { UsuarioService } from '../usuario.service';


@Component({
  selector: 'app-senha',
  templateUrl: './senha.component.html',
  styleUrls: ['./senha.component.css']
})
export class SenhaComponent implements OnInit {

  

  senhaGroup = new FormGroup({
    senhaAtual: new FormControl('', [Validators.required]),
    senhaNova: new FormControl('', [Validators.required, Validators.minLength(6)]),
    senhaConfirmacao: new FormControl('', [Validators.required])
  }, {validators: [this.differentThan(), this.equalsTo()]});
  

  senhaNovaMatcher = new SenhaNovaErrorStateMatcher();
  senhaAtualMatcher = new ErrorStateMatcherGenerico();
  senhaConfirmacaoMatcher = new SenhaConfirmacaoErrorStateMatcher();
  
  constructor(
    private usuarioService: UsuarioService,
    private alert: SnackBarService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  alterarSenha() {
    if (this.senhaGroup.valid) {
      var senhaRequest = new SenhaRequest();

      senhaRequest.senhaAtual = this.senhaGroup.get('senhaAtual')?.value!;
      senhaRequest.senhaNova = this.senhaGroup.get('senhaNova')?.value!;
      var usuarioId = this.usuarioService.getUsuarioIdLogado();

      this.usuarioService.alterarSenha(usuarioId, senhaRequest)
        .then(() => {
          this.alert.abrirSnackBar('Senha alterada com sucesso.', 'success');
          this.router.navigate(['perfil'])
        }).catch((error: any) => {
          this.alert.abrirSnackBar(error.error.userMessage, 'error');
          console.log('Erro ao alterar senha.');          
        })

    }
  }

  getErroSenhaNovaMessage() {
    if (this.senhaGroup.get('senhaNova')?.hasError('minlength')) {
      return 'Senha precisa ter no mínimo 6 caractéres';
    } else if (this.senhaGroup.hasError('isSame')) {
      return 'Senha nova não pode ser igual a senha atual.'
    }

    return this.senhaGroup.hasError('required', 'senhaNova') ? 'Senha nova é obrigatória' : '';
  }

  getErroSenhaNovaConfirmacaoMessage() {
    if (this.senhaGroup.hasError('notSame')) {
      return 'Senhas precisam ser iguais.';
    } 

    return this.senhaGroup.hasError('required', 'senhaConfirmacao') ? 'Confirmação da senha nova é obrigatória' : '';
  }

  differentThan(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const senhaAtual = group.get('senhaAtual')?.value;
      const senhaNova = group.get('senhaNova')?.value;

      return senhaAtual === senhaNova ? { isSame: true } : null;
    };
  }

  equalsTo(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const senhaNova = group.get('senhaNova')?.value;
      const senhaConfirmacao = group.get('senhaConfirmacao')?.value;

      return senhaNova === senhaConfirmacao ? null : { notSame: true };
    };
  }

  isValid() {
    return this.senhaGroup.valid;
  }

}

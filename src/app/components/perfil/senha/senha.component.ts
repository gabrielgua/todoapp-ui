import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UsuarioService } from '../usuario.service';

export class SenhaAtualStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.dirty);
    const invalidParent = !!(control && control.parent && control.parent.touched && control.parent.dirty);

    return ((invalidCtrl || invalidParent));
  }
}

export class SenhaConfirmacaoMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent?.dirty);
    const invalidParent = !!(control && control.parent && control.parent.dirty);

    return ((invalidCtrl || invalidParent) && control.valid);
  }
}

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
  }, {validators: [this.isDiferente(), this.isIgual()]});

  senhaAtualMatcher = new SenhaAtualStateMatcher();
  senhaConfirmacaoMatcher = new SenhaConfirmacaoMatcher
  
  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
  }

  alterarSenha() {

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

  isIgual(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      
      const senha = group.get('senhaNova')?.value;
      const senhaConfirmacao = group.get('senhaConfirmacao')?.value;
      return senha === senhaConfirmacao ? null : { notSame: true };
    }
  }

  isDiferente(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      
      const senhaAtual = group.get('senhaAtual')?.value;
      const senhaNova = group.get('senhaNova')?.value;
      return senhaAtual === senhaNova ? { isSame: true } : null;
    }
  }


  isValid() {
    return this.senhaGroup.valid;
  }

}

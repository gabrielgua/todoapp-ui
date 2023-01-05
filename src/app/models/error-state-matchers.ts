import { AbstractControl, FormGroupDirective, NgForm, FormControl } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class ErrorStateMatcherGenerico implements ErrorStateMatcher {
    isErrorState(control: AbstractControl<any, any> | null, form: FormGroupDirective | NgForm | null): boolean {
      return !!(control && control.invalid && control.dirty)
    }
  }
  
  export class SenhaNovaErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const invalidCtrl = !!(control && control.dirty && control.parent && control.parent.invalid && control.parent.dirty);
      if (control?.valid && control.parent?.invalid && !control.parent.hasError('isSame')) return false; 
      return invalidCtrl;
    }
  }
  
  export class SenhaConfirmacaoErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const invalidCtrl = !!(control && control.dirty && control.parent && control.parent.invalid && control.parent.dirty);
      if (control?.valid && control.parent?.invalid && !control.parent.hasError('notSame')) return false;    
      return invalidCtrl;
    }
  }
  
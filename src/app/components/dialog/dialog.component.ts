import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TarefaData } from '../tarefa/tarefa.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  
  
  titulo = new FormControl(this.data.titulo, [Validators.required, Validators.minLength(5)]);
  
  constructor(
    public dialogForm: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TarefaData,
    ) { }
  
  validaCampos(): boolean {
    return this.titulo.valid;
  }

  getTarefaErrorMessage(): string {
    if (this.titulo.hasError('minlength')) {
      return 'Título da tarefa deve conter pelo menos 5 caractéres.';
    }
    return this.titulo.hasError('required') ? 'Título da tarefa é obrigatório.' : '';
  }

  onNoClick(): void {
    this.dialogForm.close();
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TarefaData } from '../tarefa/tarefa.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(
    public dialogForm: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TarefaData,
  ) { }

  
  validaCampos(): boolean {
    return true;
  }

  onNoClick(): void {
    this.dialogForm.close();
  }

}

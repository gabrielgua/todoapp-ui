import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Tarefa } from 'src/app/models/tarefa';
import { TarefaService } from 'src/app/services/tarefa.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  tarefa: Tarefa = {
    concluida: false,
    dataConclusao: '',
    dataCriacao: '',
    titulo: '',
    statusAnimation: false,
  }

  titulo: FormControl =  new FormControl(null, [Validators.required]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Tarefa,
    private service: TarefaService,
    private router: Router
    ) { }

  ngOnInit(): void {
    if(this.data.id != -1) {
      this.service.buscarPorId(this.data.id).subscribe(resp => {
        this.tarefa = resp;
      })
    }
  }

  salvar(): void {
    this.service.salvar(this.tarefa).subscribe(() => {
      this.router.navigate(['']);
    })
  }

  validaCampos(): boolean {
    return this.titulo.valid
  }

}

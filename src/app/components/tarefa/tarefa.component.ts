import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FadeInFromBottom, FadeLeftToRight, FadeOut, FinishedBorder, } from 'src/app/animations/animations';
import { AuthService } from 'src/app/auth/auth.service';
import { DataTarefa } from 'src/app/models/data-tarefa';
import { Tarefa } from 'src/app/models/tarefa';
import { TarefaService } from 'src/app/services/tarefa.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css'],
  animations: [
    FadeInFromBottom,
    FinishedBorder,
    FadeLeftToRight,
    FadeOut
  ]
})
export class TarefaComponent implements OnInit {

  concluido: boolean = false;
  TAREFAS: Array<Tarefa> = [];
  hoje: number = Date.now();
  datasETarefas: Array<DataTarefa> = [];
  usuarioId: any;

  tarefa: Tarefa = {
    concluida: false,
    dataConclusao: '',
    dataCriacao: '',
    titulo: '',
    statusAnimation: false,
  }
  
  dialogRef!: MatDialogRef<ConfirmDialogComponent>;
  
  constructor(
    private service: TarefaService,
    private confirmDialog: MatDialog,
    private dialog: MatDialog,
    private auth: AuthService
  ) { }



  ngOnInit(): void {
    this.usuarioId = this.auth.jwtPayload.usuario_id;
    this.buscarTodos(-1);
  }
  
  teste() {
    return true;
  }

  buscarTodos(i: number): any {
    this.service.buscarTodos(this.usuarioId).subscribe(resp => {
      this.TAREFAS = resp;
      if (i != -1) {
        this.TAREFAS[i].statusAnimation = true;      
      }
      this.separarPorData(this.TAREFAS);
    });

  }

  concluirTarefa(i: any) {
    this.service.concluirTarefa(this.TAREFAS[i].id).subscribe(resp => {
      this.buscarTodos(i);
    }); 
  }

  remover(id: any) {
    this.service.removerPorId(id).subscribe(() => {
      this.buscarTodos(-1);
    })
  }

  abrirDialog(id: any): void {
    this.dialogRef = this.confirmDialog.open(ConfirmDialogComponent);
    this.dialogRef.componentInstance.msg = 'Você tem certeza que deseja remover esta Tarefa?';
    this.dialogRef.componentInstance.titulo = 'Remover Tarefa #' + id + '?';

    this.dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.remover(id);
      } 
    })
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

  abrirDialogEditTarefa(id: any) {
    this.dialog.open(DialogComponent, {
      data: {
        id: id
      }
    })
  }
  
  

  separarPorData(tarefas: Array<Tarefa>) {
    tarefas.forEach(t => {
      var dtDia = new Date(t.dataCriacao!).toDateString();
      var dtTarefa: DataTarefa = {data: dtDia, tarefas: [t]};

      var i = this.datasETarefas.findIndex(dt => dt.data.includes(dtDia));

      if (i >= 0) {
        this.datasETarefas[i].tarefas.push(t);
      } else {
        this.datasETarefas.push(dtTarefa);
      }
    });    
  }

  validarData(dataCriacao: string, dtData: string): boolean {
    var dtC = new Date(dataCriacao);
    if (dtC.toDateString().includes(dtData)) {
      return true;
    }
    return false;
  }

  formatarDatas(data: string): string {
    var hj = Date.now();
    var hoje = new Date(hj).getDay();
    var dia = new Date(data).getDay();
    var dataCompleta = new Date(data).toLocaleDateString();
    
    if (hoje == dia) {
      return 'Hoje';
    }

    return dataCompleta;
  }
}

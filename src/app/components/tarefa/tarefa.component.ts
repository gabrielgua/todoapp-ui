import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FadeInFromBottom, FadeLeftToRight, FadeOut, FinishedBorder, } from 'src/app/animations/animations';
import { AuthService } from 'src/app/auth/auth.service';
import { DataTarefa } from 'src/app/models/data-tarefa';
import { Tarefa } from 'src/app/models/tarefa';
import { TarefaRequest } from 'src/app/models/tarefa-request';
import { TarefaService } from 'src/app/services/tarefa.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DialogComponent } from '../dialog/dialog.component';

export interface TarefaData {
  id: any;
  titulo: any;
}

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
  
  dialogConfirm!: MatDialogRef<ConfirmDialogComponent>;
  dialogForm!: MatDialogRef<DialogComponent>;
  
  constructor(
    private service: TarefaService,
    private confirmDialog: MatDialog,
    private dialog: MatDialog,
    private auth: AuthService
  ) { }



  ngOnInit(): void {
    this.usuarioId = this.auth.jwtPayload.usuario_id;
    this.buscarTodos();
  }
  
  teste() {
    return true;
  }

  buscarTodos(id?: number): any {
    this.service.buscarTodos(this.usuarioId).subscribe(resp => {
      this.TAREFAS = resp;
      this.TAREFAS.forEach(tarefa => {
          if (tarefa.id == id) {
            tarefa.statusAnimation = true;
          }
      });
      this.separarPorData(this.TAREFAS);
    });

  }

  concluirTarefa(id: any) {
    this.service.concluirTarefa(id).subscribe(resp => {
      this.buscarTodos(id);
    }); 
  }

  remover(id: any) {
    this.service.removerPorId(id).subscribe(() => {
      this.buscarTodos();
    })
  }

  abrirDialog(id: any): void {
    this.dialogConfirm = this.confirmDialog.open(ConfirmDialogComponent);
    this.dialogConfirm.componentInstance.msg = 'Você tem certeza que deseja remover esta Tarefa?';
    this.dialogConfirm.componentInstance.titulo = 'Remover Tarefa #' + id + '?';

    this.dialogConfirm.afterClosed().subscribe(res => {
      if (res) {
        this.remover(id);
      } 
    })
  }

  abrirDialogAddTarefa() {
    this.dialogForm = this.dialog.open(DialogComponent, {
      width: '50rem',
      data: { id: null, titulo: null }
    });

    this.dialogForm.afterClosed().subscribe(res => {
      if(res) {
        
        this.salvar(res);
      }
    })
  }

  abrirDialogEditTarefa(id: any) {
    this.service.buscarPorId(id)
      .then((tarefa: Tarefa) => {
        this.tarefa = tarefa;

        this.dialogForm = this.dialog.open(DialogComponent, {
          width: '50rem',
          data: { id: this.tarefa.id, titulo: this.tarefa.titulo }
        })
    
        this.dialogForm.afterClosed().subscribe(res => {
          if (res) {
            this.editar(res, id);
          }
        })
      }).catch(() => {
        console.log('Erro ao consultar tarefa com id: ' + id);
      });
  }

  editar(titulo: string, id: number): void {
    var tarefaRequest = new TarefaRequest();
    tarefaRequest.titulo = titulo; 

    this.service.editar(tarefaRequest, id)
      .then((tarefa: Tarefa) => {
        this.buscarTodos();
      }).catch(() => {
        console.log('Erro ao editar tarefa de id: ' + id);
      });
  }

  salvar(titulo: string): void {
    var tarefaRequest = new TarefaRequest();
    tarefaRequest.titulo = titulo; 

    this.service.salvar(tarefaRequest)
      .then((tarefa: any) => {
        this.buscarTodos();
      }).catch(() => {
        console.log('Erro ao adicionar Tarefa');
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

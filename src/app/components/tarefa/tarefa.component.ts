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
import { SnackBarService } from '../shared/snack-bar.service';

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
    private auth: AuthService,
    private alert: SnackBarService
  ) { }



  ngOnInit(): void {
    this.usuarioId = this.auth.jwtPayload.usuario_id;
    this.buscarTodos();
  }
  
  buscarTodos(id?: number): any {
    this.service.buscarTodos(this.usuarioId)
      .then((tarefas: Tarefa[]) => {
        this.TAREFAS = tarefas;
        if (id) {
          this.setStatusAnimacao(id);
        }
    }).catch((error: any) => {
      this.alert.abrirSnackBar('Erro ao consultar Tarefas.', 'error');
      console.log(error);
      
    });

  }

  setStatusAnimacao(id: number): void {
    this.TAREFAS.forEach(tarefa => {
      if (tarefa.id == id) {
        tarefa.statusAnimation = true;
      }
    })
  }

  concluirTarefa(id: any): void {
    this.service.concluirTarefa(id)
      .then(() => {
        this.buscarTodos(id);
      })
      .catch((error: any) => {
        this.alert.abrirSnackBar('Erro ao concluir ou desfazer tarefa.', 'error');
        console.log(error);
      }); 
  }

  remover(id: any): void {
    this.service.removerPorId(id).then(() => {
      this.buscarTodos();
      this.alert.abrirSnackBar('Tarefa removida com sucesso.', 'success');
    }).catch((error: any) => {
      console.log('Erro ao remover tarefa.');
      console.log(error);
      this.alert.abrirSnackBar('Erro ao remover tarefa.', 'erro');
    })
  }

  abrirDialog(id: any): void {
    this.dialogConfirm = this.confirmDialog.open(ConfirmDialogComponent);
    this.dialogConfirm.componentInstance.msg = 'Voc?? tem certeza que deseja remover esta Tarefa?';
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
      }).catch((error: any) => {
        this.alert.abrirSnackBar('Erro ao consultar tarefa', 'error');
        console.log(error);
      });
  }

  editar(titulo: string, id: number): void {
    var tarefaRequest = new TarefaRequest();
    tarefaRequest.titulo = titulo; 

    this.service.editar(tarefaRequest, id)
      .then((tarefa: Tarefa) => {
        this.buscarTodos();
        this.alert.abrirSnackBar('Tarefa editada com sucesso.', 'success');
      }).catch((error: any) => {
        this.alert.abrirSnackBar('Erro ao editar a tarefa.', 'error');
        console.log(error);

      });
  }

  salvar(titulo: string): void {
    var tarefaRequest = new TarefaRequest();
    tarefaRequest.titulo = titulo; 

    this.service.salvar(tarefaRequest)
      .then((tarefa: any) => {
        this.buscarTodos();
        this.alert.abrirSnackBar('Tarefa adicionada com sucesso.', 'success');
      }).catch((error: any) => {
        this.alert.abrirSnackBar('Erro ao adicionar tarefa.', 'error');
        console.log(error);
      })
  }
}

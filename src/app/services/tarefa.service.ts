import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tarefa } from '../models/tarefa';
import { TarefaRequest } from '../models/tarefa-request';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor(private http: HttpClient) { }

  buscarTodos(usuarioId: number): Promise<Tarefa[]> {
    return firstValueFrom(this.http.get<Tarefa[]>(`${environment.baseUrl}/usuarios/${usuarioId}/tarefas`));
  }

  buscarPorId(id: any): Promise<Tarefa> {
    return firstValueFrom(this.http.get<Tarefa>(`${environment.baseUrl}/tarefas/${id}`));
  }

  salvar(tarefaRequest: TarefaRequest): Promise<Tarefa> {
    return firstValueFrom(this.http.post<TarefaRequest>(`${environment.baseUrl}/tarefas`, tarefaRequest));
  }

  editar(tarefaRequest: TarefaRequest, id: number): Promise<Tarefa> {
    return firstValueFrom(this.http.put<TarefaRequest>(`${environment.baseUrl}/tarefas/${id}`, tarefaRequest));
  }

  concluirTarefa(id: any): Promise<Tarefa> {
    return firstValueFrom(this.http.get<Tarefa>(`${environment.baseUrl}/tarefas/concluir/${id}`));
  }

  removerPorId(id: any): Promise<Tarefa> {
    return firstValueFrom(this.http.delete<Tarefa>(`${environment.baseUrl}/tarefas/${id}`));
  }
}

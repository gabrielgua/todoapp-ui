import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { API_CONFIG } from '../config/api-config';
import { Tarefa } from '../models/tarefa';
import { TarefaRequest } from '../models/tarefa-request';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor(private http: HttpClient) { }

  buscarTodos(usuarioId: number): Promise<Tarefa[]> {
    return firstValueFrom(this.http.get<Tarefa[]>(`${API_CONFIG.baseUrl}/usuarios/${usuarioId}/tarefas`));
  }

  buscarPorId(id: any): Promise<Tarefa> {
    return firstValueFrom(this.http.get<Tarefa>(`${API_CONFIG.baseUrl}/tarefas/${id}`));
  }

  salvar(tarefaRequest: TarefaRequest): Promise<Tarefa> {
    return firstValueFrom(this.http.post<TarefaRequest>(`${API_CONFIG.baseUrl}/tarefas`, tarefaRequest));
  }

  editar(tarefaRequest: TarefaRequest, id: number): Promise<Tarefa> {
    return firstValueFrom(this.http.put<TarefaRequest>(`${API_CONFIG.baseUrl}/tarefas/${id}`, tarefaRequest));
  }

  concluirTarefa(id: any): Promise<Tarefa> {
    return firstValueFrom(this.http.get<Tarefa>(`${API_CONFIG.baseUrl}/tarefas/concluir/${id}`));
  }

  removerPorId(id: any): Promise<Tarefa> {
    return firstValueFrom(this.http.delete<Tarefa>(`${API_CONFIG.baseUrl}/tarefas/${id}`));
  }
}

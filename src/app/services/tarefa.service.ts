import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api-config';
import { Tarefa } from '../models/tarefa';
import { TarefaRequest } from '../models/tarefa-request';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor(private http: HttpClient) { }

  buscarTodos(usuarioId: number): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(`${API_CONFIG.baseUrl}/usuarios/${usuarioId}/tarefas`);
  }

  buscarPorId(id: any): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${API_CONFIG.baseUrl}/tarefas/${id}`);
  }

  salvar(tarefa: Tarefa): Observable<Tarefa> {
    var tarefaRequest = new TarefaRequest();
    tarefaRequest.titulo = tarefa.titulo;

    return this.http.post<TarefaRequest>(`${API_CONFIG.baseUrl}/tarefas`, tarefaRequest);
  }

  concluirTarefa(id: any): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${API_CONFIG.baseUrl}/tarefas/concluir/${id}`);
  }

  removerPorId(id: any): Observable<Tarefa> {
    return this.http.delete<Tarefa>(`${API_CONFIG.baseUrl}/tarefas/${id}`)
  }
}

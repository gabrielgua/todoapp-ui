import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { API_CONFIG } from 'src/app/config/api-config';
import { SenhaRequest } from 'src/app/models/senha-request';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioRequest } from '../cadastro/cadastro.component';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
    private auth: AuthService, 
    ) { }

  getUsuarioLogado(): Promise<Usuario> {
    var usuarioId = this.auth.jwtPayload.usuario_id;
    return firstValueFrom(this.http.get<Usuario>(`${API_CONFIG.baseUrl}/usuarios/${usuarioId}`));
  }

  salvar(usuarioRequest: UsuarioRequest): Promise<Usuario> {
    return firstValueFrom(this.http.post<UsuarioRequest>(`${API_CONFIG.baseUrl}/usuarios`, usuarioRequest));
  }

  editar(usuarioRequest: UsuarioRequest, usuarioId: number): Promise<Usuario> {
    return firstValueFrom(this.http.put<UsuarioRequest>(`${API_CONFIG.baseUrl}/usuarios/${usuarioId}`, usuarioRequest));
  }

  alterarSenha(usuarioId: number, senhaRequest: SenhaRequest): Promise<SenhaRequest> {
    return firstValueFrom(this.http.put<SenhaRequest>(`${API_CONFIG.baseUrl}/usuarios/${usuarioId}/senha`, senhaRequest));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { SenhaRequest } from 'src/app/models/senha-request';
import { Usuario } from 'src/app/models/usuario';
import { environment } from 'src/environments/environment';
import { UsuarioRequest } from '../cadastro/cadastro.component';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
    private auth: AuthService, 
    ) { }

  getUsuarioIdLogado() {
    return this.auth.jwtPayload.usuario_id;  
  }

  getUsuarioLogado(): Promise<Usuario> {
    var usuarioId = this.auth.jwtPayload.usuario_id;
    return firstValueFrom(this.http.get<Usuario>(`${environment.baseUrl}/usuarios/${usuarioId}`));
  }

  salvar(usuarioRequest: UsuarioRequest): Promise<Usuario> {
    return firstValueFrom(this.http.post<UsuarioRequest>(`${environment.baseUrl}/usuarios`, usuarioRequest));
  }

  editar(usuarioRequest: UsuarioRequest, usuarioId: number): Promise<Usuario> {
    return firstValueFrom(this.http.put<UsuarioRequest>(`${environment.baseUrl}/usuarios/${usuarioId}`, usuarioRequest));
  }

  alterarSenha(usuarioId: number, senhaRequest: SenhaRequest): Promise<SenhaRequest> {
    return firstValueFrom(this.http.put<SenhaRequest>(`${environment.baseUrl}/usuarios/${usuarioId}/senha`, senhaRequest));
  }
}

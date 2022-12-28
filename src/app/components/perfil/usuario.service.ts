import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { API_CONFIG } from 'src/app/config/api-config';
import { Usuario } from 'src/app/models/usuario';

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
}

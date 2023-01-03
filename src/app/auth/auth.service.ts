import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api-config';
import * as CryptoJS from 'crypto-js';
import { firstValueFrom } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../components/perfil/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oAuthTokenUrl = API_CONFIG.baseUrl + '/oauth2/token';
  oAuthAuthorizeUrl = API_CONFIG.baseUrl + '/oauth2/authorize';
  jwtPayload: any;
  usuarioLogado = new Usuario();

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
    ) { 
      this.carregarToken();
    }

  login() {
    const state = this.gerarStringAleatoria(40);
    const codeVerifier = this.gerarStringAleatoria(128);

    localStorage.setItem('state', state);    
    localStorage.setItem('codeVerifier', codeVerifier);

    const challengeMethod = 'S256';
    const codeChallenge = CryptoJS.SHA256(codeVerifier)
      .toString(CryptoJS.enc.Base64)
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    
    const redirectUri = encodeURIComponent(API_CONFIG.oAuthCallBackUrl);
    const clientId = 'todo-webapp';
    const scope = 'READ WRITE';
    const responseType = 'code';

    const params = [
      'response_type=' + responseType,
      'client_id=' + clientId,
      'state=' + state,
      'scope=' + scope,
      'redirect_uri=' + redirectUri,
      'code_challenge=' + codeChallenge,
      'code_challenge_method=' + challengeMethod
    ];

    window.location.href = this.oAuthAuthorizeUrl + '?' + params.join('&');
  }

  private gerarStringAleatoria(tamanho: number): string {
    let result = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < tamanho; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  gerarAccessTokenCode(code: string, state: string): Promise<any> {
    const stateOld = localStorage.getItem('state');

    if (stateOld !== state) {
      return Promise.reject(null);
    }

    const codeVerifier = localStorage.getItem('codeVerifier')!;
    const payload = new HttpParams()
      .append('grant_type', 'authorization_code')
      .append('code', code)
      .append('redirect_uri', API_CONFIG.oAuthCallBackUrl)
      .append('code_verifier', codeVerifier);

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', API_CONFIG.clientCredentialsEncoded)
      
    return firstValueFrom(this.http.post<any>(this.oAuthTokenUrl, payload, {headers}))
      .then((response: any) => {
        this.armazenarAccessToken(response['access_token']);
        this.armazenarRefreshToken(response['refresh_token']);
        return Promise.resolve(null);
      }).catch((error: any) => {
        console.error('Erro ao gerar token com code', error);
        return Promise.resolve(null);
      });
  }

  gerarTokenComRefreshToken(): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', API_CONFIG.clientCredentialsEncoded);

    const payload = new HttpParams()
      .append('grant_type', 'refresh_token')
      .append('refresh_token', localStorage.getItem('refreshToken')!);
    
    return firstValueFrom(this.http.post<any>(this.oAuthTokenUrl, payload, {headers}))
      .then((response: any) => {
        this.armazenarAccessToken(response['access_token']);
        this.armazenarRefreshToken(response['refresh_token']);
        console.log('Novo Access Token gerado com o Refresh Token');
        return Promise.resolve();
      }).catch((error: any) => {
        console.error('Erro ao gerar o Access Token com o Refresh Token', error);
        return Promise.resolve();
      })
  }

  

  temQualquerPermissao(permissoes: any) {
    for (const permissao of permissoes) {
      if (this.temPermissao(permissao)) {
        return true;
      }
    }
    return false;
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  isAccessTokenValido() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  armazenarAccessToken(token: string): void {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private armazenarRefreshToken(refreshToken: string): void {
    localStorage.setItem('refreshToken', refreshToken);
  }

  public carregarToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.armazenarAccessToken(token);
    }
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  logout() {
    this.limparAccessToken();
    localStorage.clear();
    window.location.href = API_CONFIG.baseUrl + '/logout?returnTo=' + API_CONFIG.logoutRedirectToUrl;
  }
}



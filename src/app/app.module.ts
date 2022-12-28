import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TarefaComponent } from './components/tarefa/tarefa.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider';
import { MatCommonModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { registerLocaleData } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';




import localePT from '@angular/common/locales/pt';
import { HeaderComponent } from './components/header/header.component';
import { AuthorizedComponent } from './components/authorized/authorized.component';
import { API_CONFIG } from './config/api-config';
import { AuthInterceptor } from './auth/auth.inteceptor';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
registerLocaleData(localePT);

export function tokenGetter(): string {
  return localStorage.getItem('token')!;
}

 
@NgModule({
  declarations: [
    AppComponent,
    TarefaComponent,
    ConfirmDialogComponent,
    DialogComponent,
    HeaderComponent,
    AuthorizedComponent,
    LoginComponent,
    PerfilComponent,
    CadastroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatCommonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTabsModule,
    MatTooltipModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: API_CONFIG.tokenAllowedDomains,
        disallowedRoutes: API_CONFIG.tokenDisallowedRoutes
      }
    })

  ],
  providers: [
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

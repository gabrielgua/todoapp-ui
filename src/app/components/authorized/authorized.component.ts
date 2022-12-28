import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.css']
})
export class AuthorizedComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params.code) {
        console.log(params.state);
        
        this.auth.gerarAccessTokenCode(params.code, params.state)
          .then(() => {
            this.router.navigate(['/'])
              .then(() => {
                window.location.reload();
              });
          }).catch((error: any) => {
            console.error('Erro ao gerar Access Token com code');
          })
      } else {
        this.router.navigate(['/']);
      }
    })

  }

}

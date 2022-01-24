import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account-service/account.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'alumni';
  logged = false;

  constructor(private acs: AccountService, private router: Router) {
    this.acs.logStatus.subscribe(loginState => {
      if (!loginState) {
        this.router.navigate(['/auth/login']);
      } else {
        this.logged = loginState;
      }
    });

  }

  ngOnInit(): void {
  }

}

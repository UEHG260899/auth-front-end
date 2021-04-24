import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from "sweetalert2";


import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService) { }

  login() {
    const { email, password } = this.miFormulario.value;
    this._authService.login(email, password)
      .subscribe(valido => {
        if (valido === true) {
          this._router.navigateByUrl('/dashboard');
        } else {
          Swal.fire('Error', valido, 'error');
        }
      });
  }

}

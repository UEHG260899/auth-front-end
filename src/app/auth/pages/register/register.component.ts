import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import Swal from "sweetalert2";

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {


  miFormulario: FormGroup = this._fb.group({
    name : ['', Validators.required],
    email : ['', [Validators.required, Validators.email]],
    password : ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private _fb: FormBuilder,
              private router: Router,
              private _authService: AuthService) { }


  registro(){
    const { email, name, password } = this.miFormulario.value;
    this._authService.registro(name, email, password)
        .subscribe(resp => {
          if(resp === true){
            this.router.navigateByUrl('/dashboard');
          }else{
            Swal.fire('Error', resp, 'error');
          }
        });
  }

}

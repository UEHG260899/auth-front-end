import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
              private router: Router) { }


  registro(){
    this.router.navigateByUrl('/dashboard');
  }

}

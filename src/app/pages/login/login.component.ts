import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Token } from 'src/app/models/token.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  token: Token;
  error: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  get f(): {[key: string]: AbstractControl} {
    return this.form.controls;
  }

  showFieldHint(name: string) {
    const field = this.f[name];
    return field.invalid && (field.dirty || field.touched);
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.authService.login(this.form.value).subscribe(
      _ => {
        this.router.navigate(['/home']);
      },
      error => {
        this.f.password.reset();
        this.error = error.error.detail;
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public message: string;
  public errorshow = false;
  public loginForm: FormGroup;
  public isLoading = false;
  private redirect = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['returnUrl']) {
        this.redirect = params['returnUrl'];
      }
    });
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      username: new FormControl({ value: '', disabled: false }, [
        Validators.required
      ]),
      password: new FormControl({ value: '', disabled: false }, [
      ])
    });
  }

  login() {
    this.isLoading = true;
    this.authService.login(this.loginForm.value.username, this.loginForm.value.
      password)
      .subscribe(
      success => {
        this.isLoading = false;
        this.router.navigate([this.redirect]);
      },
      failure => {
        console.log(failure);
        this.isLoading = false;
        if (failure.status === 401) {
          this.message = 'Erreur lors de la connexion.';
          this.router.navigate(['/login']);
        }
        this.errorshow = true;
      });
  }
}

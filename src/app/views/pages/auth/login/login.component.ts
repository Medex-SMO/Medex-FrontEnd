import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  returnUrl: any;

  constructor(private route: ActivatedRoute,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.email),
      password: new FormControl(null, Validators.required)
  });
  }

  loginByAuth() {
    if (this.loginForm.valid) {
        let loginModel = Object.assign({}, this.loginForm.value);
        this.authService.loginByAuth(loginModel).subscribe(
            (response) => {
                this.toastr.info(response.message);
                localStorage.setItem('token', response.data.token);
                this.authService.setUserStats();
                this.router.navigate([this.returnUrl]);
            },
            (responseError) => {
                this.toastr.error(responseError.error, 'Validation fail');
            }
        );
    } else {
        this.toastr.error('Form is not valid!');
    }
}

  /* onLoggedin(e) {
    e.preventDefault();
    localStorage.setItem('isLoggedin', 'true');
    if (localStorage.getItem('isLoggedin')) {
      this.router.navigate([this.returnUrl]);
    }
  } */

}

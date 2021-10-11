import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(private toastr: ToastrService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl(null, Validators.email),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required])
  });
  }

  registerByAuth() {
    if (this.registerForm.valid) {
        let registerModel = Object.assign({}, this.registerForm.value);
        this.authService.registerByAuth(registerModel).subscribe(
            (response) => {
                this.toastr.info(response.message);
            },
            (responseError) => {
                this.toastr.error(responseError.error, 'Validation Fail');
            }
        );
    } else {
        this.toastr.error('Form is not valid!');
    }
}

  /* onRegister(e) {
    e.preventDefault();
    localStorage.setItem('isLoggedin', 'true');
    if (localStorage.getItem('isLoggedin')) {
      this.router.navigate(['/']);
    }
  } */

}

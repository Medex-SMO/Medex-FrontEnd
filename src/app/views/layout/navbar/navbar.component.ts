import { UserService } from './../../../services/user.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
  Renderer2,
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { User } from "src/app/models/user";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  public user;


  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService
            .getUserByEmail(localStorage.getItem('fullName'))
            .subscribe((response) => {
                this.user = response.data;
            });
  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e) {
    e.preventDefault();
    this.document.body.classList.toggle("sidebar-open");
  }

  /**
   * Logout
   */
  onLogout(e) {
    e.preventDefault();
    this.authService.logout();
  }
}

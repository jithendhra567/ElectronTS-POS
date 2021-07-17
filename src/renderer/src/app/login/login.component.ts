import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {

  constructor(private router: Router) {}

  onLogin(form: NgForm) {
    if (
      form.value.email === "admin@hotelpos.com" &&
      form.value.password === "ADMIN_POS_1"
    ) {
      this.router.navigateByUrl("/admin");
    } else if (
      form.value.email === "cashier@hotelpos.com" &&
      form.value.password === "CASHIER_POS_2"
    ) {
      this.router.navigateByUrl("/cashier");
    }
    else {
      return
    }
  }
}

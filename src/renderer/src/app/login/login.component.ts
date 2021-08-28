import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {

  constructor(private router: Router,private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  onLogin(email: string, password:string) {
    if (
      email === "admin@olio.com" &&
      password === "olio@olio.com"
    ) {
      this.router.navigateByUrl("/started");
    } else if (
      email === "cashier@olio.com" &&
      password === "olio@olio.com"
    ) {
      this.router.navigateByUrl("/cashier");
    }
    else {
      this.openSnackBar("please enter correct details","try again");
      return
    }
  }
}

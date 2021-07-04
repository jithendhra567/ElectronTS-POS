import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.scss']
})
export class CashierComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  run(){
    console.log(this.router.navigateByUrl('/a'))
  }

}

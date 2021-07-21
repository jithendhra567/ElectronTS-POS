import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { IpcService } from '../ipc.service';
@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.scss']
})
export class CashierComponent implements OnInit{
  title = 'OLIO';

  @ViewChild("sidenav") sideNav: MatSidenavContainer;

  constructor(private ipcService: IpcService, private router: Router) {
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.sideNav.open();
      this.router.navigateByUrl('cashier/instant');
    }, 1000);
  }

  clickDevTools() {
    this.ipcService.openDevTools();
  }
}

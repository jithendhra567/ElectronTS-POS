import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { IpcService } from '../ipc.service';
@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.scss']
})
export class CashierComponent implements OnInit{
  title = 'POS';

  @ViewChild("sidenav") sideNav: MatSidenavContainer;

  constructor(private ipcService: IpcService) {
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.sideNav.open();
    }, 1000);
  }

  clickDevTools() {
    this.ipcService.openDevTools();
  }
}

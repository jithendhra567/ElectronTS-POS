import { Component } from '@angular/core';
import { DataService, IpcService } from './ipc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private ipcService: IpcService) {
    this.ipcService.getData();
    this.ipcService.openDevTools();
  }

  clickDevTools() {
    this.ipcService.openDevTools();
  }
}

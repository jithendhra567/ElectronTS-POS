import { Component } from '@angular/core';
import { DataService, IpcService } from './ipc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private ipcService: IpcService) {
    //this.ipcService.getData();
  }

  clickDevTools() {
    this.ipcService.openDevTools();
  }
}

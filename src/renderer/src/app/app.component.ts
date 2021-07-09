import { Component } from '@angular/core';
import { IpcService } from './ipc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'POS';

  constructor(private ipcService: IpcService) {
  }

  clickDevTools() {
    this.ipcService.openDevTools();
  }
}

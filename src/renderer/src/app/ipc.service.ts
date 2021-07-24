import { Injectable } from '@angular/core';
import { DtoSystemInfo } from '../../../ipc-dtos/dtosysteminfo';
import { Observable } from 'rxjs';
import { Item } from './component/items/item.model';
import { Table } from './component/tables/table.model';

@Injectable({
  providedIn: 'root'
})
export class IpcService {

  constructor() { }

  openDevTools() {
    window.api.electronIpcSend('dev-tools');
  }

  getData(){
    window.api.electronIpcSend('get-data');
    window.api.electronIpcOnce('data', (event,data)=>{
      DataService.items = data.items;
      DataService.tables = data.tables;
      DataService.categories = data.categories;
    });
  }

  getSystemInfoAsync(): Observable<DtoSystemInfo> {
    return new Observable(subscriber => {
      window.api.electronIpcOnce('systeminfo', (event, arg) => {
        const systemInfo: DtoSystemInfo = DtoSystemInfo.deserialize(arg);
        subscriber.next(systemInfo);
        subscriber.complete();
      });
      window.api.electronIpcSend('request-systeminfo');
    });
  }
}

export class DataService{
  public static items: Item[] = [];
  public static tables: Table[] = [];
  public static categories: string[] = [];
  public static save(path:string, data:any){
    window.api.electronIpcSend(path,data);
  }
}

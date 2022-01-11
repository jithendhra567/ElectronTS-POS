import { Injectable } from '@angular/core';
import { DtoSystemInfo } from '../../../ipc-dtos/dtosysteminfo';
import { Observable } from 'rxjs';
import { Item } from './component/items/item.model';
import { Table } from './component/tables/table.model';
import { ItemData } from './cashier/add-item/add-item.component';

@Injectable({
  providedIn: 'root'
})
export class IpcService {

  constructor() { }

  openDevTools() {
    window.api.electronIpcSend('dev-tools');
  }

  getData(){
    window.api.electronIpcSend('get-full-day-data');
    window.api.electronIpcOnce('data', (event,data)=>{
      DataService.fullDayData = (JSON.parse(data)[0]);
      console.log(DataService.fullDayData);
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
  public static fullDayData: { [key: string]: ItemData[]}[] = [];
  public static save(path:string, data:any){
    window.api.electronIpcSend(path,data);
  }

}

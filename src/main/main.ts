import { app, BrowserWindow, ipcMain, Menu, remote } from 'electron';
import * as path from 'path';
import { DtoSystemInfo } from '../ipc-dtos/dtosysteminfo';
import * as os from 'os';
import * as fs from 'fs';

let win: BrowserWindow | null = null;

app.on('ready', createWindow);

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

function createWindow() {
  win = new BrowserWindow({
    width: 1024,
    height: 600,
    webPreferences: {
      // Disabled Node integration
      nodeIntegration: false,
      // protect against prototype pollution
      contextIsolation: true,
      // turn off remote
      enableRemoteModule: false,
      // Preload script
      preload: path.join(app.getAppPath(), 'dist/preload', 'preload.js')
    }
  });

  // https://stackoverflow.com/a/58548866/600559
  Menu.setApplicationMenu(null);

  win.loadFile(path.join(app.getAppPath(), 'dist/renderer', 'index.html'));
  win.on('closed', () => {
    win = null;
  });
}

ipcMain.on('dev-tools', () => {
  if (win) {
    win.webContents.toggleDevTools();
  }
});

ipcMain.on('request-systeminfo', () => {
  const systemInfo = new DtoSystemInfo();
  systemInfo.Arch = os.arch();
  systemInfo.Hostname = os.hostname();
  systemInfo.Platform = os.platform();
  systemInfo.Release = os.release();
  const serializedString = systemInfo.serialize();
  if (win) {
    win.webContents.send('systeminfo', serializedString);
  }
});

ipcMain.on('get-data', ()=>{
  !fs.existsSync("data") && fs.mkdirSync("data");
  !fs.existsSync(path.join(app.getPath('documents'), "/bills")) && fs.mkdirSync(path.join(app.getPath('documents'), "/bills"));
  let items =  [];
  let tables = [];
  let categories = [];
  try{
    items = JSON.parse(fs.readFileSync('data/items.json').toString());
    categories = JSON.parse(fs.readFileSync('data/categories.json').toString());
    tables = JSON.parse(fs.readFileSync('data/tables.json').toString());
  }
  catch(e){
    console.log("data not found!",e);
  }
  const data = {
    items: items,
    categories: categories,
    tables: tables
  }
  console.log(data)
  if(win)
    win.webContents.send('data',data);
})

ipcMain.on('tables', (event, data)=>{
  fs.writeFileSync('data/tables.json', JSON.stringify(data[0]));
});

ipcMain.on('items', (event, data)=>{
  fs.writeFileSync('data/items.json', JSON.stringify(data[0]));
});

ipcMain.on('categories', (event, data)=>{
  fs.writeFileSync('data/categories.json', JSON.stringify(data[0]));
});

ipcMain.on('print', (event, data:any)=>{
  const dir = path.join(app.getPath('documents'), "/bills/");
  !fs.existsSync(dir) && fs.mkdirSync(dir);
  const win2 = new BrowserWindow({
    height: 600,
    width: 400
  });
  const fileName = "print"+new Date().getTime()+".html";
  fs.writeFileSync(dir+fileName,data[0]);
  win2.title = dir+fileName;
  win2.loadFile(dir+fileName);
  win2.once('ready-to-show', () => {
    win2.webContents.print();
  })
})

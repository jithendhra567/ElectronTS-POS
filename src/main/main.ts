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

ipcMain.on('get-full-day-data', ()=>{
  !fs.existsSync("data") && fs.mkdirSync("data");
  !fs.existsSync(path.join(app.getPath('documents'), "/bills")) && fs.mkdirSync(path.join(app.getPath('documents'), "/bills"));
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();
  let date = '';
  if (dd < 10) date += '0' + dd;
  else date += dd;
  if (mm < 10) date += '-0' + mm;
  else date += '-' + mm;
  date += '-' + yyyy;
  const dir = path.join(app.getPath('documents'), "/" + date);
  //get order items from orderItems.json
  let orderItems = [];
  try {
    orderItems.push(JSON.parse(fs.readFileSync(dir+'/orderItems.json').toString()));
  } catch (e) {
    console.log("orderItems not found!", e);
  }
  if(win)
    win.webContents.send('data',JSON.stringify(orderItems));
})

ipcMain.on('orderItems', (event, data) => {
  //get today date in dd-mm-yyyy format
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();
  let date = '';
  if (dd < 10) date += '0' + dd;
  else date += dd;
  if (mm < 10) date += '-0' + mm;
  else date += '-' + mm;
  date += '-' + yyyy;
  const dir = path.join(app.getPath('documents'), "/" + date);
  data = JSON.parse(data[0]);
  !fs.existsSync(dir) && fs.mkdirSync(dir);
  // check the orderItems.json file is present or not
  let orderItems = [];
  try {
    orderItems = (JSON.parse(fs.readFileSync(dir+'/orderItems.json').toString()));
  } catch (e) {
    console.log("orderItems not found!", e);
  }
  orderItems.push(data);
  fs.writeFileSync(dir+'/orderItems.json', JSON.stringify(orderItems));
});

ipcMain.on('print', (event, data: any) => {
  const dir = path.join(app.getPath('documents'), "/bills/");
  !fs.existsSync(dir) && fs.mkdirSync(dir);
  const win2 = new BrowserWindow({
    height: 600,
    width: 400
  });
  const fileName = "print" + new Date().getTime() + ".html";
  fs.writeFileSync(dir + fileName, data[0]);
  win2.title = dir + fileName;
  win2.loadFile(dir + fileName);
  win2.once('ready-to-show', () => {
    win2.webContents.print();
  })
});

//create a new window for printing
ipcMain.on('fullPrint', (event, data: any) => {
  const dir = path.join(app.getPath('documents'), "/checkBills/");
  !fs.existsSync(dir) && fs.mkdirSync(dir);
  const win2 = new BrowserWindow({
    height: 600,
    width: 800
  });
  const fileName = "fullPrint" + new Date().getTime() + ".html";
  fs.writeFileSync(dir + fileName, data[0]);
  win2.title = dir + fileName;
  win2.loadFile(dir + fileName);
  win2.once('ready-to-show', () => {
    win2.webContents.print();
  })
});

ipcMain.on('check', (event, data: any) => {
  const dir = path.join(app.getPath('documents'), "/checkBills/");
  !fs.existsSync(dir) && fs.mkdirSync(dir);
  const win2 = new BrowserWindow({
    height: 600,
    width: 400
  });
  const fileName = "print" + new Date().getTime() + ".html";
  fs.writeFileSync(dir + fileName, data[0]);
  win2.title = dir + fileName;
  win2.loadFile(dir + fileName);
  win2.once('ready-to-show', () => {
    win2.webContents.print();
  })
});

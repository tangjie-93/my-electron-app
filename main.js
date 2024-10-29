const { app, BrowserWindow, ipcMain,screen,Menu } = require('electron/main');
const path = require('path');
const createWindow = () => {
  const screenSize = screen.getPrimaryDisplay().workAreaSize;
  const win = new BrowserWindow({
    x: screenSize.width - 800,
    y: screenSize.height - 600,
    show:false,
    frame: true,
    width: 800,
    height: 600,
    title: '自定义菜单',
    autoHideMenuBar: false,
    
    movable: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
  })
  let menutemp = [
    {
      label:"文件",
      submenu:[
        {
          label:"打开",
          click:()=>{
            console.log("打开");
          }
        },
        {
          type:"separator",
        },
        {
          label:"保存",
          click:()=>{
            console.log("保存");
          }
        },
        {
          label:"退出",
          role:"about"
        }
      ]
    },
    {label:"编辑"}
  ];
  let menu = Menu.buildFromTemplate(menutemp);
  Menu.setApplicationMenu(menu);

  win.webContents.openDevTools();
  win.loadFile('index.html');
  win.on('ready-to-show',()=>{
    win.show();
  });

  win.webContents.on('dom-ready', () => {
    console.log('222_dom-ready');
  })
  win.webContents.on('did-finish-load', () => {
    console.log('333_did-finish-load');
  })

  win.on('closed', () => {
    console.log('888_Window was closed');
    // win = null;
  })
}

app.whenReady().then(() => {
  createWindow();
  ipcMain.on('set-title', handleSetTitle);
  // ipcMain.handle('ping', () => 'pong');
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  console.log('444_window-all-closed');
  if (process.platform !== 'darwin') {
    app.quit();
  }
})
app.on('before-quit', () => {
  console.log('555_before-quit');
});
app.on('will-quit', () => {
  console.log('666_will-quit');
});
app.on('quit', () => {
  console.log('777_quit');
});
function handleSetTitle(event, title) {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  win.setTitle(title);
}
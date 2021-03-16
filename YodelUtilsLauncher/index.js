const { app, BrowserWindow, ipcRenderer } = require('electron');
const { fs } = require("fs");
const { ipcMain } = require('electron')
const {spawn} = require('child_process');
const path = require("path");
let mainWindow;

let globalWindows = {}


function createWindow () {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(app.getAppPath(), 'preload.js')
        },
    })

    win.loadFile('index.html')
    mainWindow = win;
    return win;
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

function setupExecution(data, event){
    exec(data.command, (error, stdout, stderr) => { 
        event.reply("execute-reply", {error:error, stdout:stdout, stderr:stderr}); 
    });


}


function createChildWindow(data, event){


    if (!(data.site in globalWindows)){
        if (data.webPreferences == undefined){
            data.webPreferences = {}
        }
        data.webPreferences.preload = path.join(app.getAppPath(), 'preload.js')
        let window = new BrowserWindow(data);
        window.loadFile(data.site);
        event.reply("window-reply", true);
        window.on("closed", ()=>{delete globalWindows[data.site]});
        globalWindows[data.site] = window;
    }else{
        event.reply("window-reply", false);
    }
}

ipcMain.on("asynchronous-action", (event, arg)=>{

    switch(arg.action){
        case "execute":
            setupExecution(arg,event);
            break;
        case "window":
            createChildWindow(arg,event);
    }

})
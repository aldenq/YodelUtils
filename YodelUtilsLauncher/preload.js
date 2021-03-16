const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
const contextBridge = electron.contextBridge;
const BrowserWindow = electron.BrowserWindow;
const {spawn} = require('child_process');



contextBridge.exposeInMainWorld("launcher", {
    createChildWindow: (options, site)=>{
        options.site = site;
        options.action = "window";
        ipcRenderer.send("asynchronous-action", options);
    },

    executeAPIServer: (options, error, stdout, stderr)=>{
        options.splice(0,0,'APIServerGUI/Server/main.py');
        options.splice(0,0,'python3');
        let process = spawn("sudo", options);
        process.stdout.on("data", stdout);
        process.stderr.on("data", stderr);
        process.on("error", error);
    }

});




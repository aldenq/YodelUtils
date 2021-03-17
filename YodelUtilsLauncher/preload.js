const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
const contextBridge = electron.contextBridge;
const BrowserWindow = electron.BrowserWindow;
const {spawn, exec} = require('child_process');
const sudo = require("sudo-prompt");


contextBridge.exposeInMainWorld("launcher", {
    createChildWindow: (options, site)=>{
        options.site = site;
        options.action = "window";
        ipcRenderer.send("asynchronous-action", options);
    },

    executeAPIServer: (options, error, stdout, stderr)=>{
        options.splice(0,0,'/home/philokaulkin/Documents/GitHub/YodelUtils/YodelUtilsLauncher/APIServerGUI/Server/main.py');
        options.splice(0,0,'python3');
        let process = spawn("pkexec", options);
        process.stdout.on("data", stdout);
        process.stderr.on("data", stderr);
        process.on("error", error);
        return process;
    },

    getIWConfig: (fn)=>{
        return exec("iwconfig", fn);
    }

});




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
        options.push("--gui");
        console.log(options);
        let process = spawn("pkexec", options, {
            stdio: 'pipe'
        });
        process.stdout.setEncoding("utf-8");
        process.stderr.setEncoding("utf-8");
        process.stdout.on("data", stdout);
        process.stderr.on("data", stderr);
        process.on("error", error);
        //window.addEventListener("beforeunload", ()=>{process.kill()});
        return process;
    },

    getIWConfig: (fn)=>{
        return exec("iwconfig", fn);
    }

});




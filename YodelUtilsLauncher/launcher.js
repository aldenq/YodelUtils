let launchAPI = document.getElementById("YAPIL");

launchAPI.onclick = ()=>{
    window.launcher.createChildWindow({width:800,height:600}, "APIServerGUI/index.html");
}
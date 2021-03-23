console.log(window.RadioDevice);

function elementizeJson(json){
    let ul = document.createElement("ul");
    for (const key in json) {
        if (Object.hasOwnProperty.call(json, key)) {
            let element = json[key];
            let subelem;
            if(element.startsWith("__yodelapidecode{")){
                let jsonstr = element.slice("__yodelapidecode".length);
                subelem = elementizeJson(JSON.parse(jsonstr));
                element = ""
            }
            let descriptor = document.createElement("li");
            let text = document.createTextNode(key+": "+element);
            descriptor.appendChild(text);
            if(subelem != undefined){
                descriptor.appendChild(subelem);
            }
            ul.appendChild(descriptor);
        }
    }
    return ul;
}

columns = {
    incoming: document.getElementById("incoming"),
    outgoing: document.getElementById("outgoing")
}

elementStores = {
    incoming: [],
    outgoing: []
}

function buildAccordionElement(json, destName){

    let dest = columns[destName];
    let arr = elementStores[destName];
    let li = document.createElement("li");
    let a = document.createElement('a');
    a.className = "uk-accordion-title uk-text-truncate";
    a.href = "#";
    a.innerHTML = "Message: "+ json;
    let div = document.createElement("div");
    div.className = "uk-accordion-content"
    let ul = elementizeJson(json)
    div.appendChild(ul);
    li.appendChild(a);
    li.appendChild(div);
    arr.push(li);
    dest.appendChild(li);

    console.log(document.getElementById("MaxSaved").value);
    while(arr.length > Number.parseInt(document.getElementById("MaxSaved").value)){
        arr = elementStores[destName]
        dest.removeChild(arr[0]);
        elementStores[destName] = arr.slice(1);
    }

}


function stdout(data){
    
    var str = (data.toString());
    console.log(str);            
    
    var ioq = str.charAt(0);
    if(ioq == "i" || ioq == "o"){
        var jsonstr = str.slice(1);
        var elem;
        if(ioq == "i"){
            elem = "incoming";
        }else if (ioq == "o"){
            elem = "outgoing";
        }
        try{
            buildAccordionElement(JSON.parse(jsonstr),elem);
        }catch(error){
            console.error(error);
        }
    }
}
function stderr(data){
    console.log((data.toString()));
}
function err(error){
    throw error;
}

if (window.Debug){   
    window.launcher.executeAPIServer(
        [window.RadioDevice, "--portno", window.Port, "-H", window.HostIP],
        err, stdout, stderr);
}else{
    location.href = "silent.html";
}
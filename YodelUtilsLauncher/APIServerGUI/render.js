console.log(window.RadioDevice);

function buildAccordionElement(json, dest){

   let li = document.createElement("li");
   let a = document.createElement('a');
   a.className = "uk-accordion-title uk-text-truncate";
   a.href = "#";
   a.innerHTML = JSON.stringify(json)
   let div = document.createElement("div");
   div.className = "uk-accordion-content"
   let ul = document.createElement("ul");
   for (const key in json) {
       if (Object.hasOwnProperty.call(json, key)) {
           const element = json[key];
           let descriptor = document.createElement("li");
           let text = document.createTextNode(key+": "+element);
           descriptor.appendChild(text);
           ul.appendChild(descriptor);
       }
   }
   div.appendChild(ul);
   li.appendChild(a);
   li.appendChild(div);
   dest.appendChild(li);
}
for(let i = 0; i < 15;i++){
    buildAccordionElement({name:"test", number:"128"}, document.getElementById("incoming"));
    buildAccordionElement({name:"test2", number:"126"}, document.getElementById("outgoing"));

}
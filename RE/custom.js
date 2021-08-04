var a = document.getElementsByClassName("title");
  while(a.length > 0){
        a[0].parentNode.removeChild(a[0]);
}
var b=document.getElementsByClassName("sub-title");
while(b.length > 0){
        b[0].parentNode.removeChild(b[0]);
}
var x = document.getElementsByClassName("title-parent");
var element= document.createElement("img");   
element.setAttribute("class", "icon1");
element.style.maxWidth = "200px";
element.style.margin = '-10px 0 0 -25px'
element.style.padding = 0;
element.setAttribute("src", "https://cdn.yellowmessenger.com/JrLTt9MlqGSU1627640891858.PNG");
x[0].appendChild(element)
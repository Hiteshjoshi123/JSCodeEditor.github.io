function start(){

var left = document.querySelector(".left"),
    right = document.querySelector(".right"),
    bar = document.querySelector(".bar"),
    iframe = document.querySelector(".iframe"),
    run = document.querySelector(".btn-run"),
    darkMode =document.querySelector(".btn-dark"),
    lightMode = document.querySelector(".btn-light"),
    editor = document.querySelector(".editor");
var drag = (e) => {
    e.preventDefault();
    document.selection ? document.selection.empty() :
        window.getSelection().removeAllRanges();
    left.style.width = (e.pageX - bar.offsetWidth / 3) + 'px';
    editor.resize();
}

bar.addEventListener("mousedown", () => {
    document.addEventListener("mousemove", drag);
});

bar.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", drag);
});

//Run Btn Event Listener

run.addEventListener("click", () => {
    var html = editor.textContent;
    iframe.src = "data:text/html;charset=utf-8," + encodeURI
        (html);
});

//Set dark Mode

darkMode.addEventListener("click",() =>{
    editor.style.backgroundColor = "#363836";
    editor.style.color = "white";
});

//Set Light Mode

lightMode.addEventListener("click",() =>{
    editor.style.backgroundColor = "white";
    editor.style.color = "black";
});

//Live Code

document.getElementById("live").onclick = function() {
    if (this.checked){
        editor.addEventListener("keyup", () => {
            var html = editor.textContent;
            iframe.src = "data:text/html;charset=utf-8," + 
            encodeURI(html);
        });
    }
}

function update(){
  var idoc = document.getElementsByClassName('iframe').contentWindow.document;
  idoc.open();
  idoc.write(editor.getvalue());
  idoc.close();
}


function setupEditor(){
window.editor = ace.edit('.editor');
editor.setTheme("ace/theme/monokai");//make a black theme
editor.getSession().setMode("ace/mode/html");//HTML mode
// editor.setValue(
// '<!DOCTYPE html>
// <html>
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
// </head>
// <body>
// </body>
// </html>',1);//1= moves courser to end //this makes basic templete of html

editor.getSession().on('change', function(){
    update();
});

editor.focus();
editor.setOptions({
    fontFamily:"Monaco",
    fontSize:'16pt',
    showLineNumbers: false,
    showGutter: false,
    vScrollBarAlwaysVisible:true,
    enablesBasicAutocompletion: false,
    enableLiveAutocompletion:false,
});

editor.setShowPrintMargin(false);
editor.setBehavioursEnabled(false);
}
function ready(){
    setupEditor();
    update();
}
}
start();
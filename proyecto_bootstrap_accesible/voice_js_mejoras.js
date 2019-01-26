var voicelist = responsiveVoice.getVoices();


for(var i = 0; i < voicelist.length; i++){

    var n = voicelist[i].name;
    var node = document.createElement('option');
    node.setAttribute("value",n);
    
    var textnode = document.createTextNode(n);
    node.appendChild(textnode);  
    document.getElementById("opciones").appendChild(node);
}

    document.getElementById('opciones').addEventListener('change',seleccionaOpcion);

function seleccionaOpcion(){

   var idioma = document.getElementById('opciones').value;   
    return idioma;
}

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    // for Internet Explorer 8 and below. For Blogger, you should use &amp;&amp; instead of &&.
    } else if (document.selection && document.selection.type != "Control") { 
        text = document.selection.createRange().text;
    }
    return text;
}
$(document).ready(function (){ // when the document has completed loading
   $(document).mouseup(function (e){ // attach the mouseup event for all div and pre tags
      setTimeout(function() { // When clicking on a highlighted area, the value stays highlighted until after the mouseup event, and would therefore stil be captured by getSelection. This micro-timeout solves the issue. 
         responsiveVoice.cancel(); // stop anything currently being spoken
         responsiveVoice.speak(getSelectionText(),seleccionaOpcion()); //speak the text as returned by getSelectionText
      }, 1);
   });
});


//Oir los estrenos

document.getElementById('oir-estrenos').addEventListener('click',decirEstrenos);

function decirEstrenos(){
    
    responsiveVoice.speak("Estrenos de la semana. 'Creed 2: La leyenda de Rocky. Familia al instante. EL BLUES DE BEALE STREET. THE OLD MAN & THE GUN . ÖTZI, EL HOMBRE DEL HIELO",seleccionaOpcion());
}
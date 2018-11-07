var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var color = '#59DF7A';
ctx.strokeStyle = '#59df7a';
ctx.lineWidth = 17;
ctx.lineCap = 'round';
ctx.shadowBlur = 15;
ctx.shadowColor = '#59df7a';

var nombreDia;
var nombreMonth;

function degToRoad(degree) {
    var factor = Math.PI / 180;
    return factor * degree;
}
var now = new Date();

function renderTime() {
    var now = new Date();
    var dia = now.getDate(); //dia del mes 1-31
    var year = now.getFullYear();
    var mes = now.getMonth()+1;
    var diaSemana = now.getDay(); //dia de la semana 0-6
    var time = now.toLocaleTimeString();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var milliseconds = now.getMilliseconds();
    var newSconds = seconds + (milliseconds / 1000);


    //MES
    switch (diaSemana) { //Swicth con los meses segun la respuesta de getMonth el nombre del mes sera igual al mes

        case 1:
            nombreDia = "Lunes";
            break;

        case 2:
            nombreDia = "Martes";
            break;

        case 3:
            nombreDia = "Miércoles";
            break;

        case 4:
            nombreDia = "Jueves";
            break;

        case 5:
            nombreDia = "Viernes";
            break;

        case 6:
            nombreDia = "Sábado";
            break;

        case 7:
            nombreDia = "Domingo";
            break;

    }

    switch (mes) { //Swicth con los meses segun la respuesta de getMonth el nombre del mes sera igual al mes

        case 1:
            nombreMonth = "Enero";
            break;

        case 2:
            nombreMonth = "Febrero";
            break;

        case 3:
            nombreMonth = "Marzo";
            break;

        case 4:
            nombreMonth = "Abril";
            break;

        case 5:
            nombreMonth = "Mayo";
            break;

        case 6:
            nombreMonth = "Junio";
            break;

        case 7:
            nombreMonth = "Julio";
            break;

        case 8:
            nombreMonth = "Agosto";
            break;

        case 9:
            nombreMonth = "Septiembre";
            break;

        case 10:
            nombreMonth = "Octubre";
            break;

        case 11:
            nombreMonth = "Noviembre";
            break;

        case 12:
            nombreMonth = "Diciembre";
            break;
    }


    //background
    var gradient = ctx.createRadialGradient(250, 250, 1, 250, 250, 300);
    gradient.addColorStop(0, '#09303a');
    gradient.addColorStop(1, 'black');

    ctx.fillStyle = gradient;
    //ctx.fillStyle = '#333333';
    ctx.fillRect(0, 0, 300, 500);

    /*//hours
    ctx.beginPath();
    ctx.arc(80,200,170,degToRoad(270),degToRoad((hours*15)-90));
    ctx.stroke();*/

    /*//minutes
    ctx.beginPath();
    ctx.arc(100,250,170,degToRoad(270),degToRoad((minutes*6)-90));
    ctx.stroke();*/

    //seconds

    ctx.beginPath();
    ctx.arc(150, 250, 140, degToRoad(270), degToRoad((newSconds * 6) - 90));
    ctx.stroke();

    //date
    ctx.fillStyle = color;
    ctx.font = '24px Arial';
    ctx.fillText(dia, 170, 250);
    ctx.fillText(nombreDia, 55, 250);
    ctx.fillText(year, 200, 250);

    //time
    ctx.fillStyle = color;
    ctx.font = '15px Arial';
    ctx.fillText(time, 120, 280);

    //mes
    ctx.fillStyle = color;
    ctx.font = '24px Arial';
    ctx.fillText(nombreMonth, 100, 350);


}



setInterval(renderTime, 40);
renderTime();
console.log(nombreDia);
console.log(nombreMonth);

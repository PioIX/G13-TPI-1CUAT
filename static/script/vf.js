let pregs = []
let usuario = ""


function crear_preguntas(preguntaVF, respuestaVF){
  if (pregs.length < 10){
    for(let i = 0; i < 10; i++){
        pregs.push(
        {
        pregunta : preguntaVF[i],
        respuesta : respuestaVF[i]
        }
      )
      }
  }
}

var preg_num = 0;
var time
let falso;
let verdadero;

function juego(){
  time = true;
  document.getElementById("info").style.display = "none";
  document.getElementById("VF").style.display = "flex";

  console.log(pregs[preg_num].respuesta);
  
  document.getElementById("VF").innerHTML = `
  <div class="pregunta">
    <h1>${pregs[preg_num].pregunta}</h1>
  </div>
  <div class="respuesta" id="verdadero" onclick="corregirVerdadero(), desbloquear()">
    <h2>Verdadero</h2>
  </div>
  <div class="respuesta" id="falso" onclick="corregirFalso(), desbloquear()">
    <h2>Falso</h2>
  </div>
  <div class="contenedor-botones" id="cont-botones">
    <button class="boton" onclick="abandonar()">Abandonar</button>
  </div>
  </div>
    <div class="tiempo" style="order:4" id="tiempo">
    </div>`

  var count = 20;
  var interval = setInterval(function(){
    document.getElementById('tiempo').innerHTML=count;
    count--;
    if (count === -2 || time == false){
      desbloquear();
      clearInterval(interval);
      document.getElementById('tiempo').innerHTML='Finalizado';
    }
  }, 1000);      
  falso = document.getElementById('falso');
  verdadero = document.getElementById('verdadero');
}

var click = 0;
function abandonar() {
    document.getElementById("info").style.display = "flex";
    document.getElementById("VF").style.display = "none";
    usuario = ""
    preg_num = 0;
    puntaje = 0;
}

function desbloquear() {
  time = false;
    if(click == 0){
        if(preg_num != pregs.length - 1){
            document.getElementById("cont-botones").innerHTML += `
            <div class="w-50 d-flex justify-content-center">
                <button class="boton" onclick="siguiente()">Siguiente Pregunta</button>
            </div>`
            click += 1;
        }else if(preg_num == pregs.length -1){
            document.getElementById("cont-botones").innerHTML += `
            <div class="w-50 d-flex justify-content-center">
                <button class="boton" onclick="finalizar()">Finalizar Verdadero o Falso</button>
            </div>`
            click += 1
        }  
    }
}

function corregirVerdadero(){
  if(pregs[preg_num].respuesta == "verdadero" && click == 0){
    usuario.puntaje += 200;
    puntaje += 200;
    falso.style.background = 'rgba(200, 0, 0, .5)';
    verdadero.style.background = 'rgba(0, 200, 0, .5)';
  } else if(click == 0){
    verdadero.style.background = 'rgba(200, 0, 0, .5)';
    falso.style.background = 'rgba(0, 200, 0, .5)';
  }
}

function corregirFalso(){
  if(pregs[preg_num].respuesta == "falso" && click == 0){
    usuario.puntaje += 200;
    puntaje += 200;
    verdadero.style.background = 'rgba(200, 0, 0, .5)';
    falso.style.background = 'rgba(0, 200, 0, .5)';
  } else if(click == 0){
    falso.style.background = 'rgba(200, 0, 0, .5)';
    verdadero.style.background = 'rgba(0, 200, 0, .5)';
  }
}

function siguiente(){
  click = 0;
  preg_num += 1;
  juego();
}

function finalizar() {
    click = 0;
    preg_num += 1;
    time = false;
    if (usuario != ""){
        document.getElementById("VF").innerHTML = `
        <style>
            .quiz {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            table, th {
                border: 1px solid black;
            }
        </style>
        <table>
            <thead>
                <tr>
                    <th>Usuario</th>
                    <th>Puntaje</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>${usuario.nombre}</th>
                    <th>${usuario.puntaje}</th>
                </tr>
            </tbody>
        </table>
        `
    }else{
        document.getElementById("VF").innerHTML =`
        <style>
            .quiz {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            table, th {
                border: 1px solid black;
            }
        </style>
        <h1>Puntaje: ${puntaje}</h1>
        <div class="contenedor-botones" style="order:4" id="cont-botones">
            <button class="boton" onclick="abandonar()">Volver</button>
        </div>
        `
    }
}
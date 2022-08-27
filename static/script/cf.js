let pregs = []
let usuario = ""
let puntaje = 0
let preg_num = 0

function crear_preguntas(oracionCF, respuestaCF){
  for(let i = 0; i < 10; i++){
    pregs.push(
      {
      pregunta : oracionCF[i],
      resp_correcta : respuestaCF[i]
      }
    )
  }
}


function juego() {
  time = true;
  document.getElementById("info").style.display = "none";
  document.getElementById("CF").style.display = "flex";
  console.log(pregs[preg_num].resp_correcta);
  document.getElementById("CF").innerHTML = `
  <div class="flex">
    <div class="pregunta">
        <h1>${pregs[preg_num].pregunta}</h1>
    </div>
    <div class="respuesta">
      <input type="text" id="respuesta" placeholder="Escribi tu respuesta acá">
      <input type="button" id="boton" class="boton" value="Corregir" onclick="corregir()">
    </div>
    <div class="tiempo" id="tiempo"></div>
    <div class="contenedor-botones" id="cont-botones">
      <button class="boton" onclick="abandonar()">Abandonar</button>
    </div>
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

}

function corregir(){
  if(click == 0){
    respuesta = document.getElementById("respuesta").value;
    respuesta = respuesta.toLowerCase()
    if(respuesta == pregs[preg_num].resp_correcta){
      usuario.puntaje += 200;
      puntaje += 200;
      document.getElementById("boton").style.background = "green"
      desbloquear();
    } else {
      document.getElementById("boton").style.background = "red"
      desbloquear();
    }
  }
}

var click = 0;



function abandonar() {
  preg_num = 0
    document.getElementById("info").style.display = "flex";
    document.getElementById("CF").style.display = "none";
    usuario = "";
}

function desbloquear() {
    if(click == 0){
        time = false;
        if(preg_num != pregs.length - 1){
            document.getElementById("cont-botones").innerHTML += `

          <button class="boton" onclick="siguiente()">Siguiente Pregunta</button>`
            click += 1;
        }else if(preg_num == pregs.length -1){
            document.getElementById("cont-botones").innerHTML += `
            <button class="boton" onclick="finalizar()">Finalizar Quiz</button>`
            click += 1
        }  
    }
}

function siguiente(){
  click = 0;
  preg_num += 1;
  juego()
}

function finalizar() {
    click = 0;
    preg_num = 0;
    time = false;
    if (usuario != ""){
        document.getElementById("CF").innerHTML = `
        <style>
            .CF {
              margin-top: 45%;
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
        document.getElementById("CF").innerHTML =`
        <style>
            .CF {
                margin-top: 45vh;
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

/* Falta el ID
function contador(){
  var tiempoRestante = 30;
var temporizador = setInterval(function(){
  if(tiempoRestante <= 0){
    clearInterval(temporizador);
  }
  document.getElementById("").value = 30 - tiempoRestante;
  tiempoRestante -= 1;
}, 1000);
<progress value="0" max="30" id=""></progress>
}
*/
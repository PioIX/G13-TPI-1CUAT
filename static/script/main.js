let pregs = []

function crear_preguntas(preguntas, correctas, incorrectas1, incorrectas2, incorrectas3){
  if(pregs.length < 10){
    for(let i = 0; i < 10; i++){
      pregs.push(
          {
              pregunta : preguntas[i],
              correcta : correctas[i],
              inc1 : incorrectas1[i],
              inc2 : incorrectas2[i],
              inc3 : incorrectas3[i]
          }
      )
    }
  }
}

var preg_num = 0
var time

function juego() {
    time = true;
    document.getElementById("info").style.display = "none";
    document.getElementById("quiz").style.display = "flex";
    let rand = Math.floor(Math.random() * 4);
    let rand2 = Math.floor(Math.random() * 4);
    let rand3 = Math.floor(Math.random() * 4);
    let rand4 = Math.floor(Math.random() * 4);
    document.getElementById("quiz").innerHTML = `
    <div class="pregunta">
        <h1>${pregs[preg_num].pregunta}</h1>
    </div>
    <div class="respuesta cor" style="order:${rand}" onclick="correcta(), desbloquear()">
        <h2>${pregs[preg_num].correcta}</h2>
    </div>
    <div class="respuesta inc" style="order:${rand2}" onclick="desbloquear()">
        <h2>${pregs[preg_num].inc1}</h2>
    </div>
    <div class="respuesta inc" style="order:${rand3}" onclick="desbloquear()">
        <h2>${pregs[preg_num].inc2}</h2>
    </div>
    <div class="respuesta inc" style="order:${rand4}" onclick="desbloquear()">
        <h2>${pregs[preg_num].inc3}</h2>
    </div>
    <div class="contenedor-botones" style="order:4" id="cont-botones">
        <button class="boton" onclick="abandonar()">Abandonar</button>
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
  
}

var click = 0;

function abandonar() {
    document.getElementById("info").style.display = "flex";
    document.getElementById("quiz").style.display = "none";
    usuario = ""
    preg_num = 0;
    puntaje = 0;
}

var incorrectas
var corr

function desbloquear() {
  incorrectas = document.getElementsByClassName('inc');
  corr = document.getElementsByClassName('cor');
  for (let i = 0; i < 3; i++){
    incorrectas[i].style.background = 'rgba(200, 0, 0, .5)';
  }
  corr[0].style.background = 'rgba(0, 200, 0, .5)'
  time = false;
    if(click == 0){
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

function correcta(){
    if(click == 0){
        usuario.puntaje += 200;
        puntaje += 200;
    }
}

function siguiente(){
    click = 0;
    preg_num += 1;
    juego();
}

function finalizar() {
    click = 0;
    preg_num = 0;
    time = false;
    if (usuario != ""){
        document.getElementById("quiz").innerHTML = `
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
        document.getElementById("quiz").innerHTML =`
        <style>
            .quiz {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        </style>
        <h1>Puntaje: ${puntaje}</h1>
        <div class="contenedor-botones" style="order:4" id="cont-botones">
            <button class="boton" onclick="abandonar()">Volver</button>
        </div>
        `
    }
  puntaje = 0;
}

function login(){
  if (usuario == ""){
    document.getElementById("info").style.display = "none";
    document.getElementById("quiz").style.display = "flex";
    document.getElementById("quiz").innerHTML =`
    <form>
      <label for="usuario">Ingrese Usuario: </label>
      <input type="text" class="usuario" id="usuario" placeholder="Usuario">
      <label for="contraseña">Ingrese su Contraseña: </label>
      <input type="text" class="usuario" id="contraseña" placeholder="Contraseña">
      <input type="submit" class="boton-entrar" value="Entrar">
    </form>
    <h2>Si no tenes cuenta, registrate</h2>
    <div class="boton-entrar" href="templates/registrarse">Registrarse</div>
    `
    usuario = document.getElementById("usuario").value;
    password = document.getElementById("contraseña").value;
  }
}
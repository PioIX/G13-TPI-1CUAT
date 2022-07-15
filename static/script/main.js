class jugador {
    constructor(nombre){
        this.nombre = nombre 
        this.puntaje = 0;
    }
}

let pregs = []

// Creo que una funcion que recibirá por parámetro la información de la Base de Datos.
function crear_preguntas(preguntas, correctas, incorrectas1, incorrectas2, incorrectas3)
  for(let i; i < preguntas.length; i++) {
    pregs.push({
      pregunta : preguntas[i],
      correcta : correctas[i],
      inc1 : incorrectas1[i],
      inc2 : incorrectas2[i],
      inc3 : incorrectas3[i]
    })
  }




for(let i = 0; i < 3; i++){
    pregs.push(
        {
            pregunta : ("Pregunta " + String(i+1)),
            correcta : "Respuesta Correcta",
            inc1 : "Respuesta Incorrecta",
            inc2 : "Respuesta Incorrecta 2",
            inc3 : "Respuesta Incorrecta 3"
    
        }
    )
}

var preg_num = 0

function juego() {
    preg_num = 0
    document.getElementById("info").style.display = "none";
    document.getElementById("quiz").style.display = "flex";
    
    document.getElementById("quiz").innerHTML = `
    <div class="pregunta">
        <h1>${pregs[preg_num].pregunta}</h1>
    </div>
    <div class="respuesta" onclick="correcta(), desbloquear()">
        <h2>${pregs[preg_num].correcta}</h2>
    </div>
    <div class="respuesta" onclick="desbloquear()">
        <h2>${pregs[preg_num].inc1}</h2>
    </div>
    <div class="respuesta" onclick="desbloquear()">
        <h2>${pregs[preg_num].inc2}</h2>
    </div>
    <div class="respuesta" onclick="desbloquear()">
        <h2>${pregs[preg_num].inc3}</h2>
    </div>
    <div class="contenedor-botones" id="cont-botones">
        <div class="w-50 d-flex justify-content-center">
            <button class="boton" onclick="abandonar()">Abandonar</button>
        </div>
    </div>`
}

var click = 0;

function abandonar() {
    document.getElementById("info").style.display = "flex";
    document.getElementById("quiz").style.display = "none";
    usuario = ""
}

function desbloquear() {
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
                <button class="boton" onclick="finalizar()">Finalizar Quiz</button>
            </div>`
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
    let rand = Math.floor(Math.random() * 4)
    switch(rand){
        case 0:
            document.getElementById("quiz").innerHTML = `
            <div class="pregunta">
                <h1>${pregs[preg_num].pregunta}</h1>
            </div>
            <div class="respuesta" onclick="correcta(), desbloquear()">
                <h2>${pregs[preg_num].correcta}</h2>
            </div>
            <div class="respuesta" onclick="desbloquear()">
                <h2>${pregs[preg_num].inc1}</h2>
            </div>
            <div class="respuesta" onclick="desbloquear()">
                <h2>${pregs[preg_num].inc2}</h2>
            </div>
            <div class="respuesta" onclick="desbloquear()">
                <h2>${pregs[preg_num].inc3}</h2>
            </div>
            <div class="contenedor-botones" id="cont-botones">
                <div class="w-50 d-flex justify-content-center">
                    <button class="boton" onclick="abandonar()">Abandonar</button>
                </div>
            </div>`
            break;
        case 1:
            document.getElementById("quiz").innerHTML = `
            <div class="pregunta">
                <h1>${pregs[preg_num].pregunta}</h1>
            </div>
            <div class="respuesta" onclick="desbloquear()">
                <h2>${pregs[preg_num].inc1}</h2>
            </div>
            <div class="respuesta" onclick="correcta(), desbloquear()">
                <h2>${pregs[preg_num].correcta}</h2>
            </div>
            <div class="respuesta" onclick="desbloquear()">
                <h2>${pregs[preg_num].inc2}</h2>
            </div>
            <div class="respuesta" onclick="desbloquear()">
                <h2>${pregs[preg_num].inc3}</h2>
            </div>
            <div class="contenedor-botones" id="cont-botones">
                <div class="w-50 d-flex justify-content-center">
                    <button class="boton" onclick="abandonar()">Abandonar</button>
                </div>
            </div>`
            break;
        case 2:
            document.getElementById("quiz").innerHTML = `
            <div class="pregunta">
                <h1>${pregs[preg_num].pregunta}</h1>
            </div>
            <div class="respuesta" onclick="desbloquear()">
                <h2>${pregs[preg_num].inc1}</h2>
            </div>
            <div class="respuesta" onclick="desbloquear()">
                <h2>${pregs[preg_num].inc2}</h2>
            </div>
            <div class="respuesta" onclick="correcta(), desbloquear()">
                <h2>${pregs[preg_num].correcta}</h2>
            </div>
            <div class="respuesta" onclick="desbloquear()">
                <h2>${pregs[preg_num].inc3}</h2>
            </div>
            <div class="contenedor-botones" id="cont-botones">
                <div class="w-50 d-flex justify-content-center">
                    <button class="boton" onclick="abandonar()">Abandonar</button>
                </div>
            </div>`
            break;
        case 3:
            document.getElementById("quiz").innerHTML = `
            <div class="pregunta">
                <h1>${pregs[preg_num].pregunta}</h1>
            </div>
            <div class="respuesta" onclick="desbloquear()">
                <h2>${pregs[preg_num].inc1}</h2>
            </div>
            <div class="respuesta" onclick="desbloquear()">
                <h2>${pregs[preg_num].inc2}</h2>
            </div>
            <div class="respuesta" onclick="desbloquear()">
                <h2>${pregs[preg_num].inc3}</h2>
            </div>
            <div class="respuesta" onclick="correcta(), desbloquear()">
                <h2>${pregs[preg_num].correcta}</h2>
            </div>
            <div class="contenedor-botones" id="cont-botones">
                <div class="w-50 d-flex justify-content-center">
                    <button class="boton" onclick="abandonar()">Abandonar</button>
                </div>
            </div>`
            break;
    }
}

function finalizar() {
    click = 0;
    preg_num += 1;
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

            table, th {
                border: 1px solid black;
            }
        </style>
        <h1>Puntaje: ${puntaje}</h1>
        `
    }
}
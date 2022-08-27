let usuario = "";
let contraseña = "";

function ingresar(){
  usuario = document.getElementById("usuario").value;
  contraseña = document.getElementById("contraseña").value;
}

function nueva_cuenta(){
  document.getElementById("contenido").style.display = "none";
  document.getElementById("registrar").style.display = "flex";
  document.getElementById("registrar").innerHTML = `
  <form>
    <div class="fila">
      <label for="usuario">Ingrese Usuario: </label>
      <input type="text" class="usuario" id="usuario" placeholder="Usuario" autofocus>
    </div>
    <div class="fila">
      <label for="contraseña">Ingrese su Contraseña: </label>
      <input type="text" class="usuario" id="contraseña" placeholder="Contraseña">
    </div>
    <div class="fila">
      <input type="submit" class="boton" value="Entrar" onclick="registrar()">
    </div>
  </form>
  `
}

function registrar(){
  usuario = document.getElementById("usuario").value;
  contraseña = document.getElementById("contraseña").value;

}
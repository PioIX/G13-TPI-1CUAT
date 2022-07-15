let contenedor = document.getElementById('contenedor-imagenes')
let index = 1;

function izquierda() {
    if (index > 0){
        let movimiento = (index - 1) * 33.3;
        contenedor.style.transform = `Translate(-${movimiento}%)`;
        index -= 1;
    }
}

function derecha() {
    if (index < 3){
        let movimiento = index * 33.3;
        contenedor.style.transform = `Translate(-${movimiento}%)`;
        index += 1;
    }
}
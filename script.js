const textArea = document.querySelector(".text-area");
const mensaje = document.querySelector(".mensaje");

/* 
La letra "a" es convertida para "arf"
La letra "e" es convertida para "enter"
La letra "i" es convertida para "imes"
La letra "o" es convertida para "ober"
La letra "u" es convertida para "ufat" 
*/

function validarNumeros(event) {
    var key = event.charCode;
    if (key >= 48 && key <= 57) {
        alert("No se permiten números en este campo");
        event.preventDefault();
    }
}

function btnEncriptar(){
    const textoEncriptado = encriptar(textArea.value)
    mensaje.value = textoEncriptado;
    mensaje.style.backgroundImage = "none"
    textArea.value = "";
}

function encriptar(stringEncriptada){
    let matrizCodigo = [["a", "arf"], ["e", "enter"], ["i", "imes"], ["o", "ober"], ["u","ufat"]];
    stringEncriptada = stringEncriptada.toLowerCase();
    stringEncriptada = stringEncriptada.replace(/[á]/g, "a").replace(/[é]/g, "e").replace(/[í]/g, "i").replace(/[ó]/g, "o").replace(/[ú]/g, "u");
    


    for(let i = 0; i<matrizCodigo.length; i++){
        if(stringEncriptada.includes(matrizCodigo[i][0])){
            stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1])
        }
    }
    return stringEncriptada;
}

function btnDesencriptar(){
    const textoEncriptado = desencriptar(textArea.value)
    mensaje.value = textoEncriptado;
    textArea.value = "";
}

function desencriptar(stringDesencriptada){
    let matrizCodigo = [["a", "arf"], ["e", "enter"], ["i", "imes"], ["o", "ober"], ["u","ufat"]];
    stringDesencriptada = stringDesencriptada.toLowerCase();
    

    for(let i = 0; i<matrizCodigo.length; i++){
        if(stringDesencriptada.includes(matrizCodigo[i][1])){
            stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0])
        }
    }
    return stringDesencriptada;
}

function reset(){
    textArea.value = "";
    mensaje.value = "";
    mensaje.style.backgroundImage = "url(./img/encriptado-de-datos.png)";
}

async function copiarAlPortapapeles() {
    try {
        // Obtener el texto del textarea
        const texto = document.getElementById("mensaje2").value;

        // Copiar el texto al portapapeles
        await navigator.clipboard.writeText(texto);

        // Mostrar un mensaje de confirmación
        
        var p = document.createElement("p");
        p.innerHTML = "El texto fue copiado exitosamente.";
        p.classList.add("fade-in");

        // Añadir el párrafo al contenedor
        document.getElementById("texto-copiado").appendChild(p);

        // Esperar 1 segundo
        setTimeout(function() {
            // Remover la clase de transición de aparición
            p.classList.remove("fade-in");
        }, 200);

        // Esperar 2 segundos
        setTimeout(function() {
            // Añadir la clase de transición de desaparición
            p.classList.add("fade-out");
        }, 1000);

        // Esperar 3 segundos
        setTimeout(function() {
            // Eliminar el párrafo del contenedor
            document.getElementById("texto-copiado").removeChild(p);
        }, 1500);

    } catch (err) {
        console.error("Error al copiar el texto: ", err);
    }
}

async function pegarDelPortapapeles() {
    try {
        // Obtener el texto del portapapeles
        const texto = await navigator.clipboard.readText();

        // Asignar el texto al valor del textarea
        document.getElementById("text-area2").value = texto;
    } catch (err) {
        console.error('Error en pegar el texto: ', err);
    }
}

//Script para el fondo de matrix:

// Initialising the canvas
var canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');

// Setting the width and height of the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Setting up the letters
var letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ';
letters = letters.split('');

// Setting up the columns
var fontSize = 10,
    columns = canvas.width / fontSize;

// Setting up the drops
var drops = [];
for (var i = 0; i < columns; i++) {
  drops[i] = 1;
}

// Setting up the draw function
function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, .1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < drops.length; i++) {
    var text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillStyle = '#0f0';
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    drops[i]++;
    if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
      drops[i] = 0;
    }
  }
}

// Loop the animation
setInterval(draw, 33);
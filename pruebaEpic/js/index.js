let palabra = "";
let intentos = 6;
let fallos = 0;
let concordancias = [];
// Eventos que se ejecutan cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', function () {

    // if para verificar conexión a internat
    if (navigator.onLine) {
        start();
        //getWord();
    } else {
        sweetAlert(2, 'No está conectado a internet', null);
        window.location.reload();
    }
});


function getWord() {
    fetch('https://palabras-aleatorias-public-api.herokuapp.com/random')
        .then(response => response.json())
        .then(data => {
            //console.log(data.body.Word)
            palabra = data.body.Word;
            console.log(palabra);
            pintarPalabra(palabra);
        });
}

const start = () => {
    getWord();
    abc();
}

function chequear(event) {
    comprobarLetra(event.target.textContent);
}

function pintarPalabra(palabra) {
    let str = '';
    let letras = palabra.split('');

    letras.forEach((l, i) => {
        if (concordancias.includes(l)) {
            str += `<div class="oculto">${l}</div>`;
        } else {
            concordancias[i] = "_";
            str += `<div class="oculto">?</div>`;
        }
    });
    document.getElementById('word').innerHTML = str;
}

function abc() {
    let a = 97;
    let z = 123;
    let letras = document.getElementById('letras');

    for (let l = a; l < z; l++) {
        const char = String.fromCharCode(l);

        let letra = document.createElement('div');
        letra.classList.add('abc', 'btn-secondary', 'manito');
        letra.setAttribute('id', 'letra-' + char);
        letra.textContent = char;
        letra.addEventListener('click', chequear);

        letras.appendChild(letra);
    }
}

function comprobarLetra(char) {
    let letra = document.getElementById('letra-' + char);

    if (palabra.indexOf(char) != -1) {
        for (let i = 0; i < palabra.length; i++) {
            if (palabra[i] == char) concordancias[i] = char;

        }
        //concordancias.push(char);
        pintarPalabra(palabra);

        letra.classList.remove('btn-secondary');
        letra.classList.add('btn-primary');
    } else {
        intentos--;
        fallos++;
        letra.classList.toggle('btn-secondary');
        letra.classList.add('btn-danger');

        document.getElementById('palo').src = `img/${fallos}.jpg`;
    }

    letra.classList.toggle('manito');
    letra.removeEventListener('click', chequear);

    //verifica si la palabra se completó
    comprobarPalabra();
}


function comprobarPalabra() {
    if (intentos == 0) {
        alert('Has perdido, presiona el botón para volver a iniciar')

        window.location.reload();
    } else if (concordancias.indexOf("_") == -1) {
        document.getElementById('palo').src = 'img/win.gif';
        alert('Has ganado, presiona el botón para volver a iniciar');
        window.location.reload();

    }
}
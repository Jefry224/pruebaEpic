let palabra = "";
let intentos = 6;
let fallos = 0;
let concordancias = [];
let dificultad;
//Sonidos
let clickSound, correct, hover, lost, wrong, win, beat, music;

const NORMAL = [
    'humano',
    'persona',
    'insecto',
    'serpiente',
    'arroz',
    'calendario',
    'gaseosa',
    'departamento',
    'bomberos',
    'producto',
    'escalera',
    'extranjero',
    'real',
    'falso',
    'perro',
    'gato',
    'botella'
]
const DIFICIL = [
    'antinorteamericanismo ',
    'anticonstitucionalidad',
    'interdisciplinariedad ',
    'contrarrevolucionario',
    'electroencefalografista',
    'desproporcionadamente',
    'extraterritorialidad',
    'nacionalsindicalista',
    'bioluminiscencia',
    'antigubernamentalmente',
    'incomprehensibilidad'
]


// Eventos que se ejecutan cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', function () {
    // if para verificar conexión a internat
    if (navigator.onLine) {
        cargarSonidos();
        //getWord();
    } else {
        sweetAlert(2, 'No está conectado a internet', null);
        window.location.reload();
    }
});


function getWord() {
    // fetch('https://palabras-aleatorias-public-api.herokuapp.com/random')
    //     .then(response => response.json())
    //     .then(data => {

    //         //console.log(data.body.Word)
    //         // if (data.body.Word.includes('ñ')){
    //         //     // fetch('https://palabras-aleatorias-public-api.herokuapp.com/random')
    //         //     // .then(response => response.json())
    //         //     // .then(data => {
    //         //     //     palabra = data.body.Word;
    //         //     //     console.log(palabra);
    //         //     // });
    //         //     palabra = data.body.Word;
    //         //     console.log(palabra);
    //         //     console.log('Tiene ñ')
    //         // }
    //         palabra = data.body.Word;
    //         console.log(palabra);
    //         pintarPalabra(palabra);
    //     });
    let total_palabras;
    let rand;
    if (dificultad === 1) {
        total_palabras = NORMAL.length-1;
        rand = (Math.random() * total_palabras).toFixed(0);
        palabra = NORMAL[rand];
    } else {
        total_palabras = DIFICIL.length-1;
        rand = (Math.random() * total_palabras).toFixed(0);
        palabra = DIFICIL[rand];
    }
    console.log(palabra)
    pintarPalabra(palabra);
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
        letra.setAttribute('onmouseover', 'playHover()');
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
        correct.play();
        letra.classList.remove('btn-secondary');
        letra.classList.add('btn-primary');
    } else {
        wrong.play();
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
    if (intentos === 0) {
        //alert('Has perdido, presiona el botón para volver a iniciar')
        lost.play();
        sweetAlert(4, 'Has perdido, presiona el botón para volver a iniciar', 'index.html');
        //window.location.reload();
    } else if (intentos == 2){
        beat.play();
        music.pause();
        document.getElementById('body').classList.add('dark_screen');
        document.getElementById('container').classList.add('animation');
    } else if (concordancias.indexOf("_") == -1) {
        document.getElementById('palo').src = 'img/win.gif';
        document.getElementById('body').classList.remove('dark_screen');
        document.getElementById('container').classList.remove('animation');
        beat.pause();
        win.play();
        sweetAlert(1, 'Has ganado, presiona el botón para volver a iniciar', 'index.html');
        //alert('Has ganado, presiona el botón para volver a iniciar');
        //window.location.reload();

    }
}


document.getElementById('single').addEventListener('click', function() { 
    document.getElementById('menu').classList.add('full-hidden');
    document.getElementById('container').classList.remove('full-hidden');
    dificultad = 1;
    start();
    clickSound.play();
    music.play();
});


document.getElementById('multi').addEventListener('click', function() { 
    document.getElementById('menu').classList.add('full-hidden');
    document.getElementById('container').classList.remove('full-hidden');
    dificultad = 2;
    start();
    clickSound.play();
    music.play();
});

function cargarSonidos(){
    clickSound = new Audio('./resources/click.mp3');
    correct = new Audio('./resources/correct.mp3');
    hover = new Audio('./resources/hover.wav');
    hover.volume = 0.5;
    lost = new Audio('./resources/lost.wav');
    wrong = new Audio('./resources/wrong.wav'); 
    win = new Audio('./resources/win.mp3');
    beat = new Audio('./resources/beat.mp3');
    beat.loop = true;
    music = new Audio('./resources/music.mp3');
    music.volume = 0.1;
    music.loop = true;
    
}

function playHover(){
    hover.play();
}
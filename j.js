//variáveis
const mario = document.querySelector('.mario');
const piper = document.querySelector('.pipe');
const nuvem = document.querySelectorAll('.clouds');
const MarioImagen = mario.src;
let time = 0;
let timeInterval;
let pausa = false;

//formação do tempo
function formatTime (seconds){
   if(isNaN(seconds) || seconds<0) return '00:00';
   return new Date(seconds * 1000).toISOString().substr(11, 8);

}

//Controle do temporizador
function startTimer(){
    const timerElement = document.getElementById('timer');
    timeInterval = setInterval(() => {
        time++;
        timerElement.textContent = `Tempo: ${formatTime(time)}s`; // Atualiza o texto no HTML
    }, 1000);
}

function pauseTimer(){
    clearInterval(timeInterval);
    pausa = true;
}

function resumeTimer(){
    if(pausa){
        startTimer();
        pausa = false;
    }
}

//função do pulo
const jump = () => {
   if(!mario.classList.contains('jump')){
    mario.classList.add('jump');
    setTimeout(()=>{
        mario.classList.remove('jump');
    },500);
   }
}

//colisão
function loop(){
 return setInterval(() => { 
    const pipeposition = piper.offsetLeft;
    const marioposition = Number(window.getComputedStyle(mario).bottom.replace('px',''));
    
    if (pipeposition <= 115 && pipeposition > 0 && marioposition < 100) {
        piper.style.animation = 'none'; 
        piper.style.left = `${pipeposition}px`;
        mario.style.animation = 'none';
        mario.style.bottom = `${marioposition}px`;
        mario.src = '/imagem/marioP.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';  

        clearInterval(timeInterval);

        // Nuvens
        nuvem.forEach(nuvemElement => {
            const nuvemRight = window.getComputedStyle(nuvemElement).right.replace('px', '');
            nuvemElement.style.animation = 'none';
            nuvemElement.style.right = `${nuvemRight}px`;
        });

        // Exibe o Game Over e o botão de reinício
        document.querySelector('.Gamer-Over-TXT').style.display = 'block';
        document.querySelector('.restart-button').style.display = 'block';
    }
}, 10);}

let gameloop = loop();

function restartGame(){
  time = 0;
  pause = false;
  [piper, mario,...nuvem].forEach(el => el.removeAttribute("style"));
  mario.src= MarioImagen;
  document.querySelector('.Gamer-Over-TXT').style.display = 'none';
  document.querySelector('.restart-button').style.display = 'none';
 clearInterval(timeInterval);
 startTimer();
 clearInterval(gameloop);
 gameloop = loop();

  
}



// Iniciar o jogo
startTimer();
document.addEventListener("keydown", jump);